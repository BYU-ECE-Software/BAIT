import type { message, apiCall } from './types/aiApi';
import OpenAI from 'openai';

export default async function aiSendMessage(messages: message[], message: string, prompt: string) {
    const apiCall: apiCall = {
        model: 'gpt-4o',
        messages: messages
    }

    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
    const apiResponse = await openai.chat.completions.create(apiCall);


}