"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateAccessToken = exports.getSecretKey = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const configController_1 = __importDefault(require("../../config/configController"));
function getSecretKey() {
    const config = configController_1.default.config;
    return config.secretKey;
}
exports.getSecretKey = getSecretKey;
function generateAccessToken(payload) {
    const token = jsonwebtoken_1.default.sign(payload, getSecretKey());
    return token;
}
exports.generateAccessToken = generateAccessToken;
