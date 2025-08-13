import OpenAI from 'openai';


let previousId: string;

// Function to send a message to the ChatGPT API. Takes in the message to send and the prompt to send.
export default async function aiSendMessage(message: string, prompt: string) {
    const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
    
    const response = await client.responses.create({
        model: 'gpt-5',
        instructions: prompt,
        input: message,
        store: true,
        reasoning: {
            effort: "low", // Prevents GPT-5 from taking forever to respond
        },
        previous_response_id: previousId
    })

    console.log("The previous id is: ", previousId)

    previousId = response.id;

    console.log("The current id: ", response.id);

    console.log("The previous id has been set to: ", previousId);
    

    return response.output_text;
    
}