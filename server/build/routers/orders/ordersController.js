"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ordersControler = void 0;
const dbController_1 = __importDefault(require("../../db/dbController"));
const utils_1 = require("../auth/utils");
exports.ordersControler = {
    tryOrder: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        var _a, _b, _c, _d;
        try {
            const { items } = req.body;
            const user_id = req.tokenPayload.id;
            const userQueryResult = yield ((_a = dbController_1.default.connection) === null || _a === void 0 ? void 0 : _a.query(`select * from User where id = ${user_id}`));
            if (!userQueryResult)
                throw new Error('User not found!');
            const user = userQueryResult[0][0];
            const balance = user.balance;
            const price = items.reduce((acc, cur) => acc + cur.price * cur.count, 0);
            console.log(`User balance = ${balance}; Price = ${price}`);
            const newBalance = balance - price;
            if (newBalance < 0) {
                return res.status(400).json({
                    message: 'Not enough cash',
                });
            }
            console.log('Enough!');
            const insertedOrderQuery = yield ((_b = dbController_1.default.connection) === null || _b === void 0 ? void 0 : _b.query(`insert into Orders (user_id, date, price) values (${user.id}, now(), ${price})`));
            if (!insertedOrderQuery)
                throw new Error('Sql error');
            yield ((_c = dbController_1.default.connection) === null || _c === void 0 ? void 0 : _c.query(`update User set balance = ${newBalance} where id = ${user.id}`));
            const orderId = insertedOrderQuery[0].insertId;
            const orderProducts = [];
            for (let item of items) {
                orderProducts.push((_d = dbController_1.default.connection) === null || _d === void 0 ? void 0 : _d.query(`insert into OrderProduct (order_id, product_id, product_count) values (${orderId}, ${item.id}, ${item.count})`));
            }
            yield Promise.all(orderProducts);
            // recalculation of token
            const userData = {
                id: user.id,
                name: user.name,
                role: user.role,
                balance: newBalance,
                email: user.email,
            };
            const token = (0, utils_1.generateAccessToken)(userData);
            res.cookie('authToken', token, {
                httpOnly: true,
                // maxAge: 1000 * 60 * 60 * 48
            });
            res.json({
                message: 'ok',
                newBalance: newBalance,
            });
        }
        catch (e) {
            console.log(e);
            res.status(400).json({ message: `Order error` });
        }
    }),
    fetch: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        var _e;
        try {
            const user_id = req.tokenPayload.id;
            console.log(`User id = ${user_id}`);
            const queryResult = yield ((_e = dbController_1.default.connection) === null || _e === void 0 ? void 0 : _e.query(`select ord.id as order_id, ord.date as date, ord.price as total_price, ordPr.product_count as count, pr.* from User usr 
                    join Orders ord on ord.user_id = usr.id 
                    join OrderProduct ordPr on ordPr.order_id = ord.id 
                    join Product pr on pr.id = ordPr.product_id
                    where usr.id = ${user_id} 
                    order by order_id`));
            const rows = queryResult === null || queryResult === void 0 ? void 0 : queryResult[0];
            console.log(rows);
            if (!rows)
                throw new Error('Could not fetch orders');
            const orders = {};
            for (let i = 0; i < rows.length; i++) {
                const row = rows[i];
                if (!orders[row.order_id]) {
                    orders[row.order_id] = {
                        price: row.total_price,
                        date: row.date,
                        products: [],
                    };
                }
                orders[row.order_id].products.push({
                    count: row.count,
                    id: row.id,
                    title: row.name,
                    description: row.description,
                    img: row.image_src,
                    price: row.price,
                });
            }
            res.json({
                message: 'success',
                orders: Object.values(orders),
            });
        }
        catch (e) {
            console.log(e);
            res.status(400).json({ message: 'Fetch orders error' });
        }
    }),
};
