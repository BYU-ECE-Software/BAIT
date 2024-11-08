import dbCreateUser from "../../../server/utils/dbCreateUser";
import type { RequestEvent } from '@sveltejs/kit';

export async function POST(event: RequestEvent) {
    const body = await event.request.json();
    const email = body.email;
    const password = body.password;
    const name = body.name;
    const result = await dbCreateUser(email, password, name);
    return new Response(JSON.stringify(result), { status: result.status });
}