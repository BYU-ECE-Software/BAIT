import { json } from "@sveltejs/kit";

// An endpoint which would work with the client code above - it returns
// the contents of a REST API request to this protected endpoint
export async function POST() {
  const response = await fetch("https://api.openai.com/v1/realtime/sessions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "gpt-4o-realtime-preview-2025-06-03",
      voice: "ash",
      instructions: "This is a placeholder prompt, please act like a goofy clown ChatGPT"
    }),
  });

  if (!response.ok) {
    // If the response is not OK, throw an error
    throw new Error(`Error: ${response.status} ${response.statusText}`);
  }
  const data = await response.json();

  // Send back the JSON we received from the OpenAI REST API
  return json(data);
}