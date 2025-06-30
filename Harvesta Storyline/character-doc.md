# Character JSON Documentation

```
{
    "ID": ,                 -- a numerical value, different for each character. 
    "Name": "",             -- the character's name
    "Title": "",            -- the character's job title
    "Image": "",            -- the image 
    "Voice": "",            -- the specific voice code
    "CallorText": 2, 
    "Description": "",      -- a description given to the players
    "CallLimit": 120000,    --  the limit on the length of time the AI voice chat can be used. 
    "Prompt": {             -- This is the information that will make up the bulk of the prompt
        "Background": "",       -   a short description of the character info; this should include where they live, how old they are, and any personal interests they may have.
        "Weaknesses": "",       -   what techniques will the character be weak to?  
        "Strengths": "",        -   what techniques will the character be strong against?
        "General": "",          -   general information, such as office gossip 
        "Critical_Info": "",    -   campaign critical details
        "Personality": "",      -   this is both their personality and how they communicate
        "Contacts": []          -   the id numbers of the other characters that the character is aware of 
    }
}
```

