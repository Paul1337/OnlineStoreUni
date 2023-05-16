import { IUserData } from '../user/user';

export interface IAuthResponse {
    isAuthed: boolean;
    data: IUserData;
}

export interface ILoginRequest {
    email: string;
    password: string;
}

export interface ILoginResponse {
    message?: string;
    data: IUserData;
}

export interface IRegisterRequest {
    username: string;
    email: string;
    password: string;
}

export interface IRegisterResponse {
    message?: string;
    data: IUserData;
}

export interface ILogoutResponse {
    message?: string;
}
