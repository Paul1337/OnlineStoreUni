"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const utils_1 = require("../utils");
function default_1(req, res, next) {
    if (req.method == 'OPTIONS') {
        next();
    }
    try {
        console.log('Middleware verification start');
        const token = req.cookies.authToken;
        if (!token) {
            return res.status(403).json({ message: 'User is not authed' });
        }
        const decodedData = jsonwebtoken_1.default.verify(token, (0, utils_1.getSecretKey)());
        console.log('Decoded data:', decodedData);
        if (typeof decodedData == 'object') {
            req.tokenPayload = decodedData;
        }
        next();
    }
    catch (err) {
        console.log(err);
        return res.status(403).json({ message: 'User is not authed' });
    }
}
exports.default = default_1;
