import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { getSecretKey } from '../utils';
import { IJWTPayload } from '../auth.model';

export default function (req: Request, res: Response, next: NextFunction) {
    if (req.method == 'OPTIONS') {
        next();
    }

    try {
        console.log('Middleware verification start');

        const token = req.cookies.authToken;
        if (!token) {
            return res.status(403).json({ message: 'User is not authed' });
        }
        const decodedData = jwt.verify(token, getSecretKey());
        console.log('Decoded data:', decodedData);
        if (typeof decodedData == 'object') {
            req.tokenPayload = decodedData;
        }
        next();
    } catch (err) {
        console.log(err);
        return res.status(403).json({ message: 'User is not authed' });
    }
}
