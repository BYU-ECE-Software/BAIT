# File Structure
```
BAIT
├── Dockerfile
├── Docs
│   ├── Campaign Creation
│   │   ├── README.md
│   │   ├── character-sheets
│   │   │   ├── 0-blank-char-sheet.md
│   │   │   ├── 1-elara-knight.md
│   │   │   ├── 2-ann-gunn.md
│   │   │   ├── 3-don-draper.md
│   │   │   ├── 4-tony-flagg.md
│   │   │   ├── 5-jackson-knepper.md
│   │   │   ├── 6-jane-hansen.md
│   │   │   ├── 7-james-bunion.md
│   │   │   └── README.md
│   │   ├── harvesta-overview.md
│   │   └── harvesta-walkthrough.md
│   ├── Development Resources
│   │   ├── API Functions.md
│   │   ├── CampaignDefinition.ts
│   │   ├── CampaignInfoFormat.md
│   │   ├── DatabaseInit.sql
│   │   ├── DockerNotes.md
│   │   └── SEPPTIC.postman_collection.json
│   ├── Final Design Package
│   │   ├── API Endpoints.md
│   │   ├── Architecture.md
│   │   ├── Campaign Creation Instructions.md
│   │   ├── Deployment Instructions.md
│   │   ├── Design Requirements.md
│   │   ├── ERD.md
│   │   ├── FileStructure.md
│   │   ├── Overview.md
│   │   ├── Potential Improvements.md
│   │   ├── User Feedback Reports
│   │   │   ├── Bug Report.pdf
│   │   │   └── User Experience.pdf
│   │   └── User Feedback.md
│   └── Media
│       ├── homepage.png
│       └── team.jpg
├── Tests
│   ├── LoadTest.py
│   ├── campaign-dissection.md
│   └── requirements.txt
├── docker-compose.yml
├── package-lock.json
├── readme.md
├── sepptic
│   ├── eslint.config.js
│   ├── images
│   │   ├── AnnGunnAvatar.jpg
│   │   ├── DonDraperAvatar.jpg
│   │   ├── ElaraAIAvatar.jpg
│   │   ├── HarvestaLogo.png
│   │   ├── Jackson_Knepper.jpg
│   │   ├── James_Bunion.jpg
│   │   ├── Jane_Hansen.png
│   │   ├── Janine.png
│   │   ├── TonyFlaggAvatar.jpg
│   │   └── byu.jpg
│   ├── package-lock.json
│   ├── package.json
│   ├── playwright.config.ts
│   ├── pnpm-lock.yaml
│   ├── postcss.config.js
│   ├── prisma
│   │   └── schema.prisma
│   ├── src
│   │   ├── app.css
│   │   ├── app.d.ts
│   │   ├── app.html
│   │   ├── campaign-seeds
│   │   │   ├── 1.json
│   │   │   └── 2.json
│   │   ├── hooks.server.ts
│   │   ├── index.test.ts
│   │   ├── lib
│   │   │   ├── auth.svelte.ts
│   │   │   ├── components
│   │   │   │   ├── atoms
│   │   │   │   │   ├── QuizSubmission.svelte
│   │   │   │   │   └── SignIn.svelte
│   │   │   │   ├── molecules
│   │   │   │   │   ├── AchievementCard.svelte
│   │   │   │   │   ├── CTFInputBox.svelte
│   │   │   │   │   ├── CallCard.svelte
│   │   │   │   │   ├── CampaignCard.svelte
│   │   │   │   │   ├── CampaignForm.svelte
│   │   │   │   │   ├── ChatCard.svelte
│   │   │   │   │   ├── ComputerChipCoCard.svelte
│   │   │   │   │   ├── CongratulationsModal.svelte
│   │   │   │   │   ├── ContactCard.svelte
│   │   │   │   │   ├── EmailView.svelte
│   │   │   │   │   ├── FailureModal.svelte
│   │   │   │   │   ├── GenericCampaignCard.svelte
│   │   │   │   │   ├── GenericCharacterCard.svelte
│   │   │   │   │   ├── GenericVideoCard.svelte
│   │   │   │   │   ├── LearnCard.svelte
│   │   │   │   │   ├── NavBar.svelte
│   │   │   │   │   ├── ProgressBar.svelte
│   │   │   │   │   ├── Register.svelte
│   │   │   │   │   ├── ResetCampaign.svelte
│   │   │   │   │   ├── SignInModal.svelte
│   │   │   │   │   ├── TermsAndConditions.svelte
│   │   │   │   │   ├── Testimonial.svelte
│   │   │   │   │   └── WasteManagementCard.svelte
│   │   │   │   └── organisms
│   │   │   │       ├── AuthModalSwitcher.svelte
│   │   │   │       └── Dashboard.svelte
│   │   │   ├── index.ts
│   │   │   └── themes
│   │   │       ├── theme.ts
│   │   │       └── themeTypes.ts
│   │   ├── routes
│   │   │   ├── (admin)
│   │   │   │   ├── +layout.server.ts
│   │   │   │   ├── +layout.svelte
│   │   │   │   ├── admin
│   │   │   │   │   └── +page.svelte
│   │   │   │   ├── create
│   │   │   │   │   └── +page.svelte
│   │   │   │   └── edit
│   │   │   │       └── [id]
│   │   │   │           ├── +page.server.ts
│   │   │   │           └── +page.svelte
│   │   │   ├── +layout.server.ts
│   │   │   ├── +layout.svelte
│   │   │   ├── +page.svelte
│   │   │   ├── api
│   │   │   │   ├── auth
│   │   │   │   │   └── +server.ts
│   │   │   │   ├── campaigns
│   │   │   │   │   ├── +server.ts
│   │   │   │   │   └── [slug]
│   │   │   │   │       └── +server.ts
│   │   │   │   ├── conversation
│   │   │   │   │   └── +server.ts
│   │   │   │   ├── images
│   │   │   │   │   └── [filename]
│   │   │   │   │       └── +server.ts
│   │   │   │   ├── message
│   │   │   │   │   └── +server.ts
│   │   │   │   ├── profile
│   │   │   │   │   └── +server.ts
│   │   │   │   ├── realtime
│   │   │   │   │   └── +server.ts
│   │   │   │   ├── register
│   │   │   │   │   └── +server.ts
│   │   │   │   ├── resetcampaign
│   │   │   │   │   └── +server.ts
│   │   │   │   ├── timestamp
│   │   │   │   │   └── +server.ts
│   │   │   │   └── transcript
│   │   │   │       └── +server.ts
│   │   │   ├── harvesta
│   │   │   │   └── harvestasite
│   │   │   │       └── +page.svelte
│   │   │   └── main
│   │   │       ├── +layout.svelte
│   │   │       ├── +page.svelte
│   │   │       ├── about
│   │   │       │   └── +page.svelte
│   │   │       ├── campaigns
│   │   │       │   ├── +page.server.ts
│   │   │       │   ├── +page.svelte
│   │   │       │   └── [slug]
│   │   │       │       ├── +layout.svelte
│   │   │       │       ├── +page.server.ts
│   │   │       │       └── +page.svelte
│   │   │       └── learn
│   │   │           └── +page.svelte
│   │   └── server
│   │       └── utils
│   │           ├── aiSendMessage.ts
│   │           ├── campaignSync.ts
│   │           ├── crypto.ts
│   │           ├── dbAddTimestamp.ts
│   │           ├── dbAuthUser.ts
│   │           ├── dbCreateConversation.ts
│   │           ├── dbCreateJson.ts
│   │           ├── dbCreateMessage.ts
│   │           ├── dbCreateSession.ts
│   │           ├── dbCreateUser.ts
│   │           ├── dbDeleteFullCampaign.ts
│   │           ├── dbDeleteSession.ts
│   │           ├── dbGetConversation.ts
│   │           ├── dbGetMessages.ts
│   │           ├── dbGetTranscript.ts
│   │           ├── dbGetUser.ts
│   │           ├── dbUpdateCampaign.ts
│   │           ├── dbUpdateTranscript.ts
│   │           ├── dbUpdateUser.ts
│   │           ├── dbUserDeleteCampaigndata.ts
│   │           ├── getUserId.ts
│   │           ├── getUserIdFromToken.ts
│   │           ├── jsonGetCampaigns.ts
│   │           ├── types
│   │           │   ├── aiApi.ts
│   │           │   ├── apiRequests.ts
│   │           │   ├── campaign.ts
│   │           │   ├── dbResults.ts
│   │           │   └── functionResults.ts
│   │           └── validateCharacter.ts
│   ├── static
│   │   ├── BAIT-modified.png
│   │   ├── BAIT.png
│   │   ├── BrightProduce.jpg
│   │   ├── BrownGroceryAisle.jpg
│   │   ├── ComputerChipCoLogo.png
│   │   ├── Contact.png
│   │   ├── CorporateHQ.jpg
│   │   ├── FamilyShopping.jpg
│   │   ├── HackerProfile.png
│   │   ├── HackingCampaign.jpeg
│   │   ├── HarvestaLogomini.png
│   │   ├── HarvestaOfficeFloorplan.jpg
│   │   ├── Harvesta_Video.mp4
│   │   ├── ManByBananas.jpg
│   │   ├── Map.jpg
│   │   ├── Maya_Canite.jpg
│   │   ├── PineappleGirl.jpg
│   │   ├── Randy.png
│   │   ├── SEPPTIC.png
│   │   ├── Salad.jpg
│   │   ├── SmilingFlashPhotoAisle.jpg
│   │   ├── SocialEngineering.jpeg
│   │   ├── Soup.jpg
│   │   ├── Spencer_Smith.jpg
│   │   ├── WasteManagementLogo.png
│   │   ├── audio
│   │   │   ├── ash.m4a
│   │   │   ├── coral.m4a
│   │   │   └── verse.m4a
│   │   ├── call_selected.png
│   │   ├── favicon.png
│   │   └── message_selected.png
│   ├── svelte.config.js
│   ├── tailwind.config.ts
│   ├── tsconfig.json
│   └── vite.config.ts
└── update.sh

52 directories, 191 files

 ```

