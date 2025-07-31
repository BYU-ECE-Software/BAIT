export type Character = {
    ID: number,
    Name: string,
    Title: string,
    Voice: string,
    Image: string,
    CallorText: number,
    Description: string,
    CallLimit: number,
    Prompt: Prompt
}

export type Prompt = {
    Background: string,
    Weaknesses: string,
    Strengths: string,
    General: string,
    Critical_Info: string,
    Personality: string,
    Contacts: number[]
}