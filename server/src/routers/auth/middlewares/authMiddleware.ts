import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { getSecretKey } from '../utils';
import { IJWTPayload } from '../auth.model';

export default function (req: Request, res: Response, next: NextFunction) {
    if (req.method == 'OPTIONS') {
        next();
    }

    try {
        if (!req.headers.authorization) throw 'no auth header';
        const token = req.headers.authorization.split(' ')[1];
        if (!token) {
            return res.status(403).json({ message: 'Пользователь не авторизован' });
        }
        const decodedData = jwt.verify(token, getSecretKey());
        console.log('Decoded data:', decodedData);
        if (typeof decodedData == 'object') {
            req.tokenPayload = decodedData;
        }
        next();
    } catch (err) {
        console.log(err);
        return res.status(403).json({ message: 'Пользователь не авторизован' });
    }
}
