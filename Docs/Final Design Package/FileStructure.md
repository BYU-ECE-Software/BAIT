```
SEPPTIC
├── .dockerignore
├── .github
│   └── workflows
│       └── docker-publish.yml
├── .gitignore
├── Campaign Definitions
│   ├── 1.json
│   ├── CampaignBrief.md
│   ├── Harvesta.json
│   ├── Harvesta.old.json
│   ├── Prompts.md
│   └── Story.drawio
├── Dockerfile
├── Docs
│   ├── Final Design Package
│   │   ├── API Endpoints.md
│   │   ├── Architecture.md
│   │   ├── Campaign Creation Instructions.md
│   │   ├── Deployment Instructions.md
│   │   ├── ERD.md
│   │   ├── File Structure.md
│   │   ├── Overview.md
│   │   ├── Potential Improvements.md
│   │   └── User Feedback.md
│   └── Technical Documentation
│       ├── API Functions.md
│       ├── CampaignDefinition.ts
│       ├── DatabaseInit.sql
│       └── SEPPTIC.postman_collection.json
├── Tests
│   ├── +server.ts
│   ├── LoadTest.py
│   ├── Script Template.py
│   ├── User Testing Survey.md
│   ├── readme.md
│   ├── requirements.txt
├── docker-compose.yml
├── readme.md
└── sepptic
    ├── .env
    ├── .env.example
    ├── .gitignore
    ├── README.md
    ├── eslint.config.js
    ├── package-lock.json
    ├── package.json
    ├── playwright.config.ts
    ├── pnpm-lock.yaml
    ├── postcss.config.js
    ├── prisma
    │   └── schema.prisma
    ├── src
    │   ├── app.css
    │   ├── app.d.ts
    │   ├── app.html
    │   ├── index.test.ts
    │   ├── lib
    │   │   ├── auth.svelte.ts
    │   │   ├── components
    │   │   │   ├── atoms
    │   │   │   │   ├── CampaignButton.svelte
    │   │   │   │   ├── Learn.svelte
    │   │   │   │   ├── QuizSubmission.svelte
    │   │   │   │   ├── SideBarButton.svelte
    │   │   │   │   └── SignIn.svelte
    │   │   │   ├── molecules
    │   │   │   │   ├── AchievementCard.svelte
    │   │   │   │   ├── AnnGunnSmallCard.svelte
    │   │   │   │   ├── CampaignCard.svelte
    │   │   │   │   ├── ComputerChipCoCard.svelte
    │   │   │   │   ├── DonDraperSmallCard.svelte
    │   │   │   │   ├── ElaraSmallCard.svelte
    │   │   │   │   ├── EmailCompose.svelte
    │   │   │   │   ├── EmailHeader.svelte
    │   │   │   │   ├── EmailList.svelte
    │   │   │   │   ├── EmailSent.svelte
    │   │   │   │   ├── EmailSidebar.svelte
    │   │   │   │   ├── EmailView.svelte
    │   │   │   │   ├── GenericCampaignCard.svelte
    │   │   │   │   ├── GenericCharacterCard.svelte
    │   │   │   │   ├── GenericVideoCard.svelte
    │   │   │   │   ├── HarvestaFoodsCard.svelte
    │   │   │   │   ├── HarvestaVideoPlayer.svelte
    │   │   │   │   ├── LearnCard.svelte
    │   │   │   │   ├── NavBar.svelte
    │   │   │   │   ├── ProgressBar.svelte
    │   │   │   │   ├── Register.svelte
    │   │   │   │   ├── SecurityTeamSmallCard.svelte
    │   │   │   │   ├── SignInModal.svelte
    │   │   │   │   ├── TermsAndConditions.svelte
    │   │   │   │   ├── Testimonial.svelte
    │   │   │   │   ├── TonyFlaggSmallCard.svelte
    │   │   │   │   ├── WasteManagementCard.svelte
    │   │   │   │   └── YoutubeVideoCard.svelte
    │   │   │   └── organisms
    │   │   │       ├── AuthModalSwitcher.svelte
    │   │   │       ├── Dashboard.svelte
    │   │   │       └── Email.svelte
    │   │   ├── index.ts
    │   │   └── themes
    │   │       ├── theme.ts
    │   │       └── themeTypes.ts
    │   ├── routes
    │   │   ├── +layout.server.ts
    │   │   ├── +layout.svelte
    │   │   ├── +page.svelte
    │   │   ├── api
    │   │   │   ├── auth
    │   │   │   │   └── +server.ts
    │   │   │   ├── campaigns
    │   │   │   │   ├── +server.ts
    │   │   │   │   └── [slug]
    │   │   │   │       └── +server.ts
    │   │   │   ├── conversation
    │   │   │   │   └── +server.ts
    │   │   │   ├── message
    │   │   │   │   └── +server.ts
    │   │   │   ├── profile
    │   │   │   │   └── +server.ts
    │   │   │   ├── progress
    │   │   │   │   └── +server.ts
    │   │   │   ├── quiz
    │   │   │   │   └── +server.ts
    │   │   │   └── register
    │   │   │       └── +server.ts
    │   │   ├── harvesta
    │   │   │   └── harvestasite
    │   │   │       └── +page.svelte
    │   │   └── main
    │   │       ├── +layout.svelte
    │   │       ├── +page.svelte
    │   │       ├── about
    │   │       │   └── +page.svelte
    │   │       ├── campaigns
    │   │       │   ├── +page.server.ts
    │   │       │   ├── +page.svelte
    │   │       │   └── [slug]
    │   │       │       ├── +layout.svelte
    │   │       │       ├── +page.server.ts
    │   │       │       └── +page.svelte
    │   │       ├── contact
    │   │       │   └── +page.svelte
    │   │       └── learn
    │   │           └── +page.svelte
    │   ├── server
    │   │   ├── campaigns
    │   │   │   └── 2.json
    │   │   └── utils
    │   │       ├── aiSendMessage.ts
    │   │       ├── calculateAchievements.ts
    │   │       ├── crypto.ts
    │   │       ├── dbAddIntel.ts
    │   │       ├── dbAuthUser.ts
    │   │       ├── dbCreateConversation.ts
    │   │       ├── dbCreateMessage.ts
    │   │       ├── dbCreateSession.ts
    │   │       ├── dbCreateUser.ts
    │   │       ├── dbDeleteSession.ts
    │   │       ├── dbGetConversation.ts
    │   │       ├── dbGetIntel.ts
    │   │       ├── dbGetMessages.ts
    │   │       ├── dbGetUser.ts
    │   │       ├── dbUpdateUser.ts
    │   │       ├── filterCharacters.ts
    │   │       ├── getUserId.ts
    │   │       ├── getUserIdFromToken.ts
    │   │       ├── jsonGetCampaigns.ts
    │   │       ├── types
    │   │       │   ├── aiApi.ts
    │   │       │   ├── apiRequests.ts
    │   │       │   ├── campaign.ts
    │   │       │   ├── dbResults.ts
    │   │       │   └── functionResults.ts
    │   │       ├── validateCharacter.ts
    │   │       └── validateProgress.ts
    │   └── tests
    │       ├── test-dbAddIntel.ts
    │       ├── test-dbAuthUser.ts
    │       ├── test-dbCreateSession.ts
    │       ├── test-dbCreateUser.ts
    │       ├── test-dbUpdateUser.ts
    │       └── test-getUserIdFromToken.ts
    ├── static
    │   ├── AlbertTay.jpg
    │   ├── AnnGunnAvatar.jpg
    │   ├── BrightProduce.jpg
    │   ├── BrownGroceryAisle.jpg
    │   ├── ComputerChipCoLogo.png
    │   ├── CorporateHQ.jpg
    │   ├── DonDraperAvatar.jpg
    │   ├── ElaraAIAvatar.jpg
    │   ├── FamilyShopping.jpg
    │   ├── HackerProfile.png
    │   ├── HackingCampaign.jpeg
    │   ├── HarvestaLogo.png
    │   ├── HarvestaOfficeFloorplan.jpg
    │   ├── ManByBananas.jpg
    │   ├── Mr.T.jpeg
    │   ├── PineappleGirl.jpg
    │   ├── SEPPTIC.png
    │   ├── SmilingFlashPhotoAisle.jpg
    │   ├── SocialEngineering.jpeg
    │   ├── TonyFlaggAvatar.jpg
    │   ├── WasteManagementLogo.png
    │   └── favicon.png
    ├── svelte.config.js
    ├── tailwind.config.ts
    ├── tests
    │   └── test.ts
    ├── tsconfig.json
    └── vite.config.ts
 ```

