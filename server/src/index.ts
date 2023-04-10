import dotenv from 'dotenv';
import express, { Request, Response } from 'express';
import cors from 'cors';

import authRouter from './routers/auth/authRouter';

const DEFAULT_PORT = 8010;

const app = express();
app.use(cors());
app.use(express.json());
app.use('/auth', authRouter);

dotenv.config();

const PORT = process.env.PORT || DEFAULT_PORT;

app.get('/', (req: Request, res: Response) => res.status(200).send('ok'));

async function main() {
    try {
        app.listen(PORT, () => console.log(`Server listening on PORT = ${PORT}`));
    } catch (err) {
        console.error(err);
    }
}

main();
