// Type definitions for the results of various functions

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
    sessionId?: number;
}

export type dbCreateUserResult = {
    userId: number | null;
    message: string;
    status: number;
}