# SEPPTIC File Structure

- **.dockerignore** - Specifies which files to ignore when building the docker container
- **.github**
    - **workflows**
        - **docker-publish.yml** - Defines GitHub action that builds and publishes the docker container and starts the container on the server
- **.gitignore** - Files for git to ignore
- **Dockerfile** - Defines how to build the docker container
- **Docs** - Documentation
    - **Campaign Creation** - Everything needed to build out the story for a campaign using the proper character prompt formatting
        - **character-sheets** - Contains templates for designing characters and a blank template for such
    - **Development Resources** - More detailed technical documentation
        - **API Functions.md** - Documentation of the inner workings of teh API
        - **CampaignDefinition.ts** - A TypeScript file that defines the structure of a campaign **NEEDS UPDATING TO NEW FORMAT**
        - **CampaignInfoFormat.md** - Write up on how to format campaign info properly
        - **DatabaseInit.sql** - A SQL file that initializes the database, run this when building Mariadb fresh
        - **SEPPTIC.postman_collection.json** - A Postman definition of the API endpoints **NEEDS UPDATING**
    - **Final Design Package** - MD files to be included in the final design package
        - **API Endpoints.md** - Documentation of the API endpoints
        - **Architecture.md** - Documentation of the system architecture and technologies we are using
        - **Campaign Creation Instructions.md** - Instructions for creating additional campaigns
        - **Deployment Instructions.md** - Instructions to build and deploy the application on Docker. Also contains information on GitHub Actions.
        - **Design Requirements.md** - A list of design requirements for the project
        - **ERD.md** - ERD diagram for database
        - **File Structure.md** - This file
        - **Overview.md** - An overview of the project
        - **Potential Improvements.md** - A list of potential improvements to the project
        - **User Feedback.md** - A summary of user feedback
    - **Media** - Media files used in the documentation
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
    - **images** - Holds all campaign images for permanant campaigns. This is where campaigns created after container build have their images stored too
    - **prisma** - Contains the Prisma ORM schema.
        - **schema.prisma** - Prisma schema for the database
    - **src** - 
        - **app.css** - This file handles CSS package imports for the project
        - **app.d.ts** - Sveltekit boilerplate
        - **app.html** - Sveltekit boilerplate for initializing the application
        - **campaign-seeds** - Holds JSON files for campaigns that need to persist across instances
            - **1.json** - Harvesta JSON file
            - **2.json** - BYU JSON file
        - **index.test.ts** - This holds the index for tests for the frontend
        - **lib** - This file holds the components and style themes for the project
            - **auth.svelte.ts** - This file stores frontend data for being logged in
            - **components** - These are all of our ccomponents for the application that are then imported to the +page.svelte files
                - **atoms** - Granular level components
                    - **QuizSubmission.svelte** - 
                    - **SignIn.svelte** - 
                - **molecules** - Larger components that can be modals or encompass multiple functionalities
                    - **AchievementCard.svelte** -
                    - **CTFInputBox.svelte** - 
                    - **CallCard.svelte** -
                    - **CampaignCard.svelte** - 
                    - **CampaignForm.svelte** - Component for edit and create forms in admin panel
                    - **ChatCard.svelte** - 
                    - **ComputerChipCoCard.svelte** -
                    - **CongratulationsModal.svelte** - 
                    - **ContactCard.svelte** - 
                    - **EmailView.svelte** - 
                    - **FailureModal.svelte** -
                    - **GenericCampaignCard.svelte** - 
                    - **GenericCharacterCard.svelte** - 
                    - **GenericVideoCard.svelte** - 
                    - **LearnCard.svelte** - 
                    - **NavBar.svelte** - 
                    - **ProgressBar.svelte** - 
                    - **Register.svelte** -
                    - **ResetCampaign.svelte** -  
                    - **SignInModal.svelte** - 
                    - **TermsAndConditions.svelte** - 
                    - **Testimonial.svelte** - 
                    - **WasteManagementCard.svelte** - 
                - **organisms** - The largest components that combine together multiple components together
                    - **AuthModalSwitcher.svelte** - 
                    - **Dashboard.svelte** - 
            - **index.ts** - This file handles imports for any files in the lib folder to make it easier to access them in the main project
            - **themes** - Themes for the project defined for CSS styling
                - **theme.ts** - 
                - **themeTypes.ts** - 
        - **routes** - The main layout for the project, every +page.svelte file is a route that you can visit in the browser
            - **+layout.server.ts** - Handles logic for making sure you are authenticated, and keeping data stored in a place so you can access easily across every route (These are in sub-routes as well)
            - **+layout.svelte** - Handles top level design logic and styling for the entire project (These are in sub-routes as well)
            - **+page.svelte** - The main page for the route and also the main page that you look at when visiting our site (These are in sub-routes as well)
            - **(admin)** - Routing group for admin functions
                - **+layout.server.ts** - Handles an auth check for all routes in this group. Only admin token users are admitted
                - **+layout.svelte** - Imports nav bar and some user data
                - **admin** - Access to all admin functions: create, edit, delete campaigns
                    - **+page.svelte**
                - **create** - Uses CampaignForm component in create context
                    -**+page.svelte**
                - **edit** - Populates CampaignForm with data from Campaign @ id paramater
                    - **[id]**
                        - **+page.server.ts** -
                        - **+page.svelte** -
            - **api** - API routes
                - **auth** - /api/auth
                    - **+server.ts** - Auth endpoint definitions
                - **campaigns** - /api/campaigns
                    - **+server.ts** - Campaigns endpoint
                    - **[slug]** - /api/campaigns/[CampaignID]
                        - **+server.ts** - Used to GET, POST, and PUT individual campaigns
                - **conversation** - /api/conversation
                    - **+server.ts** - Conversation endpoint definitions
                - **images** - /api/images/[filename]; Used to store images from created or edited campaigns
                    - [filename]
                        - **+server.ts**
                - **message** - /api/message
                    - **+server.ts** - Message endpoint definitions
                - **profile** - /api/profile
                    - **+server.ts** - Profile endpoint definitions
                - **realtime** - /api/realtime
                    - **+server.ts** - Realtime AI endpoint
                - **register** - /api/register
                    - **+server.ts** - Register endpoint definitions
                - **resetCampaign** - /api/resetCampaign
                    - **+server.ts** - Handles resetting campaign data completely. Should eventually be migrated into other campaign endpoint
                - **timestamp** - /api/timestamp
                    - **+server.ts** - Used to timestamp specific user actions
                - **transcript** - /api/transcript
                    - **+server.ts** - Used to store transcripts of realtime convos to DB
            - **harvesta** - Harvesta site that you can visit that represents the company website
                - **harvestasite** - 
                    - **+page.svelte** - page for company site
            - **main** - The main route for campaign info and including sub-routes for about, campaigns, contact, learn
                - **+layout.svelte** - 
                - **+page.svelte** - 
                - **about** - 
                    - **+page.svelte** - 
                - **campaigns** - 
                    - **+page.server.ts** - 
                    - **+page.svelte** - 
                    - **[slug]** - This is the route that is automatically generate for each campaign that we make based on ID
                        - **+layout.svelte** - Top level styling/logic
                        - **+page.server.ts** - Server logic
                        - **+page.svelte** - Page for the main route for each campaign ID
                - **learn** - Learn page
                    - **+page.svelte** - 
        - **server** - Server-side code
            - **utils** - Utility functions for the API
                - **aiSendMessage.ts** - Functions handling communication with OpenAI
                - **campaignSync.ts** - On container build, syncs the campaigns in campaign-seeds with the DB to ensure consistent state
                - **crypto.ts** - Functions handling password hashing and verification
                - **dbAddTimestamp.ts** - Updates UserEventLog with timestamps; used in /api/timestamp
                - **dbAuthUser.ts** -
                - **dbAuthUser.ts** - Functions handling user authentication and session management
                - **dbCreateConversation.ts** - Functions handling the creation of conversations in the DB
                - **dbCreateJson.ts** - Creates a json representation of campaign data and stores to DB
                - **dbCreateMessage.ts** - Functions handling the creation of messages in the DB
                - **dbCreateSession.ts** - Functions handling the creation of sessions in the DB
                - **dbCreateUser.ts** - Functions handling the creation of users in the DB
                - **dbDeleteFullCampaign.ts** - Used to remove all campaign data; used by delete button in admin panel
                - **dbDeleteSession.ts** - Functions handling the deletion of sessions in the DB
                - **dbGetConversation.ts** - Functions handling the retrieval of conversations from the DB
                - **dbGetMessages.ts** - Functions handling the retrieval of messages from the DB
                - **dbGetTranscript.ts** - Retrieves transcripts from DB
                - **dbGetUser.ts** - Functions handling the retrieval of user data from the DB
                - **dbUpdateCampaign.ts** - used by PUT method in campaigns/[id] to modify JSON in DB
                - **dbUpdateTranscript** - Handles overwriting transcripts with newest version when calls end
                - **dbUpdateUser.ts** - Functions handling the updating of user data in the DB
                - **dbUserDeleteCampaigndata.ts** - 
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
    - **static** - Static front end files
        - **BAIT-modified**.png
        - **BAIT.png**
        - **BrightProduce.jpg**
        - **BrownGroceryAisle.jpg**
        - **ComputerChipCoLogo.png**
        - **Contact.png**
        - **CorporateHQ.jpg**
        - **FamilyShopping.jpg**
        - **HackerProfile.png**
        - **HackingCampaign.jpeg**
        - **HarvestaLogomini.png**
        - **HarvestaOfficeFloorplan.jpg**
        - **Harvesta_Video.mp4**
        - **ManByBananas.jpg**
        - **Map.jpg**
        - **Maya_Canite.jpg**
        - **PineappleGirl.jpg**
        - **Randy.png**
        - **SEPPTIC.png**
        - **Salad.jpg**
        - **SmilingFlashPhotoAisle.jpg**
        - **SocialEngineering.jpeg**
        - **Soup.jpg**
        - **Spencer_Smith.jpg**
        - **WasteManagementLogo.png**
        - **audio**
            -**ash.m4a**
            - **coral.m4a**
            - **verse.m4a**
        - **call_selected.png**
        - **favicon.png**
        - **message_selected.png**
    - **svelte.config.js** - Boiler plate for running the svelte project
    - **tailwind.config.ts** - Tailwind config where you can define colors and stylings
    - **tsconfig.json** - Typescript config file
    - **vite.config.ts** - Vite config which a dependency for sveltekit
- **update.sh** - A basic script to rebuild the docker container for development purposes