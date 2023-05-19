import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import bcrypt from 'bcryptjs';
import { generateAccessToken } from './utils';
import dbController from '../../db/dbController';
import { getSecretKey } from './utils';
import jwt from 'jsonwebtoken';
import { RowDataPacket } from 'mysql2';
import { OkPacket } from 'mysql2';

const authController = {
    register: async (req: Request, res: Response) => {
        try {
            const initialBalance = 0;

            const errors = validationResult(req);

            if (!errors.isEmpty())
                return res.status(400).json({ message: 'Registration error', errors });

            console.log('Handling registration: ', JSON.stringify(req.body));

            const queryResult = await dbController.connection?.query(
                `select * from User where email='${req.body.email}'`
            );
            console.log('query-result', queryResult);
            if (!queryResult) throw new Error('Query result undefined');

            // console.log('Query result:', queryResult[0]);
            const rows = queryResult[0] as RowDataPacket[];
            // if (!Array.isArray(rows))
            // return res.status(508).json({ message: 'Some server error, have no idea..' });
            if (rows.length == 0) {
                const passwordHash = bcrypt.hashSync(req.body.password, 7);
                const insertRes = await dbController.connection?.query(
                    `insert into User (email, name, password, role, balance) values ('${req.body.email}', '${req.body.username}', '${passwordHash}', 'User', ${initialBalance}) returning id`
                );
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
            } else if (rows.length == 1) {
                res.status(403).json({ message: 'User already exists' });
            } else {
                throw new Error('More than one row with that email!');
            }
        } catch (err) {
            console.error(err);
            res.status(400).json({ message: 'Registration error' });
        }
    },
    login: async (req: Request, res: Response) => {
        try {
            const { email, password } = req.body;

            const queryResult = await dbController.connection?.query(
                `select * from User where email='${req.body.email}'`
            );
            const rows = queryResult?.[0] as RowDataPacket[];

            const user = rows[0];
            if (!user) return res.status(400).json({ message: `User ${email} not found` });

            console.log('user ', user);

            const validPassword = bcrypt.compareSync(password, user.password);
            if (!validPassword) {
                return res.status(400).json({ message: `Password is incorrect` });
            }

            const token = generateAccessToken({
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
        } catch (e) {
            console.log(e);
            res.status(400).json({ message: 'Login error' });
        }
    },
    logout: async (req: Request, res: Response) => {
        try {
            res.clearCookie('authToken');
            return res.json({ message: 'success' });
        } catch (e) {
            console.log(e);
            res.status(400).json({ message: 'Logout error' });
        }
    },
    auth: async (req: Request, res: Response) => {
        try {
            const token = req.cookies.authToken;
            // console.log('Got token', token);
            if (!token) {
                console.warn('No token');
                return res.status(403).json({ message: 'User is not authed' });
            }
            const decodedData = jwt.verify(token, getSecretKey());
            console.log('Decoded data:', decodedData);
            return res.json({
                message: 'success',
                data: decodedData,
            });
        } catch (e) {
            console.log(e);
            res.status(400).json({ message: 'Auth error' });
        }
    },
};

export default authController;
