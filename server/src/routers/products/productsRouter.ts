import express from 'express';
import { productsControler } from './productsController';

const productsRouter = express();

productsRouter.get('/fetch', productsControler.fetchProducts);

export default productsRouter;
