export type message = {
    "role": "developer" | "user" | "assistant",
    "content": string
}

export type apiCall = {
    "model": "gpt-4o",
    "messages": message[]
}