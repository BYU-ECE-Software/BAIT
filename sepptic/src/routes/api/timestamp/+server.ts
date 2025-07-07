import dbAddTimestamp from '../../../server/utils/dbAddTimestamp';
import { json } from '@sveltejs/kit';
import type { RequestEvent } from '@sveltejs/kit'
import { stringify } from 'openai/internal/qs/stringify.mjs';

export async function POST(event: RequestEvent) {
    const {user, name} = await event.request.json();
    const result = await dbAddTimestamp(user, name);
    console.log(result.message);
    return json(result);
}