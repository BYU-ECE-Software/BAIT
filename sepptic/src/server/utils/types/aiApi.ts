// Type definition for a message object sent to the ChatGPT API
export type message = {
    "role": "developer" | "user" | "assistant",
    "content": string,
    "timestamp"?: Date
}

// Type definition for an API call to the ChatGPT API
export type apiCall = {
    "model": "gpt-4o",
    "messages": message[]
}