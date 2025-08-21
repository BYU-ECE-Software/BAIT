// Campaign type definition
type campaign = {
    Campaign_Information: {
        Name: string;
        Description: string;
        Brief: string;
        Image: string;
        Website: string;
        Briefing_Video: string;
        Failure_Video: string;
        Final_Question: string;
        Final_Answer: string;
    };
    Characters: {
        ID: number,
        Name: string,
        Title: string,
        Voice: string,
        Image: string,
        CallorText: number,
        Description: string,
        CallLimit: number,
        Prompt: Prompt
        
    }[];
}

type Character = {
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
type Prompt = {
    Background: string,
    Weaknesses: string,
    Strengths: string,
    General: string,
    Critical_Info: string,
    Personality: string,
    Contacts: number[]
}