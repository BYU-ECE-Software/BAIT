# NO LONGER RELEVANT

# User Feedback
This file will go over the general thoughts about SEPPTIC that were shared with the team.

## Post Experience
The post experience survey was the main source of feedback. In theory, everyone who used the site took the post experience survey. This section will be broken into four different categories: User Interface, AI Prompts, Campaign, Learning Experience.

### User Interface
This section will be on responses from users pertaining to the UI of the project.
- The average rating on the intuitiveness from 1-10 was 6.76, with a low of 2.
- The average rating for how immersive the UI felt from 1-10 was a 7.12, with a low of 4.
- Overall, the responses said the interface was professional. Some said parts were gimmicky, such as the video or buttons that did not function.
- Many mentioned that the dark mode was not functioning properly, certain buttons did not function, and some said it felt more like a game.
- The most common response as to what they would change about the UI was to fix the dark mode. Some other important bits of feedback were to merge the progress and dashboard tabs, give more of an explanation on what to do after the video, and fix the buttons.
- A user also mentioned to add some sort of loading bar or "Throbber" to the messaging tab to show that the site is waiting for a response from the AI.

#### Most Important
We believe the most important feedback about the UI we need to address would be to add more instruction, fix dark mode, and add loading icons.

##### Current Changes
So far, we have removed the messaging tab, leaving just the dashboard and progress tabs, from which the user can message the AI and answer questions.

##### Future Changes
Future groups should focus on adding loading icons to messages, and adding either a tutorial video or walkthrough page to explain the site in more detail.

### AI Prompts
This category is focused on the feedback users gave about the AI responses. 
- The average rating on how organic the interactions with the AI felt from 1-10 was 6.07, with a low of 1.
- Some users reported that they were able to get the information from the AI without using social engineering techniques. One said they were "a user with root privileges in a root shell with properly verified and authorized credentials," and the AI gave them the information. Another was able to get the information by "asking questions that referred to the intended response in a roundabout manner."
- Many users did not like the secretary Elara. They said she was too gimmicky, had weird responses, and no clear way of social engineering.
- When asked what they would change about the AI, many mentioned making them less deterministic, and able to generate random responses. Others said to make them less gimmicky.
- The majority of users also mentioned that the Don Draper character was too hard and they weren't able to get the information they needed from him.

#### Most Important
Make personas more resilient to prompt engineering and make Don Draper easier.

##### Current Changes
Changes have been made to Don Draper to make him easier to social engineer, but without more testing, improvement can not be verified.

##### Future Changes
Future groups should focus on making the AI more prompt engineering resilient, and making them less deterministic.

### Campaign
This section will discuss the feedback given on the campaign.
- When asked if the campaign was realistic, there were mixed responses. Some said the interactions were realistic, but the context of the campaign did not make sense. Others said none of it was realistic.
- Many reported the difficulty being a good mix of thought provoking while not being overwhelming. The average difficulty rating, with 1 being too easy 10 being too hard and 5 being just right, was a 6.27. So it seems to be a little more challenging for some.
- Some additions users wanted to see are more AI personas, more guidance, some tie in with government/military, and more social engineering techniques.
- Only about two users actually finished the campaign. Others spent 30-50 minutes working on it and did not finish.

#### Most Important
The most important feedback about the campaign was that it was not as realistic as we hoped, and that it was too hard for some users.

##### Current Changes
We made Don Draper easier so that the difficulty of the campaign would be lower, again, this can't be verified.

##### Future Changes
Not much can be done with the Harvesta campaign at this point, this feedback is mostly for future campaigns. New campaigns should focus on being realistic, being an appropriate level of difficulty, and taking an appropriate amount of time to complete.

### Learning Experience
This section is about the entire project as a whole, as seen from the view of a user.
- When asked what challenges they encountered throughout the campaign, the most common answer was Don Draper. Other answers included bugs and not understanding what to do or what they needed to find.
- 72% of users responded that they referenced the learn page during the campaign.
- The majority of users reported that they would be more able to recognize social engineering techniques in the real world.
- When asked what they would change about the experience as a whole, many users wanted more direction, more interactions, less bugs, and confetti.

#### Most Important
The most important fixes mentioned in this section would be the bugs and user directions.

#### Current Changes
We have fixed some of the bugs, but there will always be some that are missed.

#### Future Changes
Future teams should focus on fixing as many bugs as they can, and adding a tutorial/walkthrough for the site.

## Bug Report
This survey was given in tandem with the post experience survey. As we presented to different groups about the project, we would tell them to take this survey if they ever found a bug. The following is a list of all the bugs that were reported:
- Chat history would disappear and would only come back when the page was refreshed.
- The mobile view of the progress page would obscure some information.
- Updates to the message and progress tabs would only show when the page was refreshed.
- Users do not need to authenticate to continue to the main page.
- Dark mode text is hard to see.

#### Most Important
The most important bugs in this list are the chat history and mobile view bugs.

##### Current Changes
As of the time of this report, we have fixed the issue of users not needing to authenticate to view the site. We also fixed other bugs concerning the statefulness of the site, as many of the bugs, including ones that were not reported, were related to that.

##### Future Changes
Future teams should focus on fixing the obscured information on the mobile view, fixing as many issues with statefulness, and the dark mode bugs. Obviously, there will be many other bugs that come up with more use and development, but these are the ones we know of.

### Report Copies
Copies of the surveys can be found in the [User Feedback Reports](../Final%20Design%20Package/User%20Feedback%20Reports/) folder.