import { ProductOrder, OrderList } from '../user/user';

// export interface IFetchOrdersResponse = any
export type IFetchOrdersResponse = any;
export interface ITryOrderResponse {
    newBalance: number;
    message: string;
}

export interface ITryOrderRequest {
    items: Array<{
        id: number;
        count: number;
        price: number;
    }>;
}
