import dbCreateSession from "../../../server/utils/dbCreateSession";
import dbAuthUser from "../../../server/utils/dbAuthUser";
import dbDeleteSession from "../../../server/utils/dbDeleteSession";
import type { RequestEvent } from '@sveltejs/kit';

export async function POST(event: RequestEvent) {
    const body = await event.request.json();
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
    const sessionResponse = await dbCreateSession(result.userId);
    return new Response(JSON.stringify(sessionResponse), { status: sessionResponse.status });
}

export async function DELETE(event: RequestEvent) {
    const token = event.request.headers.get('token');
    if (!token) {
        return new Response(JSON.stringify({ message: 'No token provided', status: 400 }), { status: 400 });
    }
    const sessionResponse = await dbDeleteSession(token);
    return new Response(JSON.stringify(sessionResponse), { status: sessionResponse.status });
}