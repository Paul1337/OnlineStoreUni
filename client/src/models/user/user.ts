export enum UserRole {
    User = 'User',
    Admin = 'Admin',
}

export interface IUserData {
    id: number;
    name: string;
    role: UserRole;
    profileImg: string;
}

export interface IUserState {
    isAuthed: boolean;
    data?: IUserData;
}

// interface IAuthedUser {
//     isAuthed: true;
//     data: IUserData;
// }

// interface IUnauthedUser {
//     isAuthed: false;
// }

// export type IUserState = IAuthedUser | IUnauthedUser;
