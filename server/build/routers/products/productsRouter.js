"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authMiddleware_1 = __importDefault(require("../auth/middlewares/authMiddleware"));
const productsController_1 = require("./productsController");
const productsRouter = (0, express_1.default)();
productsRouter.get('/fetch', [authMiddleware_1.default], productsController_1.productsControler.fetchProducts);
exports.default = productsRouter;
