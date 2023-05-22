import axios from 'axios';
import config from './config';
import { IFetchOrdersResponse, ITryOrderRequest, ITryOrderResponse } from '../models/api/orders';
import { IUserState } from '../models/user/user';

export const fetchOrders = async (): Promise<IFetchOrdersResponse> => {
    return (
        await axios.get(`${config.host}/orders/fetch`, {
            withCredentials: true,
        })
    ).data;
};

export const tryOrder = async ({ items }: ITryOrderRequest): Promise<ITryOrderResponse> => {
    return (
        await axios.post(
            `${config.host}/orders/tryOrder`,
            { items },
            {
                withCredentials: true,
            }
        )
    ).data;
};
