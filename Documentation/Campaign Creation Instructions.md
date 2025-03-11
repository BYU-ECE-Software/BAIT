# Campaign Creation Instructions

This file serves to explain how to create a new campaign for SEPPTIC. It includes instructions on how to add prompts, pictures, quizzes, and how to filter characters so they have to be unlocked before they are shown.

### Campaign JSON File

```typescript type campaign = {
    Campaign_Information: {
        Name: string;
        Description: string;
        Image: string;
        Website: string;
        Briefing_Video: string;
        Failure_Video: string;
    };
    Characters: {
        ID: number;
        Name: string;
        Title: string;
        Image: string;
        Prompt: string;
        Intel: {
            Intel_ID: number;
            Intel_Description: string;
            Unlocks_Character_ID?: number;
            Quiz: string;
            Answer: string;
        }[];
    }[];
    Achievements: {
        ID: number;
        Name: string;
        Description: string;
        Image: string;
        Intels: number[];
    }[];
}
```