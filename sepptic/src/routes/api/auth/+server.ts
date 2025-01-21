import dbCreateSession from "../../../server/utils/dbCreateSession";
import dbAuthUser from "../../../server/utils/dbAuthUser";
import dbDeleteSession from "../../../server/utils/dbDeleteSession";
import type { RequestEvent } from '@sveltejs/kit';
import type { reqAuthPostBody, reqAuthPostResponse } from "../../../server/utils/types/apiRequests";
import cookie from 'cookie';

export async function POST(event: RequestEvent) {
    // Get and validate request body
    let body: reqAuthPostBody;
    try {
        body = await event.request.json();
    } catch (error) {
        return new Response(JSON.stringify({ message: 'Invalid request body: ' + error, status: 400 }), { status: 400 });
    }

    // Authenticate username and password
    const result = await dbAuthUser(body.email, body.password);
    if (!result.success || !result.userId) {
        const response = {
            sessionId: null,
            token: null,
            message: result.message,
            status: result.status
        }
        return new Response(JSON.stringify(response), { status: result.status });
    }
    const sessionResponse: reqAuthPostResponse = await dbCreateSession(result.userId);

    // Check if the session was created
    if (!sessionResponse.token || !sessionResponse.expiration) {
        const response = {
            sessionId: null,
            message: sessionResponse.message,
            status: sessionResponse.status
        }
        return new Response(JSON.stringify(response), { status: sessionResponse.status });
    }

    // Set cookie with token
    const cookie = `token=${sessionResponse.token}; HttpOnly; Secure; Path=/; Max-Age=${Math.floor((sessionResponse.expiration.getTime() - Date.now()) / 1000)}`;

    const sessionStatus = {
        message: sessionResponse.message,
        status: sessionResponse.status
    }

    return new Response(JSON.stringify(sessionStatus), {
        status: sessionResponse.status,
        headers: {
            'Set-Cookie': cookie
        }
    });
}

export async function DELETE(event: RequestEvent) {
    const cookies = cookie.parse(event.request.headers.get('cookie') || '');
    const token = cookies.token;
    if (!token) {
        return new Response(JSON.stringify({ message: 'No token provided', status: 400 }), { status: 400 });
    }
    const sessionResponse = await dbDeleteSession(token);
    return new Response(JSON.stringify(sessionResponse), { status: sessionResponse.status });
}