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
const dbController_1 = __importDefault(require("../../db/dbController"));
const authController = {
    register: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        try {
            const errors = (0, express_validator_1.validationResult)(req);
            if (!errors.isEmpty())
                return res.status(400).json({ message: 'Registration error', errors });
            console.log('Handling registration: ', JSON.stringify(req.body));
            const queryResult = yield ((_a = dbController_1.default.connection) === null || _a === void 0 ? void 0 : _a.query(`select * from User where email=${req.body.email}`));
            console.log('query-result', queryResult);
            if (!queryResult)
                throw new Error('Query result undefined');
            // const queryResult = await dbController.dbClient.query(
            //     `select * from public.user where email='${req.body.email}'`
            // );
            console.log('Query result:', queryResult);
            const rows = queryResult[0];
            console.log(rows);
            // if (rows.length == 0) {
            // //     const passwordHash = bcrypt.hashSync(req.body.password, 7);
            // //     const insertRes = await dbController.dbClient.query(
            // //         `insert into public.user (email, first_name, last_name, phone_number, password, role) values ('${req.body.email}', '${req.body.first_name}', '${req.body.last_name}', '${req.body.phone_number}', '${passwordHash}', 'user')`
            // //     );
            // //     console.log('Insert res:', insertRes);
            // //     res.status(200).json({ message: 'ok' });
            // } else if (rows.length == 1) {
            //     res.status(403).json({ message: 'User already exists' });
            // } else {
            //     throw new Error('More than one row with that email!');
            // }
            // if no -> registrate user
            // is has some -> error
        }
        catch (err) {
            console.error(err);
            res.status(400).json({ message: 'Registration error' });
        }
    }),
    login: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { email, password } = req.body;
            // return res.status(400).json({ message: `Пользователь ${email} не найден` });
            // const validPassword = bcrypt.compareSync(password, user.password);
            // if (!validPassword) {
            // return res.status(400).json({ message: `Введен неверный пароль` });
            // }
            // const token = generateAccessToken({
            //     user_id: user.id,
            // });
            // req.headers.authorization = `Bearer ${token}`;
            return res.json({
                loginResult: 'success',
            });
        }
        catch (e) {
            console.log(e);
            res.status(400).json({ message: 'Login error' });
        }
    }),
};
exports.default = authController;
