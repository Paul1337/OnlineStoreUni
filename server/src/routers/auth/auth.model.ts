export enum UserRole {
    User = 'User',
    Admin = 'Admin',
}

export interface IJWTPayload {
    id: number;
    name: string;
    email: string;
    role: UserRole;
    profileImg?: string;
    balance: number;
}
