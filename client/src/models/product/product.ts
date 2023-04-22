export interface IProductItem {
    id: number;
    title: string;
    description: string;
    img: string;
    price: number;
}

export type ProductList = Array<IProductItem>;
