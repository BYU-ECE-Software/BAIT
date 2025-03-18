```mermaid
erDiagram
    User {
        User_ID int PK
        Email varchar
        Password varchar
        Name varchar
    }
    Session {
        Token varchar PK
        Expiration date
        User_ID int FK
    }
    Intel {
        Intel_Record_ID int PK
        Intel_ID int
        Campaign_ID int
        Character_ID int
        User_ID int FK
    }
    Conversation {
        Conversation_ID int PK
        User_ID int FK
        Campaign_ID int
        Character_ID int
    }
    Message {
        Message_ID int PK
        Conversation_ID int FK
        User_Sent tinyint
        Message text
        Timestamp datetime
    }

    User ||--o{ Session : "has"
    User }o--o{ Intel : "knows"
    User ||--o{ Conversation : "participates"
    Conversation ||--o{ Message : "contains"
```