import dbCreateUser from "../../../server/utils/dbCreateUser";
import type { RequestEvent } from '@sveltejs/kit';
import type { reqRegisterBody } from "../../../server/utils/types/apiRequests";

export async function POST(event: RequestEvent) {
    // const body = await event.request.json();
    let body: reqRegisterBody;
    try {
        body = await event.request.json();
    } catch (error) {
        return new Response(JSON.stringify({ message: 'Invalid Request Body', status: 400 }), { status: 400 });
    }
    const email = body.email;
    const password = body.password;
    const name = body.name;
    const result = await dbCreateUser(email, password, name);
    return new Response(JSON.stringify(result), { status: result.status });
}