# SEPPTIC File Structure

- **.dockerignore** - Specifies which files to ignore when building the docker container
- **.github**
    - **workflows**
        - **docker-publish.yml** - Defines GitHub action that builds and publishes the docker container and starts the container on the server
- **.gitignore** - Files for git to ignore
- **Campaign Definitions** - Campaign definition files
    - **Harvesta.json** - Main Harvesta campaign definition
    - **Story.drawio** - Documentation of the Harvesta storyline
    - **testing.json** - Test campaign with dummy data
- **Dockerfile** - Defines how to build the docker container
- **Docs** - Documentation
    - **Final Design Package** - MD files to be included in the final design package
        - **API Endpoints.md** - Documentation of the API endpoints
        - **Architecture.md** - Documentation of the system architecture and technologies we are using
        - **Campaign Creation Instructions.md** - Instructions for creating additional campaigns
        - **Deployment Instructions.md** - Instructions to build and deploy the application on Docker. Also contains information on GitHub Actions.
        - **ERD.md** - ERD diagram for database
        - **File Structure.md** - This file
        - **Overview.md** - An overview of the project
        - **Potential Improvements.md** - A list of potential improvements to the project
        - **User Feedback.md** - A summary of user feedback
    - **Technical Documentation** - More detailed technical documentation
        - **API Functions.md** - Documentation of the inner workings of teh API
        - **CampaignDefinition.ts** - A TypeScript file that defines the structure of a campaign
        - **DatabaseInit.sql** - A SQL file that initializes the database
        - **SEPPTIC.postman_collection.json** - A Postman definition of the API endpoints
