import dotenv from 'dotenv';
import express, { Request, Response } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import authRouter from './routers/auth/authRouter';
import dbController from './db/dbController';
import productsRouter from './routers/products/productsRouter';

const DEFAULT_PORT = 8010;

const app = express();
app.use(
    cors({
        origin: 'http://127.0.0.1:5173',
        credentials: true,
    })
);
app.use(cookieParser());
app.use(express.json());

app.use('/auth', authRouter);
app.use('/products', productsRouter);

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
