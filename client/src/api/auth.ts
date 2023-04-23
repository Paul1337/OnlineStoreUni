import axios from 'axios';
import config from './config';
import {
    IAuthResponse,
    ILoginRequest,
    ILoginResponse,
    IRegisterRequest,
    IRegisterResponse,
} from '../models/api/auth';

export const authUser = async (): Promise<IAuthResponse> => {
    return (await axios.get(`${config.host}/auth`)).data;
};

export const loginUser = async (data: ILoginRequest): Promise<ILoginResponse> => {
    return (await axios.post(`${config.host}/auth/login`, data)).data;
};

export const registerUser = async (data: IRegisterRequest): Promise<IRegisterResponse> => {
    return (await axios.post(`${config.host}/auth/register`, data)).data;
};
