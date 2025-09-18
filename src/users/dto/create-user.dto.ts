export class CreateUserDto {
    username: string;
    email: string;
    passwordHash: string;
    bio: string;
    createdAt: Date;
    roleName: string;
}
