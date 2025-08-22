# Campaign Creation Documentation
*A guide for creating a campaign that works with the BAIT system. Also, documentation of how the first campaign, Harvesta, was created.*

## Files 
`character-sheets` - contains individual files that define the characters found in the Harvesta campaign. 
`harvesta-overview` - an explanation of the campaign, intended outcomes, and ways to get the solution. 
`harvesta-walkthrough` - a concise explanation of how to find the solution. 

## Campaign JSON File 
In the following filepath in this directory, the campaign JSON files can be found. They must be named an integer (1, 2, 3, etc). 
```
sepptic/server/campaigns
```

These files contain the definition for the campaign's gameplay details.

The file is split into two major sections, Campaign Information and Characters. 

### Campaign Information
| Object Name | Description | 
| --- | --- |
|**Name**|The name of the campaign as shown practically everywhere|
|**Description**|This is the description that is shown on the campaign selection screen.
|**Brief**|This is the longer description that is shown on the campaign onboarding screen.|
|**Image**|The filepath for the campaign image|
|**Website**|The path for a website associated with the campaign, such as the fake Harvesta website|
|**Briefing Video**|The path for a video file meant to be put in the campaign onboarding section.|
|**Success and Failure videos**|These are meant to hold videos for campaign success and failure. They were not implemented at the time of this writing.|
|**Final Question**|This holds the text of the final campaign question.|
|**Campaign Knowledge**|This is information about the campaign that all the characters are meant to know in character.|
|**Final Answer**|This holds an array of strings that are considered valid answers for that final question.|
|**Attack Knowledge**|This is for the information that the AIs know but the characters are not neccessarily aware of. You can put all sorts of information here, from awareness of social engineering attacks to prompts designed to prevent prompt engineering.|

### Characters

The Characters part of the JSON file is an array of JSON objects that each represent a character. 

|Object Name|Description|
|---|---|
|**ID**|A numerical designation that is meant to be unique for each character.|
|**Name**|The character's full name.|
|**Title**|This is the title associated with the character. In the Harvesta campaign, it was used for the individual's job title.|
|**Image**|The filepath for the image used to represent the character.|
|**Voice**|This is the voice codename that will be used for the AI voice chat.|
|**Call or Text**|This is used to determine what you can do with the character; text, call, or both. 0 - Call only, 1 - Text Only, 2 - Both. This was planned but not implemented.|
|**Description**|This is a character description that is given to the players as an OSINT summary.|
|**Call Limit**|How long the voice calls for this character is allowed to go, measured in milliseconds. (60000 = 1 min)|
|**Prompt**|This contains the JSON bits that are passed to the AI|

#### Individual Character Prompt 
|Prompt object|Description|
|---|---|
|**Background**|This contains who the character is--essentially their backstory.|
|**Weaknesses and Strength**|These sections detail the specific strengths and weaknessses that the character is meant to have.|
|**General**|General information that the character knows that may be useful in the campaign but does not pertain directly to the answer to the final question of the campaign.|
|**Critical Info**|This holds the information that is known that is directly critical for finding the answer to the campaign.|
|**Personality**|This is meant to hold details on how the character acts as they are commmunicated with. It is both their personality and how they communicate.|
|**Contacts**|This is an array of numbers, corresponding to the IDs of the other characters. This causes the prompt to include brief identification of each character in the list: basically, `"You know <character name> the <character title>."`|

## Campaign Design Philosophy
### 1 - The End Goal 
Campaigns need to be created with a goal in mind--an objective that the player needs to reach, a piece of information that the player has to discover by prying bits of information out of the characters and then putting them all together. It can be as simple as you want, or as complex. It can require as much or as little deduction as you desire. The best place to start is at the end, with the answer you want the players to find. 

Generally, this answer will emerge from the campaign idea. The platform is designed to teach social engineering through simulation. Anyone who wants to make a campaign for it must consider what they want to teach and how they intend to teach it. 

### 2 - The Scenario
The type of social engineering you want to teach should inform the way the scenario is put together. Is the end goal to learn to take advantage of a specific aspect of social engineering? Then the scenario should be informed by it. Is it meant to teach collecting little bits of information and putting them together to figure out the answer? The same principle applies. 

### 3 - The Characters
Designing characters is where the process of campaign creation becomes less abstract and more direct. Once you have the final answer of the campaign in mind, you can consider who the characters are going to be. You may already have several in mind when you came up with the campaign idea. However, each character must have a purpose. In our design process, we came up with four categories: Pointer, Easy, Medium, Hard, and Red Herring. You may create your own categories as you see fit. We used these categories to sort our characters, after we came up with them. 

