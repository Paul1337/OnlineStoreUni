import axios from 'axios';
import config from './config';
import { IAuthResponse } from '../models/api/auth';

export const authUser = async (): Promise<IAuthResponse> => {
    return axios.get(`${config.host}/auth`);
};
