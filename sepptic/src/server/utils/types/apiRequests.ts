export type reqAuthPostBody = {
    email: string;
    password: string;
}

export type reqAuthPostResponse = {
    token: string | null;
    expiration: Date | null;
    message: string;
    status: number;
}

export type reqRegisterBody = {
    email: string;
    password: string;
    name: string;
}