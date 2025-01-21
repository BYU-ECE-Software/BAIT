export type dbAuthUserResult = {
    success: boolean;
    userId: number | null;
    message: string;
    status: number;
}

export type getUserIdResult = {
    userId: number | null;
    message: string;
    status: number;
    sessionId: number | null;
}

export type dbCreateUserResult = {
    userId: number | null;
    message: string;
    status: number;
}