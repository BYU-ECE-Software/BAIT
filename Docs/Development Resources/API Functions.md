# API Functions

- <span style="color: #00F">**API**</span> - Functions that are called by the client to interact with the server.
- <span style="color: #F00">**DB**</span> - Functions that are called by the server to interact with the database.
- <span style="color: #F60">**JSON**</span> - Functions that are called by the server to interact with the JSON files.
- <span style="color: #0A0">**AI API**</span> - Functions that are called by the server to interact with the AI.
- <span style="color: #FF0">**Helper Functions**</span> - Functions that are called by other functions to abstract away common functionality.

```mermaid

classDiagram
    class API auth POST{
        email: string
        password: string
        -------------------
        token: string
        sessionId: int
        message: string
    }

    class API auth DELETE{
        SessionID: int
        Token: string
        -------------------
        message: string
    }

    class API register POST{
        name: string
        email: string
        password: string
        -------------------
        message: string
    }

    class API profile GET{
        Token: string
        -------------------
        name: string
        email: string
        achievements: int list
        message: string
    }

    class API profile PUT{
        Token: string
        name: string
        email: string
        password: string
        -------------------
        message: string
    }

    class API progress GET{
        Token: string
        CampaignID: int
        CharacterID: int
        -------------------
        progress: json list
        message: string
    }

    class API progress POST{
        Token: string
        progress: json
        -------------------
        message: string
    }

    class API campaign GET{
        Token: string
        CampaignID: int
        -------------------
        campaign: json
        message: string
    }

    class API chat GET{
        Token: string
        ConversationId: int
        -------------------
        chat: json list
        message: string
    }

    class API chat POST{
        Token: string
        ConversationId: int
        message: string
        -------------------
        message: string
    }

    style APIauthPOST fill:#008,color:#FFF
    style APIauthDELETE fill:#008,color:#FFF
    style APIregisterPOST fill:#008,color:#FFF
    style APIprofileGET fill:#008,color:#FFF
    style APIprofilePUT fill:#008,color:#FFF
    style APIprogressGET fill:#008,color:#FFF
    style APIprogressPOST fill:#008,color:#FFF
    style APIcampaignGET fill:#008,color:#FFF
    style APIchatGET fill:#008,color:#FFF
    style APIchatPOST fill:#008,color:#FFF

    class DB createUser{
        email: string
        password: string
        name: string
        -------------------
        userId: int
        message: string
        status: int
    }

    class DB updateUser{
        userId: int
        email: string
        password: string
        name: string
        -------------------
        message: string
        status: int
    }

    class DB getUser{
        userId: int
        -------------------
        email: string
        password: string
        name: string
        message: string
        status: int
    }

    class DB authUser{
        email: string
        password: string
        -------------------
        userId: int
        message: string
        status: int
    }

    class DB createSession{
        userId: int
        -------------------
        sessionId: int
        token: string
        expiration: datetime
        message: string
        status: int
    }

    class DB deleteSession{
        sessionId: int
        token: int
        -------------------
        message: string
        status: int
    }

    class DB getSession{
        sessionId: int
        token: int
        -------------------
        userId: int
        expiration: datetime
        message: string
        status: int
    }

    class DB purgeSessions{
        -------------------
        message: string
        status: int
    }

    class DB AddIntel{
        userId: int
        campaignId: int
        characterId: int
        intelId: int
        -------------------
        message: string
        status: int
    }

    class DB GetIntel{
        userId: int
        campaignId: int
        characterId: int
        -------------------
        message: string
        status: int
        intelIds: int list
    }

    class DB GetCampaignIntel{
        userId: int
        campaignId: int
        -------------------
        message: string
        status: int
        intelIds: int list
    }

    class DB GetAllIntel{
        userId: int
        -------------------
        message: string
        status: int
        intelIds: int list
    }

    class DB GetConversation{
        userId: int
        campaignId: int
        characterId: int
        -------------------
        conversationId: int
        message: string
        status: int
    }

    class DB AddMessage{
        conversationId: int
        userSent: bool
        message: string
        -------------------
        messageId: int
        timestamp: datetime
        message: string
        status: int
    }

    class DB GetMessages{
        conversationId: int
        -------------------
        messages: json list
        message: string
        status: int
    }

    style DBcreateUser fill:#F00,color:#FFF
    style DBupdateUser fill:#F00,color:#FFF
    style DBgetUser fill:#F00,color:#FFF
    style DBcreateSession fill:#F00,color:#FFF
    style DBdeleteSession fill:#F00,color:#FFF
    style DBgetSession fill:#F00,color:#FFF
    style DBpurgeSessions fill:#F00,color:#FFF
    style DBAddIntel fill:#F00,color:#FFF
    style DBGetIntel fill:#F00,color:#FFF
    style DBGetConversation fill:#F00,color:#FFF
    style DBAddMessage fill:#F00,color:#FFF
    style DBGetMessages fill:#F00,color:#FFF
    style DBauthUser fill:#F00,color:#FFF
    style DBGetAllIntel fill:#F00,color:#FFF
    style DBGetCampaignIntel fill:#F00,color:#FFF

    class JSON Get{
        -------------------
        message: string
        status: int
        json: json
    }

    class JSON GetCampaign{
        -------------------
        message: string
        status: int
        json: json
    }
    
    style JSONGet fill:#F60,color:#FFF
    style JSONGetCampaign fill:#F60,color:#FFF

    JSONGetCampaign --|> JSONGet

    class QueryAI{
        TBD
        -------------------
        TBD
        status: int
        message: string
    }

    style QueryAI fill:#0A0,color:#FFF








    class HashPassword{
        password: string
        -------------------
        hash: string
    }

    class CheckUserExists{
        email: string
        -------------------
        exists: bool
    }

    class GetUserIdFromToken{
        token: string
        -------------------
        userId: int
        message: string
        status: int
    }

    class CalculateAchievements{
        userId: int
        -------------------
        achievements: int list
    }

    class ValidateProgress{
        progress: json
        -------------------
        valid: bool
    }

    class ValidateConversation{
        conversationId: int
        userId: int
        -------------------
        valid: bool
    }

    class GetConversationHistory{
        conversationId: int
        -------------------
        history: json list
    }

    class HandleAiMessage{
        message: string
        conversationId: int
        -------------------
        response: string
        message: string
        status: int
    }

    style HashPassword fill:#FF0,color:#000
    style CheckUserExists fill:#FF0,color:#000
    style GetUserIdFromToken fill:#FF0,color:#000
    style CalculateAchievements fill:#FF0,color:#000
    style ValidateProgress fill:#FF0,color:#000
    style ValidateConversation fill:#FF0,color:#000
    style GetConversationHistory fill:#FF0,color:#000
    style HandleAiMessage fill:#FF0,color:#000

    APIauthPOST --|> HashPassword
    APIauthPOST --|> DBauthUser
    APIauthPOST --|> DBcreateSession
    APIauthDELETE --|> DBdeleteSession
    APIregisterPOST --|> CheckUserExists
    APIregisterPOST --|> HashPassword
    APIregisterPOST --|> DBcreateUser
    APIprofileGET --|> GetUserIdFromToken
    APIprofileGET --|> DBgetUser
    APIprofilePUT --|> GetUserIdFromToken
    APIprofilePUT --|> HashPassword
    APIprofilePUT --|> DBupdateUser
    APIprogressGET --|> GetUserIdFromToken
    APIprogressGET --|> CalculateAchievements
    APIprogressGET --|> DBGetAllIntel
    APIprogressGET --|> DBGetCampaignIntel
    APIprogressGET --|> DBGetIntel
    CalculateAchievements --|> DBGetAllIntel
    ValidateProgress --|> JSONGetCampaign
    APIprogressPOST --|> GetUserIdFromToken
    APIprogressPOST --|> ValidateProgress
    APIprogressPOST --|> DBAddIntel
    GetUserIdFromToken --|> DBgetSession
    APIauthPOST --|> DBpurgeSessions
    APIcampaignGET --|> JSONGetCampaign
    APIchatGET --|> GetUserIdFromToken
    APIchatGET --|> ValidateConversation
    ValidateConversation --|> DBGetConversation
    APIchatGET --|> GetConversationHistory
    APIchatGET --|> DBGetMessages
    APIchatPOST --|> GetUserIdFromToken
    APIchatPOST --|> ValidateConversation
    APIchatPOST --|> DBAddMessage
    APIchatPOST --|> HandleAiMessage
    HandleAiMessage --|> QueryAI
    HandleAiMessage --|> DBAddMessage
    HandleAiMessage --|> GetConversationHistory



```