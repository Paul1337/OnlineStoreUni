enum UserRole {
    User,
    Admin,
}

interface User {
    name: string;
    role: UserRole;
    profileImg: string;
}
