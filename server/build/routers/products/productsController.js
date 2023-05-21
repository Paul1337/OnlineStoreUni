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
exports.productsControler = void 0;
const dbController_1 = __importDefault(require("../../db/dbController"));
exports.productsControler = {
    fetchProducts: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        try {
            const queryResult = yield ((_a = dbController_1.default.connection) === null || _a === void 0 ? void 0 : _a.query(`select pr.*, cat.name as category_name from Product pr left join Category cat on cat.id = category_id`));
            const rows = queryResult === null || queryResult === void 0 ? void 0 : queryResult[0];
            console.log('Got products: ');
            console.log(rows);
            return res.json({
                products: rows,
            });
        }
        catch (e) {
            console.log(e);
            res.status(400).json({ message: 'Fetch products error' });
        }
    }),
};
