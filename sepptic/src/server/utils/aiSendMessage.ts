import type { ChatCompletion } from 'openai/resources/index.mjs';
import type { message, apiCall } from './types/aiApi';
import OpenAI from 'openai';


export default async function aiSendMessage(messages: message[], message: string, prompt: string) {
    let apiMessages: message[] = [{ role: 'developer', content: prompt }, ...messages, { role: 'user', content: message }];

    const apiCall: apiCall = {
        model: 'gpt-4o',
        messages: apiMessages
    }

    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
    const apiResponse: ChatCompletion = await openai.chat.completions.create(apiCall);
    return apiResponse;
}