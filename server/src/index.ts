import dotenv from 'dotenv';
import express, { Request, Response } from 'express';

const DEFAULT_PORT = 3000;

const app = express();

dotenv.config();

const PORT = process.env.PORT || DEFAULT_PORT;

app.get('/', (req: Request, res: Response) => res.status(200).send('ok'));

try {
    app.listen(PORT, () => console.log(`Server listening on PORT = ${PORT}`));
} catch (err) {
    console.error(err);
}
