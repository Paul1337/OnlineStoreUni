export interface IProductItem {
    id: number;
    title: string;
    description: string;
    img: string;
    price: number;
    categoryName: string;
}

export type ProductList = Array<IProductItem>;
