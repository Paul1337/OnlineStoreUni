import express from 'express';
import { check } from 'express-validator';
import authMiddleware from '../auth/middlewares/authMiddleware';
import { productsControler } from './productsController';

const productsRouter = express();

productsRouter.get('/fetch', [authMiddleware], productsControler.fetchProducts);

export default productsRouter;