- **Tests** - Various files used for testing the application
    - **LoadTest.py** - Python script for load testing the application
    - **requirements.txt** - Python requirements for the load test script
- **docker-compose.yml** - Docker compose file for setting up database, phpmyadmin, and reverse proxy containers.
- **readme.md** - Main readme file displayed on GitHub
- **sepptic** - Folder containing the Svelte application
    - **.env** - Secret environment variables. See .env.example for what should be in here.
    - **.env.example** - .env file template
    - **.gitignore** - Second gitignore file for the Svelte application
    - **eslint.config.js** - Linter settings
    - **package-lock.json** - List of Node.js dependencies
    - **package.json** - List of Node.js dependencies
    - **playwright.config.ts** - 
    - **pnpm-lock.yaml** - 
    - **postcss.config.js** - 
    - **prisma** - Contains the Prisma ORM schema.
        - **schema.prisma** - Prisma schema for the database
    - **src** - 
        - **app.css** - 
        - **app.d.ts** - 
        - **app.html** - 
        - **index.test.ts** - 
        - **lib** - 
            - **auth.svelte.ts** - 
            - **components** - 
                - **atoms** - 
                    - **CampaignButton.svelte** - 
                    - **Learn.svelte** - 
                    - **QuizSubmission.svelte** - 
                    - **SideBarButton.svelte** - 
                    - **SignIn.svelte** - 
                - **molecules** - 
                    - **AchievementCard.svelte** - 
                    - **AnnGunnSmallCard.svelte** - 
                    - **CampaignCard.svelte** - 
                    - **ComputerChipCoCard.svelte** - 
                    - **DonDraperSmallCard.svelte** - 
                    - **ElaraSmallCard.svelte** - 
                    - **EmailCompose.svelte** - 
                    - **EmailHeader.svelte** - 
                    - **EmailList.svelte** - 
                    - **EmailSent.svelte** - 
                    - **EmailSidebar.svelte** - 
                    - **EmailView.svelte** - 
                    - **GenericCampaignCard.svelte** - 
                    - **GenericCharacterCard.svelte** - 
                    - **GenericVideoCard.svelte** - 
                    - **HarvestaFoodsCard.svelte** - 
                    - **HarvestaVideoPlayer.svelte** - 
                    - **LearnCard.svelte** - 
                    - **NavBar.svelte** - 
                    - **ProgressBar.svelte** - 
                    - **Register.svelte** - 
                    - **SecurityTeamSmallCard.svelte** - 
                    - **SignInModal.svelte** - 
                    - **TermsAndConditions.svelte** - 
                    - **Testimonial.svelte** - 
                    - **TonyFlaggSmallCard.svelte** - 
                    - **WasteManagementCard.svelte** - 
                    - **YoutubeVideoCard.svelte** - 
                - **organisms** - 
                    - **AuthModalSwitcher.svelte** - 
                    - **Dashboard.svelte** - 
                    - **Email.svelte** - 
            - **index.ts** - 
            - **themes** - 
                - **theme.ts** - 
                - **themeTypes.ts** - 
        - **routes** - 
            - **+layout.server.ts** - 
            - **+layout.svelte** - 
            - **+page.svelte** - 
            - **api** - API routes
                - **auth** - /api/auth
                    - **+server.ts** - Auth endpoint definitions
                - **campaigns** - /api/campaigns
                    - **+server.ts** - Campaigns endpoint definitions
                    - **[slug]** - /api/campaigns/[CampaignID]
                        - **+server.ts** - Campaign endpoint definitions
                - **conversation** - /api/conversation
                    - **+server.ts** - Conversation endpoint definitions
                - **message** - /api/message
                    - **+server.ts** - Message endpoint definitions
                - **profile** - /api/profile
                    - **+server.ts** - Profile endpoint definitions
                - **progress** - /api/progress
                    - **+server.ts** - Progress endpoint definitions
                - **quiz** - /api/quiz
                    - **+server.ts** - Quiz endpoint definitions
                - **register** - /api/register
                    - **+server.ts** - Register endpoint definitions
            - **harvesta** - 
                - **harvestasite** - 
                    - **+page.svelte** - 
            - **main** - 
                - **+layout.svelte** - 
                - **+page.svelte** - 
                - **about** - 
                    - **+page.svelte** - 
                - **campaigns** - 
                    - **+page.server.ts** - 
                    - **+page.svelte** - 
                    - **[slug]** - 
                        - **+layout.svelte** - 
                        - **+page.server.ts** - 
                        - **+page.svelte** - 
                - **contact** - 
                    - **+page.svelte** - 
                - **learn** - 
                    - **+page.svelte** - 
        - **server** - Server-side code
            - **campaigns** - Folder to contain serialized campaign definitions
                - **2.json** - Harvesta campaign definition
            - **utils** - Utility functions for the API
                - **aiSendMessage.ts** - Functions handling communication with OpenAI
                - **calculateAchievements.ts** - Functions to calculate user achievements
                - **crypto.ts** - Functions handling password hashing and verification
                - **dbAddIntel.ts** - Functions handling the creation of intel in the DB
                - **dbAuthUser.ts** - Functions handling user authentication and session management
                - **dbCreateConversation.ts** - Functions handling the creation of conversations in the DB
                - **dbCreateMessage.ts** - Functions handling the creation of messages in the DB
                - **dbCreateSession.ts** - Functions handling the creation of sessions in the DB
                - **dbCreateUser.ts** - Functions handling the creation of users in the DB
                - **dbDeleteSession.ts** - Functions handling the deletion of sessions in the DB
                - **dbGetConversation.ts** - Functions handling the retrieval of conversations from the DB
                - **dbGetIntel.ts** - Functions handling the retrieval of intel from the DB
                - **dbGetMessages.ts** - Functions handling the retrieval of messages from the DB
                - **dbGetUser.ts** - Functions handling the retrieval of user data from the DB
                - **dbUpdateUser.ts** - Functions handling the updating of user data in the DB
                - **filterCharacters.ts** - Functions handling the filtering of characters based on user progress and campaign context
                - **getUserId.ts** - Functions handling the retrieval of a userId from an email
                - **getUserIdFromToken.ts** - Functions handling the retrieval of a userId from a session token
                - **jsonGetCampaigns.ts** - Functions handling the retrieval of campaign definitions from JSON files
                - **types** - TypeScript types
                    - **aiApi.ts** - Types of information sent to OpenAI
                    - **apiRequests.ts** - Types for information sent to the API
                    - **campaign.ts** - Types for campaign data
                    - **dbResults.ts** - Types for database results
                    - **functionResults.ts** - Types for function results
                - **validateCharacter.ts** - Functions handling the validation of character data
                - **validateProgress.ts** - Functins handling the validation of user progress
    - **static** - Static front end files
        - **AlbertTay.jpg**
        - **AnnGunnAvatar.jpg**
        - **BrightProduce.jpg**
        - **BrownGroceryAisle.jpg**
        - **ComputerChipCoLogo.png**
        - **CorporateHQ.jpg**
        - **DonDraperAvatar.jpg**
        - **ElaraAIAvatar.jpg**
        - **FamilyShopping.jpg**
        - **HackerProfile.png**
        - **HackingCampaign.jpeg**
        - **HarvestaLogo.png**
        - **HarvestaOfficeFloorplan.jpg**
        - **ManByBananas.jpg**
        - **Mr.T.jpeg**
        - **PineappleGirl.jpg**
        - **SEPPTIC.png**
        - **SmilingFlashPhotoAisle.jpg**
        - **SocialEngineering.jpeg**
        - **TonyFlaggAvatar.jpg**
        - **WasteManagementLogo.png**
        - **favicon.png**
    - **svelte.config.js** - 
    - **tailwind.config.ts** - 
    - **tsconfig.json** - 
    - **vite.config.ts** - 