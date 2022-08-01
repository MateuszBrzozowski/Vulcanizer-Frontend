export interface ResetPasswordBody {
    token : string,
    password: string;
    email: string;
    firstName: string;
    lastName: string;
}