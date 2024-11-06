import dbCreateSession from "$lib/logic/dbCreateSession";
import dbAuthUser from "$lib/logic/dbAuthUser";
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