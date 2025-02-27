export type message = {
    "role": "developer" | "user" | "assistant",
    "content": string,
    "timestamp"?: Date
}

export type apiCall = {
    "model": "gpt-4o",
    "messages": message[]
}