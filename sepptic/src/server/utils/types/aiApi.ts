export type message = {
    "role": "developer" | "user" | "assistant",
    "message": string
}

export type apiCall = {
    "model": "gpt-4o",
    "messages": message[]
}