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
const express_validator_1 = require("express-validator");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const utils_1 = require("./utils");
const dbController_1 = __importDefault(require("../../db/dbController"));
const utils_2 = require("./utils");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const authController = {
    register: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        var _a, _b;
        try {
            const initialBalance = 0;
            const errors = (0, express_validator_1.validationResult)(req);
            if (!errors.isEmpty())
                return res.status(400).json({ message: 'Registration error', errors });
            console.log('Handling registration: ', JSON.stringify(req.body));
            const queryResult = yield ((_a = dbController_1.default.connection) === null || _a === void 0 ? void 0 : _a.query(`select * from User where email='${req.body.email}'`));
            console.log('query-result', queryResult);
            if (!queryResult)
                throw new Error('Query result undefined');
            // console.log('Query result:', queryResult[0]);
            const rows = queryResult[0];
            // if (!Array.isArray(rows))
            // return res.status(508).json({ message: 'Some server error, have no idea..' });
            if (rows.length == 0) {
                const passwordHash = bcryptjs_1.default.hashSync(req.body.password, 7);
                const insertRes = yield ((_b = dbController_1.default.connection) === null || _b === void 0 ? void 0 : _b.query(`insert into User (email, name, password, role, balance) values ('${req.body.email}', '${req.body.username}', '${passwordHash}', 'User', ${initialBalance}) returning id`));
                console.log('Insert res:', insertRes);
                res.status(200).json({
                    message: 'ok',
                    data: {
                        id: insertRes.insertId,
                        name: req.body.username,
                        role: 'User',
                        profileImg: '',
                        balance: initialBalance,
                    },
                });
            }
            else if (rows.length == 1) {
                res.status(403).json({ message: 'User already exists' });
            }
            else {
                throw new Error('More than one row with that email!');
            }
        }
        catch (err) {
            console.error(err);
            res.status(400).json({ message: 'Registration error' });
        }
    }),
    login: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        var _c;
        try {
            const { email, password } = req.body;
            const queryResult = yield ((_c = dbController_1.default.connection) === null || _c === void 0 ? void 0 : _c.query(`select * from User where email='${req.body.email}'`));
            const rows = queryResult === null || queryResult === void 0 ? void 0 : queryResult[0];
            const user = rows[0];
            if (!user)
                return res.status(400).json({ message: `User ${email} not found` });
            console.log('user ', user);
            const validPassword = bcryptjs_1.default.compareSync(password, user.password);
            if (!validPassword) {
                return res.status(400).json({ message: `Password is incorrect` });
            }
            const token = (0, utils_1.generateAccessToken)({
                id: user.id,
                name: user.name,
                role: user.role,
            });
            res.cookie('authToken', token, {
                httpOnly: true,
                maxAge: 1000 * 60 * 60 * 48,
                // secure: true,
            });
            return res.json({
                mesasge: 'success',
                data: {
                    id: user.id,
                    name: user.name,
                    role: user.role,
                    profileImg: '',
                    balance: user.balance,
                },
            });
        }
        catch (e) {
            console.log(e);
            res.status(400).json({ message: 'Login error' });
        }
    }),
    logout: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            res.clearCookie('authToken');
            return res.json({ message: 'success' });
        }
        catch (e) {
            console.log(e);
            res.status(400).json({ message: 'Logout error' });
        }
    }),
    auth: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const token = req.cookies.authToken;
            // console.log('Got token', token);
            if (!token) {
                console.warn('No token');
                return res.status(403).json({ message: 'User is not authed' });
            }
            const decodedData = jsonwebtoken_1.default.verify(token, (0, utils_2.getSecretKey)());
            console.log('Decoded data:', decodedData);
            return res.json({
                message: 'success',
                data: decodedData,
            });
        }
        catch (e) {
            console.log(e);
            res.status(400).json({ message: 'Auth error' });
        }
    }),
};
exports.default = authController;
