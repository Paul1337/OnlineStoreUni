import axios from 'axios';
import config from './config';
import { IFetchOrdersResponse, ITryOrderResponse } from '../models/api/orders';
import { IUserState } from '../models/user/user';

export const fetchOrders = async (userState: IUserState): Promise<any> => {
    return (
        await axios.get(`${config.host}/orders/fetch`, {
            withCredentials: true,
            params: {
                email: userState.data?.email,
            },
        })
    ).data;
};

export const tryOrder = async (userState: IUserState): Promise<ITryOrderResponse> => {
    return (
        await axios.post(
            `${config.host}/orders/tryOrder`,
            {
                email: userState.data?.email,
            },
            {
                withCredentials: true,
            }
        )
    ).data;
};
