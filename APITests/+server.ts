import { createParser } from 'eventsource-parser';
import { OPENAI_API_KEY } from 'env';
import { createClient } from '@vercel/kv';

const key = OPENAI_API_KEY;

async function OpenAIStream(payload: StreamPayload) {
    const encoder = new TextEncoder();
    const decoder = new TextDecoder();

    const res = await fetch('https://api.openai.com/v1/completions', {
        headers: {
            'Content-Type': 'application/json',
            Authorization: ''
        }
    })
}

export async function POST({ request }: {request: any}) {
    const { prompt } = await request.json();
    const payload = {
        model: 'gpt-4o',
        message: [{ role: 'user', content: prompt}],
        stream: true;
    };
    const stream = await OpenAIStream(payload);
    return new Response(stream)
}
