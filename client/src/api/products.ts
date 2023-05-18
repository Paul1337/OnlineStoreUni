import axios from 'axios';
import config from './config';

export const fetchProducts = async (): Promise<any> => {
    return (
        await axios.get(`${config.host}/products/fetch`, {
            withCredentials: true,
        })
    ).data;
};
