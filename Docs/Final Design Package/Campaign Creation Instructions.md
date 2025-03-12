# Campaign Creation Instructions

This file serves to explain how to create a new campaign for SEPPTIC. It includes instructions on how to add prompts, pictures, quizzes, and how to filter characters so they have to be unlocked before they are shown.

### Campaign JSON File

The most important file for creating a new campaign is the campaign JSON file. This file is placed in the /SEPPTIC/sepptic/server/campaigns directory. `2.json` is the Harvesta campaign, so it can be used as an example. The basic structure of the file is as follows:

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

`Campaign_Information` holds general information about the campaign. Most of it is self-explanatory. The `Website` property is meant for a fake website made for the company/organization that the user is social engineering. It can be left blank if it doesn't make sense for the campaign. The `Briefing_Video` property is for the briefing video. Originally we wanted to host the video locally on the server, but the formatting and quality wouldn't work like we wanted. Instead, we used a link to the video uploaded to YouTube. `Failure_Video` is meant to play if the user fails to complete the campaign. This is related to the unfinished 'Security' character/component, in which a user can be reported to security and kicked out, after which the video would play. We never fleshed this out, so we left it blank. If you do figure this out, use this property to do so.

The `Characters` object is where the different personas are defined, including the AI prompts. Again, most of this is self-explanatory. `ID` is used for character unlocking, these are unique so no two characters should have the same ID. `Title` is what the personas job is, receptionist, team lead, etc. `Image` is the image that will show in the 'Main Dashboard' and 'Progress' screens for the persona. `Prompt` is the most important, that is the initial instruction that will be sent to the AI API before the user interacts with it. We recommend not doing prompt testing through the site itself. If you are using OpenAI, go to [OpenAI playground](https://platform.openai.com/playground/) to do so. The `Intel` object is where the intel the persona has, as well as the quiz to prove the user got said intel are defined (This was our solution, there might be a more elegant way to confirm intel using OpenAI functions, but this is quick and easy). `Intel_ID`, like character `ID`, is used for unlocking new characters, again it is unique. `Intel_Description` is  


say where images should be stored.