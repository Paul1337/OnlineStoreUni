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

export interface IUserState {
    isAuthed: boolean;
    data?: IUserData;
}
