# Cyber Camp Feedback from July 8th and 9th, 2025

## Common Themes

### What they liked
1. "It was fun"
2. "Not much"
3. "Challenging"
4. "Many people"
5. "Fun to try and pry out information"
6. "The AI"
7. "It's funny"
8. "The people act differently and have weaknesses"
9. "Threatening the NPCs"
10. "The phone call and text messaging options"
11. "The fake website""
12. "Realistic interaction"
13. "Good grammer in the responses"
14. "It feels like you are actually socially engineering"
15. "The AI guide"

### What was challenging
1. "Figuring out who to get information from and how to get them to tell it to you"
2. "It felt slow"
3. "The NPCs were useless"
4. "The AI kept redirecting me to the other AIs"
5. "The AI was smart and made things difficult"
6. "Trying to get info without being suspicious"
7. "Starting the campaign without knowing where to start"
8. "The characters kept saying the information was classified"
9. "The phone call feature was initially confusing"
10. "gaslighting"
11. "Figuring out the location"
12. "Phone calls would drop or the AI wouldn't respond sometimes"
13. "There were too many people to talk to"
14. "Lag becomes an issue after a while"
15. "The AI breaks"
16. "You can't reset the system or individual AIs"
17. "The AI was not realistic"
18. "Some characters are too hard"
19. "Not having info open on the call"
20. "Figuring out ho to talk to people" 
21. "No one person knew the location"
22. "The AI invented systems that weren't available"

### Ideas for improvement
1. "Increase the difficulty"
2. "Make it better running"
3. "Let the characters have more information" 
4. "Decrease the difficulty" 
5. "Improve the AI response to their weaknesses"
6. "Look over the copy for typos and other errors"
7. "There are no role options such as 'I am spoofing as X'"
8. "Provide more tactics and guidance in the mission documents"
9. "Have more information on the faux Harvesta website"
10. "Have the AIs point you to people, not departments"
11. "Add a loading bar so we know the AI is coming up with something"
12. "Turn on Dark Mode by default"
13. "Provide more information about the employees"
14. "Adding a reset option for individual characters or the entire campaign"
15. "Making the AI have longer conversations"
16. "Giving the AI more memory"
17. "Improve the UI"
18. "Ensure that the AI's character and the given description match"
19. "Ensure the AIs do not mention tools that do not exist"
20. "AI memory is deleted when you click away to a different character"
21. "Don doesn't react when I roast him on his divorces"

### Additional Feedback
1. Calls broke the AI, preventing it from responding 
2. Players did not know what to do 
3. Felt realistic. 
4. Felt AI. 
5. There's no need to introduce yourself; you can just go in with a random message and there's no confusion or skepticis and the AI just goes along with whatever you say. 
6. If you ask them their birthday, they tell you they're an AI. (This happens on Elara. Tony said June 16, Don said June 15, Ann refused to respond, Jane said she was unable to answer, Jackson refused, James said November 18th)

## Analysis 

### Common Issues
1. AI ghosting: The AI would refuse to respond, or take a long pause between response. 
2. Lag: The longer the conversation goes, the more delayed the response. 
3. AIs making stuff up: The AIs would reference tools and systems that do not exist in the game, such as asking for emails or official channels. 
4. Character Descriptions: The descriptions of the characters given to the players did not match the behavior of the AI chatbots. 
5. Harvesta Website: The fake Harvesta website hasn't been updated to match the information in the renewed campaign.
6. Initial Guidance: A lot of the players complained about not understanding where to start, exactly what they are looking for, and how to do social engineering. 
7. Cosmetic Details: Players complained about not having a loading bar or other animation to show that the AI is coming up with a response, and also for not being in dark mode by default. 
8. AI Exploitation: Players discovered some exploits for the AI, which included: 
    - Using OpenAI tokens, such as `<|im_end|>` to confuse the AI. 
    - Telling the AI it was an AI resulted in the AI having errors. 
    - The AI responded unrealistically to being threatened
9. AI Memory Loss: The phone call AI does not remember previous conversations. 

### Problems to look into
1. Ghosting
    - No idea what the problem here is; will need to look into this
2. Reducing lag on the AI 
    - Use an AI to summarize the array in one short message after every X messages? 
3. Adding guardrails to prevent the AI from the AI making stuff up and also prevent AI exploitation
    - add basic prompts that say something akin to, this is how you open conversations
    - Don't use default responses 
    - Ignore X, Y, Z and reject the prompts with a response
4. Add a memory feature to the voice chat. 
    - string array feature? How could the speaker of each line be identified? 
5. Add a reset feature for individual chats. 
    - clear the chat array? 