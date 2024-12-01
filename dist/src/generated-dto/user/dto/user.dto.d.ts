import { AuthProvider, UserRole } from '@prisma/client';
export declare class UserDto {
    id: string;
    username: string;
    email: string;
    passwordHash: string | null;
    role: UserRole;
    authProvider: AuthProvider;
    authProviderId: string | null;
    firstName: string | null;
    lastName: string | null;
    profilePicture: string | null;
    isEmailVerified: boolean;
    nativeLanguage: string;
    lastLogin: Date | null;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
}
