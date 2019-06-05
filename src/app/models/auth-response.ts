export interface AuthResponse {
    username: string;
    token: string;
    role: string;
    name: string;
    status: number;
    error: {
        response: string
    };
}
