"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateAccessToken = exports.getSecretKey = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
function getSecretKey() {
    const configPath = path_1.default.join(__dirname, '../../', 'config.json');
    console.log('config-path:', configPath);
    const config = JSON.parse(fs_1.default.readFileSync(configPath, 'utf-8'));
    return config.secretKey;
}
exports.getSecretKey = getSecretKey;
function generateAccessToken(payload) {
    const token = jsonwebtoken_1.default.sign(payload, getSecretKey());
    return token;
}
exports.generateAccessToken = generateAccessToken;
