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
    
    class API campaign GET{
        Token: string
        CampaignID: int
        -------------------
        campaign: json
        message: string
    }

    class API campaign POST{
        data: string
        -------------------
        message: string
        success: boolean
    }

    class API campaign DELETE{
        CampaignID: int
        -------------------
        message: string
        success: boolean
    }

    class API campaign-campaignId GET{
        Token: string
        CampaignId: int
        -------------------
        campaign: json
        message: string
    }

    class API campaign-campaignId PUT{
        Token: string
        CampaignId: int
        campaignData: json
        -------------------
        message: string
        status: number
        success: boolean
    }

    class API images-filename GET{
        filename: string
        -------------------
        file: Buffer
    }

    class API images-filename POST{
        filename: string
        file: File
        -------------------
        message: string
        success: boolean
    }

    class API images-filename DELETE{
        filename: string
        -------------------
        message: string
        success: boolean
    }

    class API message GET{
        campaignId: string
        characterId: string
        fromid: string
        fromname: string
        call: boolean
        -------------------
        data: string
        message: string
    }

    class API message POST{
        filename: string
        -------------------
        message: string
        success: boolean
    }

    class API realtime POST{
        campaignId: string
        charaterId: string
        voiceType: string
        --------------------
        session.create: json
        - EPHEMERAL_SESSION_TOKEN
    }

    class API resetCampaign POST{
        campaignId: string
    }

    class API timestamp POST{
        user: string
        name: string
    }

    class API transcript POST{
        campaignId: string
        characterId: string
        call: boolean
        transcript: string
        ---------------------
        data: string
    }


    style APIauthPOST fill:#008,color:#FFF
    style APIauthDELETE fill:#008,color:#FFF
    style APIregisterPOST fill:#008,color:#FFF
    style APIprofileGET fill:#008,color:#FFF
    style APIprofilePUT fill:#008,color:#FFF
    style APIcampaignGET fill:#008,color:#FFF
    style APIcampaignPOST fill:#008,color:#FFF
    style APIcampaign-campaignIdGET fill:#008,color:#FFF
    style APIcampaign-campaignIdPUT fill:#008,color:#FFF
    style APIcampaignDELETE fill:#008,color:#FFF
    style APIimages-filenameGET fill:#008,color:#FFF
    style APIimages-filenamePOST fill:#008,color:#FFF
    style APIimages-filenameDELETE fill:#008,color:#FFF
    style APImessageGET fill:#008,color:#FFF
    style APImessagePOST fill:#008,color:#FFF
    style APIrealtimePOST fill:#008,color:#FFF
    style APIresetCampaignPOST fill:#008,color:#FFF
    style APItimestampPOST fill:#008,color:#FFF
    style APItranscriptPOST fill:#008,color:#FFF

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

    class DB GetTranscript{
        conversationId: int
        -------------------
        transcript: string
        status: int
    }

    style DBcreateUser fill:#F00,color:#FFF
    style DBupdateUser fill:#F00,color:#FFF
    style DBgetUser fill:#F00,color:#FFF
    style DBcreateSession fill:#F00,color:#FFF
    style DBdeleteSession fill:#F00,color:#FFF
    style DBgetSession fill:#F00,color:#FFF
    style DBGetConversation fill:#F00,color:#FFF
    style DBAddMessage fill:#F00,color:#FFF
    style DBGetMessages fill:#F00,color:#FFF
    style DBauthUser fill:#F00,color:#FFF
    style DBGetTranscript fill:#F00,color:#FFF

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
    APImessageGET --|> DBGetTranscript

```