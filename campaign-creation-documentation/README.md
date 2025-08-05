# Campaign Creation Documentation
*How to create a campaign that works with the BAIT system.*

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
|Description|This is the description that is shown on the campaign selection screen.
|**Brief**|This is the longer description that is shown on the campaign onboarding screen.|
|**Image**|The filepath for the campaign image|
|**Website**|The path for a website associated with the campaign, such as the fake Harvesta website|
|**Briefing Video**|The path for a video file meant to be put in the campaign onboarding section.|
|**Success and Failure videos**|These are meant to hold videos for campaign success and failure. They were not implemented at the time of this writing.|
|**Final Question**|This holds the text of the final campaign question.|
|**Campaign Knowledge**|This is information about the campaign that all the characters are meant to know in character.|
|**Final Answer**|This holds an array of strings that are considered valid answers for that final question.|
|**Attack Knowledge**|This is for the information that the AIs know but the characters are not neccessarily aware of.|

### Characters

The Characters part of the JSON file is an array of JSON objects that each represent a character. 

|Object Name|Description|
|---|---|
|**ID**|A numerical designation that is meant to be unique for each character.|
|**Name**|The character's full name.|
|**Title**|This is the title associated with the character. In the Harvesta campaign, it was used for the individual's job title.|
|**Image**|The filepath for the image used to represent the character.|
|**Voice**|This is the voice codename that will be used for the AI voice chat.|
|**Call or Text**|This is used to determine what you can do with the character; text, call, or both.|
|**Description**|This is a character description that is given to the players as an OSINT summary.|
|**Call Limit**|How long the voice calls for this character is allowed to go, measured in milliseconds.|
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

### 4 - Prompt Design




<span style="color: red">**Warning:**</span> it is very easy for the prompts to become very long. The greater the length of the prompts, the longer it will take the AI to respond and the more Open AI tokens it will consume. This is why it is important to keep the JSON objects that will be used to make the prompt as short as possible. 



