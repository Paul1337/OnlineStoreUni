"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authController_1 = __importDefault(require("./authController"));
const express_validator_1 = require("express-validator");
const authRouter = (0, express_1.default)();
const emailMiddleware = (0, express_validator_1.check)('email', 'Email should be a valid email )').isEmail();
authRouter.get('/register', [
    emailMiddleware,
    (0, express_validator_1.check)('password', 'Password should be between 6 and 10 symbols length').isLength({
        min: 6,
        max: 20,
    }),
], authController_1.default.register);
authRouter.get('/login', [emailMiddleware], authController_1.default.login);
exports.default = authRouter;
