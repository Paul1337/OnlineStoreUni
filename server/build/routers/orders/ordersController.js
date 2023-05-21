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
exports.ordersControler = {
    tryOrder: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        var _a, _b, _c, _d;
        try {
            const { email, items } = req.body;
            const queryResult = yield ((_a = dbController_1.default.connection) === null || _a === void 0 ? void 0 : _a.query(`select * from User where email = '${email}'`));
            if (!queryResult)
                throw new Error('User not found!');
            const rows = queryResult[0];
            const user = rows[0];
            const balance = user.balance;
            const price = items.reduce((acc, cur) => acc + cur.price * cur.count, 0);
            console.log(`User balance = ${balance}; Price = ${price}`);
            const newBalance = balance - price;
            if (newBalance < 0) {
                throw new Error('Not enough cash!');
            }
            console.log('Enough!');
            // if enough -> new order, success, update user data
            const insertedOrderQuery = yield ((_b = dbController_1.default.connection) === null || _b === void 0 ? void 0 : _b.query(`insert into Orders (user_id, date, price) values (${user.id}, now(), ${price})`));
            if (!insertedOrderQuery)
                throw new Error('Sql error');
            yield ((_c = dbController_1.default.connection) === null || _c === void 0 ? void 0 : _c.query(`update User set balance = ${newBalance} where user_id = ${user.id}`));
            const orderId = insertedOrderQuery[0].insertId;
            const orderProducts = [];
            for (let item of items) {
                orderProducts.push((_d = dbController_1.default.connection) === null || _d === void 0 ? void 0 : _d.query(`insert into OrderProduct (order_id, product_id, product_count) values (${orderId}, ${item.id}, ${item.count})`));
            }
            yield Promise.all(orderProducts);
            res.json({
                message: 'ok',
                userBalance: newBalance,
            });
        }
        catch (e) {
            console.log(e);
            res.status(400).json({ message: 'Order error' });
        }
    }),
    fetch: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        var _e;
        try {
            const { email } = req.query;
            const queryResult = yield ((_e = dbController_1.default.connection) === null || _e === void 0 ? void 0 : _e.query(`select id, ord.* from User join Orders ord on ord.user_id = id where email = '${email}' `));
            const rows = queryResult === null || queryResult === void 0 ? void 0 : queryResult[0];
            if (!rows)
                throw new Error('Could not fetch orders');
            res.json({
                message: 'success',
                orders: rows,
            });
        }
        catch (e) {
            console.log(e);
            res.status(400).json({ message: 'Fetch orders error' });
        }
    }),
};
