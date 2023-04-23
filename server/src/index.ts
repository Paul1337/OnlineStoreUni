import dotenv from 'dotenv';
import express, { Request, Response } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import authRouter from './routers/auth/authRouter';
import dbController from './db/dbController';

const DEFAULT_PORT = 8010;

const app = express();
app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use('/auth', authRouter);

dotenv.config();
const PORT = process.env.PORT || DEFAULT_PORT;

app.get('/', (req: Request, res: Response) => res.status(200).send(`ok ${Date.now()}`));

async function main() {
    try {
        app.listen(PORT, () => console.log(`Server listening on PORT = ${PORT}`));
        await dbController.connect();
    } catch (err) {
        console.error(err);
    }
}

main();
