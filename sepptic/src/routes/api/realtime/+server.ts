import { json, RequestEvent } from "@sveltejs/kit";



export async function GET(event: RequestEvent) {
  console.log("Fetching cost info from OpenAI");
  try {
    const response = await fetch("https://api.openai.com/v1/organization/costs", {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${process.env.ADMIN_API_KEY}`, // This will require an **ADMIN API KEY** 
        "Content-Type": "application/json"
      }
    })

    console.log(response);
  } catch (err) {
    console.error("Error getting Cost info from OpenAI:", err);
  }
}


export async function POST(event: RequestEvent) {

  const body = await event.request.json();

  let voiceType = body.voice; // The voice type to use for the AI response; comes from the CallCard request
  let prompt = body.prompt; // The prompt to send to the AI
  try {
    const response = await fetch("https://api.openai.com/v1/realtime/sessions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-4o-realtime-preview-2025-06-03",
        voice: voiceType,
        instructions: prompt,
        // input_audio_transcription: {
        //   language: "en" // Makes sure the model will only speak English
        // } <-- This doesn't quite work but I need to set up better testing and implement it
      }),
    });

    if (!response.ok) {
      // If the response is not OK, throw an error
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }
    const data = await response.json();

    // Send back the JSON we received from the OpenAI REST API
    return json(data);
  } catch(err) {
    console.log("Realtime Session Creation Failed", err)
  }
}