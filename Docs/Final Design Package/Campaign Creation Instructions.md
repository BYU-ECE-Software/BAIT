# Campaign Creation Instructions

This file serves to explain how to create a new campaign for SEPPTIC. It includes instructions on how to add prompts, pictures, quizzes, and how to filter characters so they have to be unlocked before they are shown.

## Campaign JSON File

The most important file for creating a new campaign is the campaign JSON file. This file is placed in the /SEPPTIC/sepptic/server/campaigns directory. `2.json` is the Harvesta campaign, so it can be used as an example. The basic structure of the file is as follows:

```typescript 
    type campaign = {
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
        };
    };
    Achievements: {
        ID: number;
        Name: string;
        Description: string;
        Image: string;
        Intels: number;
    };
}
```
### Campaign Information
`Campaign_Information` holds general information about the campaign. Most of it is self-explanatory.

`Description` will show in the 'Campaigns' page, as well as under the briefing video on the 'Mission Briefing' page. 

The `Website` property is meant for a fake website made for the company/organization that the user is social engineering, and is meant for general OSINT on said company. It can be left blank if it doesn't fit in the context of the campaign. 

The `Briefing_Video` property is for the briefing video. Originally we wanted to host the video locally on the server, but the formatting and quality wouldn't work like we wanted. Instead, we used a link to the video uploaded to YouTube. 

`Failure_Video` is meant to play if the user fails to complete the campaign. This is related to the unfinished 'Security' character/component, in which a user can be reported to security and kicked out, after which the video would play. We never fleshed this out, so we left it blank. If you do figure this out, use this property to do so.

### Characters
The `Characters` object is where the different personas are defined, including the AI prompts. Again, most of this is self-explanatory. 

`ID` is used for character unlocking, these are unique so no two characters should have the same ID. 

`Title` is what the persona's job is; receptionist, team lead, etc. 

`Image` is the image that will show in the 'Main Dashboard' and 'Progress' screens for the persona. 

`Prompt` is the most important, that is the initial instruction that will be sent to the AI API before the user interacts with it. We recommend not doing prompt testing through the site itself. If you are using OpenAI, go to [OpenAI playground](https://platform.openai.com/playground/) to do so. 
#### Intel
The `Intel` sub-object is where the intel the persona has, as well as the quiz to prove the user got said intel, are defined (This was our solution, there might be a more elegant way to confirm intel using OpenAI functions, but this is quick and easy). 

`Intel_ID`, like character `ID`, is unique. It is required to have several objects within the `Intel` object, so it doesn't serve any direct purpose besides differentiation. 

`Intel_Description` is what will show under a persona in the 'Progress' tab. This should be a recap of the intel, as well as the answer, as it only shows up after the user has taken the quiz for the intel and can be referenced during future interactions. 

`Unlocks_Character_ID` is used to show new characters as a user answers the quiz questions. If a persona is locked at the beginning of the campaign, you can add the character ID to this property in the intel that you want to unlock them. So, if you have a locked persona with `ID` 5, you would add 5 to the `Unlocks_Character_ID` property, and when the user answers the quiz for that intel, character 5 will be unlocked. There is some work that has to be done on the back end to keep locked characters from showing until the user has answered the question, see the 'Filtering' section of this document for how to do that. 

`Quiz` is the quiz question that the user will be given to prove that they completed social engineering the persona. 

`Answer` is the answer that is needed to complete the quiz. Currently, if the answer the user gives contains the text in `Answer` anywhere it will be accepted, but this can be changed to be more strict. 

### Images
All images that are referenced in this file can be stored in `/SEPPTIC/sepptic/static`. They can be stored in other places, you will just have to add the correct path.

## Filtering
Filtering is used to hide locked characters so that users can't see them until they have answered any pertinent intel quizzes.