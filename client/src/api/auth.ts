import axios from 'axios';
import config from './config';
import {
    IAuthResponse,
    ILoginRequest,
    ILoginResponse,
    ILogoutResponse,
    IRegisterRequest,
    IRegisterResponse,
} from '../models/api/auth';

export const authUser = async (): Promise<IAuthResponse> => {
    return (
        await axios.get(`${config.host}/auth`, {
            withCredentials: true,
        })
    ).data;
};

export const loginUser = async (data: ILoginRequest): Promise<ILoginResponse> => {
    return (
        await axios.post(`${config.host}/auth/login`, data, {
            withCredentials: true,
        })
    ).data;
};

export const logoutUser = async (): Promise<ILogoutResponse> => {
    return (
        await axios.post(
            `${config.host}/auth/logout`,
            {},
            {
                withCredentials: true,
            }
        )
    ).data;
};

export const registerUser = async (data: IRegisterRequest): Promise<IRegisterResponse> => {
    return (await axios.post(`${config.host}/auth/register`, data)).data;
};
