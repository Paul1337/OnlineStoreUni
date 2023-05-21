import { IProductItem } from '../state/product/product';

export enum UserRole {
    User = 'User',
    Admin = 'Admin',
}

export interface IUserData {
    id: number;
    email: string;
    name: string;
    role: UserRole;
    profileImg: string;
    balance: number;
}

export interface ProductOrder {
    count: number;
    item: IProductItem;
}

export interface IOrder {
    date: Date;
    price: number;
    products: Array<ProductOrder>;
}

export interface IUserState {
    isAuthed: boolean;
    data?: IUserData;
    orders: Array<IOrder> | null;
}
