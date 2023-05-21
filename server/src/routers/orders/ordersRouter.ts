import express from 'express';
import { ordersControler } from './ordersController';
import authMiddleware from '../auth/middlewares/authMiddleware';

const ordersRouter = express();

ordersRouter.post('/tryOrder', [authMiddleware], ordersControler.tryOrder);
ordersRouter.get('/fetch', [authMiddleware], ordersControler.fetch);

export default ordersRouter;