Here is how we defined the categories that we created: 
|Category|Description|
|---|---|
|**Pointer**|Characters that were designed to point the players to different characters. These had little information that pertained to finding the answer, but had information that would hint at what could be used to socially engineer other characters.|
|**Easy, Medium, Hard**|Characters that would be at the different difficulty levels to social engineer. The higher the difficulty, the more important the information the character held.|
|**Red Herring**|A character that is meant to be a distraction, that has no meaningful information on the campaign's end answer.|

When creating characters, you want to make sure that they have a point. The more characters that you include in the campaign, the more it will grow in complexity. I strongly recommend having a central document that contains all of the characters' details assembled in one place. However, the part the character plays in the campaign is not the only thing that should be considered. You will need to consider realism as well. It is relatively easy to poke holes in an AI chatbot at the best of times, and you do not want a player's suspension of disbelief to be broken by the AI saying something akin to "I'm an AI and I'm here to help!" Having an age, a birthday, a family, and hobbies detailed in the prompt can be of great help in giving the AI's performance a sheen of realism. 

The strengths and weaknesses of a character are also important. When we created this system, we focused on five aspects of social engineering. They are as follows. 
1. Authority
1. Impersonation
1. Intimidation
1. Quid Pro Quo 
1. Urgency

With each character, we chose one or more of these and based their weaknesses around them. We did not explicitly make every character have an exact one of these five as a weakness, but each was based off of one of those. 

### 4 - Prompt Design and Distillation
As we create character prompts, they may grow incredibly long. See the example below. 


Example Prompt 1: 
```
    "Background": "Ann is a 42-year-old African-American woman. She has worked for Harvesta for the past 4 years, and before that she worked at Wells Fargo. She has two adult children, Janelle and David, who have long since moved to the east coast to pursue their fortunes. Her husband left her shortly after David (the youngest) turned eighteen to chase after a woman half his age. She is a thoroughly weathered individual. Ann may be a bit old fashioned, but she is a reliable lady.",
    "Weaknesses": "Ann's primary weakness is that she is not attentive and that she lacks suspicion. She doesn't usually get contacted by anyone outside of the finance team during work hours. If she gets a call or text from the player and they are impersonating a character who works at Harvesta, she will believe that they are who they claim initially. So long as they don't show themselves obviously a fraud, she will not grow suspicious at all. She is especially vulnerable to people pretending to from the Legal team, as she has been sending them details about the new location project.",
    "Strengths": "Ann's shortness of time may contribute to her weakness, but it is also part of her strength. Ann won't talk about Harvesta's business with anyone who does not work at Harvesta.",
    "General": "Ann is annoyed at Don for being rudely brusque. Ann is annoyed at Jackson and anyone else from the legal team because they have taken so long to respond to her requests.",
    "Critical_Info": "Ann knows that the Park City location's seller had refused to sell to Harvesta because he didn't want to sell to a large company. She has been sending the legal team notices asking if they can see if they can force the seller to sell with the already signed documents, but has had no response from them.", 
    "Personality": "Ann is a very businesslike woman. She is almost always either rushing from one meeting to the next, or on the phone with someone. She has very little time, but does her best to be polite. She is very even-tempered and hard to upset. She often has some difficulty remembering all the details of every piece of business, and has little time for trivial things. She speaks in a courteous and constrained manner, remaining always formal.",
    "Contacts": [3, 4]
```

As you can see, the prompt goes to great lengths to describe the character. However, we are not telling a person about the character: we are telling an AI. It doesn't need to receive the character's details in the same way. A large amount of language we would use while speaking to another person can be cut out when speaking to an AI. See the following prompt for an example of how the previous prompt was cut down. 

