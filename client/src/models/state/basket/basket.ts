import { IProductItem, ProductList } from '../product/product';

export interface IBasketProductItem extends IProductItem {
    count: number;
}

export type BasketProductList = Array<IBasketProductItem>;

export interface IBasketState {
    products: BasketProductList;
}
