import { AuthProvider, UserRole } from '@prisma/client';
export declare class CreateUserDto {
    last_name?: string;
    first_name?: string;
    username: string;
    email: string;
    password: string;
    nativeLanguage: string;
    profile_picture?: string;
    role?: UserRole;
    auth_provider?: AuthProvider;
}
