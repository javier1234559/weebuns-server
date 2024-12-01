import { User } from 'src/models/user/entities/user.entity';
export declare class UserLoginResponse {
    access_token: string;
    user: User;
}
export declare class UserRegisterResponse {
    access_token: string;
    user: User;
}
export declare class UserRefreshTokenResponse {
    access_token: string;
    refresh_token: string;
}
export declare class UserResponse {
    user: User;
}
export declare class LogoutResponse {
    message: string;
}
