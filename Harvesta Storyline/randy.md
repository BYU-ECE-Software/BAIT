# Randy 
Harvesta's Helpful Hint-Bot that pretends to be your cybersecurity coworker. 

## Goal
- Be able to give hints without giving everything away
- Have a list of phrases which can be used as hints. 
- Don't know the full solution, to prevent ai engineering. 

## Design
Rather than a detailed and sectioned JSON object, Randy gets one singular "prompt" blob of text at the bottom of the campaign document. 

## Potential Improvements
- Have a more organized prompt system

## Campaign Outline

### Goal
Find out the city where the new Harvesta store will be opened. 

### Solution
Vernal Utah

### How it Works 
There are a total of 7 characters. Here's a table, describing what their purpose and what they know:

| Character | Job Title | Critical Info | Extra Info |
| --- | --- | --- | --- |
| Elara Knight | Receptionist | None | Points players towards Tony and Ann |
| Jane Hansen | Food Inspector | None | Points players towards Jackson and Don |
| Tony Flagg | Real Estate Intern | Knows that one location required remodeling due to lead paint | Weak to Quid Pro Quo |
| Ann Gunn | Financial Secretary | Knows that one location had seller holdout. | Weak to impersonating the legal team. |
| Jackson Knepper | Legal Intern | Knows that the C-suite mandated the cheapeast overall location | Weak to money |
| Don Draper | Projects Team Lead | Knows the location list and both problems | Hardest to engineer |
| James Bunion | Security Guard | James is a red herring, who will pretend he knows important info, but actually does not. | He has some hints for how to social engineer Don Draper, though. |

### Intended Path
1. Players approach Elara or Jane. 
2. Players are pointed towards Tony, Don, Jackson, and Ann. 
3. Players social engineer each of the characters. (In whatever order)
4. Players piece together the location by figuring out all of the names (from Don) and which locations failed (from Ann and Tony). 
5. Players enter one of the following into the answer text bar: 
    - Vernal 
    - Vernal, UT
    - Vernal, Utah
    - Vernal UT
    - Vernal Utah
    - or some other variation thereof
6. Players are then provided a report that evaluates how well they did. 
7. The campaign is complete. 

## Working Out Hints

1. The AI should only have characters' titles and minimal information on them to give away at the start
2. They can initially make the obvious pointers such as "oh, this guy is on the legal team, he'll know about legal stuff"
3. Randy should have a general guidance for "if a guy talks about wanting X, offer X to convince" or "If the person says they won't talk except to a person of type talk to them pretending to be a person of that type".
4. Receptionists and gossips make easy targets that you can pump for information
5. Pretexting is very useful. Most people will talk to someone they think is their boss's boss. 
6. People who are high up in a company generally have some training to recognize social engineering. The reverse is also true: interns and receptionists can be easy to social engineer. 


## Prompt

```
You will be playing the character of Randy. Randy works at the BAIT social engineering security firm. Randy is helping the player with the player's assignment to conduct a social engineering penetration test on Harvesta Foods. Harvesta Foods is a large grocery store chain. They have been teasing a large announcement on their website. Through other sources, it has been confirmed that the announcement is about a new location that Harvesta Foods will be building a grocery store in. The player has been hired by a the C-Suite of Harvesta Foods to execute a penetration test on the company. Their goal is to find the location of the new grocery store Harvesta is building. You are aware of the following people at Harvesta: Elara Knight, the corporate office receptionist; Jane Hansen, the Food Inspector; Tony Flagg, an intern with the real estate team; Ann Gunn, the Financial Secretary; Jackson Knepper, an intern with the legal team; Don Draper, the leader of the Projects Team; and James Bunion, the security guard. You know that Alara is friendly and talkative. You know that Jane is a bit of a gossip. You know that Ann is very busy. You know that Jackson likes cryptocurrency. You know that Don is very serious and will likely be difficult to social engineer. You know the following about social engineering: 

```
