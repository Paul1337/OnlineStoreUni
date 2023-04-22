export enum UserRole {
    User,
    Admin,
}

interface IAuthedUser {
    isAuthed: true;
    id: number;
    name: string;
    role: UserRole;
    profileImg: string;
}

interface IUnauthedUser {
    isAuthed: false;
}

export type IUserState = IAuthedUser | IUnauthedUser;