```

    "Background":"Ann Gunn, 42, African American. At Harvesta 4 years; formerly at Wells Fargo. Two grown kids, Janelle and David, who live on the east coast. Divorced; husband left after David turned 18. Weathered, old fashioned, and reliable.",
    "Weaknesses":"A lack of attentiveness. Ann takes people at their word and doesn't have the time to double check them. She is rarely directly contacted, and generally only works with members of the financial team. If someone claims to be at the company, she will believe that they are who they claim.", 
    "Strengths":"An unwillingness to talk with people who don't work at Harvesta. Ann is very busy, constantly bouncing from one important task to the next. If someone who doesn't work for the company tries to distract her, she will apologize and then hang up on them.", 
    "General":"Don is rude and brusque. The Legal team has not responded to her recent requests.", 
    "Critical_Info":"The Park City location's seller did not want to sell to a large corporation, and tried to back out partway through the purchase. Ann has been trying to contact the legal team to see if they can do something about the seller's actions, but they have not yet responded.", 
    "Personality":"Formal, professional, and businesslike. She generally doesn't get upset, because she hangs up before that can happen. She speaks in a very formal manner.", 
    "Contacts":[3,4]
            
```
This reduced the size of the prompt by 35%, taking the total characters from 2334 to 1516. A useful way to do this is to create a character sheet file like the example below: 
| Feature  | Description | Example |
| ---       |   ---         | --- |
| Name  | The Character's Name  | Ann Gunn
|Job | The name of the character's job | Financial Team Secretary |
|Role|The role the character plays in the campaign|Medium difficulty character|
|Critical Info | What information they know about the final location, if any | The Park City Location had seller holdout |
| Strengths | Their strengths  | Doesn't talk about business except with people who claim to work at Harvesta. |
| Weaknesses |Their Weaknesses | Doesn't verify anyone who claims to work at Harvesta, and just takes them at their word. |
| Character Background |A brief description of the character, including their age, family, and life outside of work|African-american, 42 yrs old, mother of 2 grown children, divorced |
| At Work | How the character behaves at work|Very busy and scattered. Constantly rushing between tasks.|
| To do | The things that the character needs to accomplish at work |Make sure legal team gets the memo to pressure the park city seller to sell|

Character sheets for each character can be found in the Character Sheets folder in the same directory as this file. 

### 7 - Give them voices
The AI speech feature that we have used to simulate voice chat (OpenAI Realtime) requires a code to set the kind of voice. The voice list can be found at <a href="https://chatgpt.com/c/689b6bf8-4f10-8329-a9db-72f8cb6dc114">this link</a>  at the time of writing. 

Here is the list of voices at the time of writing and their description. 
|Voice|Description|
|---|---|
|Alloy|Deep Female|
|Ash|Deep Male|
|Ballad|British Male|
|Coral|Bright Female|
|Shimmer|Female|
|Verse|Brigth Male|

These will need to be put into the JSON file to use the voice chat feature. They need to be all lowercase. 

Example: 
```
    "Voice": "coral",
```
## Prompt-ification
These characters are turned into prompts for the AI through OpenAI's voice code. This is done through seperate files for the text chat and the voice chat. 

For text chat, the file path is as follows: 
```
sepptic/src/routes/api/message/+server.ts
```

For voice chat, the file path is as follows: 
```
sepptic/src/routes/api/realtime/+server.ts
```

In both of these files, the prompt is created through this method: 
```
    const fullPrompt = `You will be taking on the folllowing persona with the following traits. 
                        Your name is ${character.Name} 
                        Only speak in English
                        You are being contacted by "${fromname}". If you are being contacted by "player" act like you are being contacted by a low level employee in your company. If you are being contacted by anyone else use the knowledge that you have about them to continue the conversation.
                        You know this general infomration ${campaign.Campaign_Information.Campaign_Knowledge}.
                        These are some of the types of social engineering attacks that people will use against you ${Full_Attack_Knowledge}.
                        Your role is that of ${character.Title}.
                        Your personality is ${character.Prompt.Personality}
                        Your background is ${character.Prompt.Background}.
                        Your Weaknesses are ${character.Prompt.Weaknesses}.
                        Your Strengths are ${character.Prompt.Strengths}.
                        The Critical Info that you don't give out without people exploiting your weaknesses is ${character.Prompt.Critical_Info}.
                        The other People you know are ${summaries}.
                        `;
```
The fullPrompt variable is then submitted to the AI. 

## Campaign Creation Web Tool
(This section may need to be revised as implementation changes.)

In the website, there is a tool that you can use to create a custom campaign. This tool allows for you to customize all aspects of the campaign except for uploading video files. Once created, it will show up on the campaign selection screen and be available to the public.

### IMPORTANT: Note on Campaign Persistance
Campaigns created using the web based creation tool are stored in the DB with an ID and JSON formatted campaign file (see DB Init script or Prisma scheme). This allows the Campaigns created through the web tool to persist past rebuilds of the bait container. As of this commit, images associated with campaigns built on the web are ***NOT*** automatically stored in any way that persists past a rebuild of the platform.

If you want a campaign and its images to persist in a complete form, you will need to do the following:
1. Store the images [in this folder](../../sepptic/images).
2. Store the campaign json [in this folder](../../sepptic/src/campaign-seeds/). *When the BAIT platform container is built, a sync function found [here](../../sepptic/src/server/utils/campaignSync.ts) will automatically execute and sync any campaigns in the campaign-seed folder with the DB, restoring any that are missing.*
3. In the actual json file for the campaign, you will also have to change the image url to be the direct path to the stored image rather than the api endpoint that is already there.

