// src/routes/api/check-password/+server.ts
import { json } from '@sveltejs/kit';

export async function POST({ request }) {
    const { password } = await request.json();
    console.log(process.env.CREATE_PASSWORD)
    if (password === process.env.CREATE_PASSWORD) {
        return json({ success: true });
    }
    return json({ success: false, message: "Incorrect password" }, { status: 401 });
}
