"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const ordersController_1 = require("./ordersController");
const authMiddleware_1 = __importDefault(require("../auth/middlewares/authMiddleware"));
const ordersRouter = (0, express_1.default)();
ordersRouter.post('/tryOrder', [authMiddleware_1.default], ordersController_1.ordersControler.tryOrder);
ordersRouter.get('/fetch', [authMiddleware_1.default], ordersController_1.ordersControler.fetch);
exports.default = ordersRouter;
