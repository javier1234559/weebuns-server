export declare class UpdateUserDto {
    username?: string;
    email?: string;
    passwordHash?: string | null;
    authProviderId?: string | null;
    firstName?: string | null;
    lastName?: string | null;
    profilePicture?: string | null;
    nativeLanguage?: string;
    lastLogin?: Date | null;
    deletedAt?: Date | null;
}
