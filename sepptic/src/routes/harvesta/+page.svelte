<script>
    import { Avatar, Tabs, TabItem, Button, Card, Carousel, Progressbar } from 'flowbite-svelte';
    import { UserCircleOutline, QuestionCircleOutline, BadgeCheckOutline, } from 'flowbite-svelte-icons';
    import {HarvestaVideoPlayer, HarvestaFoodsCard, SideBarButton, AnnGunnSmallCard, DonDraperSmallCard, ElaraSmallCard, TonyFlaggSmallCard,  AchievementCard} from '$lib';
</script>
<div style='margin-bottom: 3rem;'></div>

  <SideBarButton />
  <Tabs tabStyle="underline">
    <TabItem open title="Mission Breifing">
        <HarvestaVideoPlayer />
        <p class="text-sm text-gray-500 dark:text-gray-400">
            <b>Intro Video:</b>
            Watch the video to learn more about Harvesta Foods and their expansion efforts.
        </p>

        <p class="text-sm text-gray-500 dark:text-gray-400">
            Read this text to learn more about Harvesta Foods and their expansion efforts, the background of your pentesting job, rules of engagement, background information, recommendtaions on where to start, what to look for, and most importantly, which days to bring donuts into the office.
        </p>
    </TabItem>
    <TabItem title="Main Dashboard">
      <div class="container" style="margin: auto; width:60vw;">
      <div class="wrap" style="display: inline-block; position: relative;">
        <img src="/HarvestaOfficeFloorplan.jpg" alt="Office Floorplan"/>
        <div class="content" style=" position: absolute; top: 70%; left: 30%;">
          <a href="#" class="block max-w-sm bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
            <ElaraSmallCard />
          </a>
        </div>
        <div class="content" style=" position: absolute; top: 30%; left: 65%;">
          <a href="#" class="block max-w-sm bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
            <TonyFlaggSmallCard />
          </a>
       </div>
       <div class="content" style=" position: absolute; top: 15%; left: 7%;">
          <a href="#" class="block max-w-sm bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
            <DonDraperSmallCard />
          </a>
        </div>
        <div class="content" style=" position: absolute; top: 65%; left: 5%;">
          <a href="#" class="block max-w-sm bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
            <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Security</h5>
            <p class="font-normal text-gray-700 dark:text-gray-400">Don't Mess with these guys</p>
          </a>
        </div>
        <div class="content" style=" position: absolute; top: 65%; left: 70%;">
          <a href="#" class="block max-w-sm bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
            <AnnGunnSmallCard />
          </a>
        </div>
    </div>
  </div>
    </TabItem>
    <TabItem title="Contact History">
      <p class="text-sm text-gray-500 dark:text-gray-400">
        <b>Settings:</b>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
      </p>
    </TabItem>
    <TabItem title="Progress">
      <div class="flex space-x-4">
        <div class="flex items-center space-x-4 rtl:space-x-reverse" style="margin: auto; width:60vw;">
          <Avatar>
            <UserCircleOutline />
          </Avatar>
          <div class="space-y-1 font-medium dark:text-white">
            <div>Jese Leos</div>
            <div class="text-sm text-gray-500 dark:text-gray-400">Joined in August 2014</div>
          </div>
        </div>
          <AchievementCard title="Achievement 1" description="Unlocked for thing 1"/>
          <AchievementCard title="Achievement 2" description="Unlocked for thing 2"/>
          <AchievementCard title="Achievement 3" description="Unlocked for thing 3"/>
      </div>
      Progress
      <div class="flex space-x-4" style="padding: 1rem; margin-top: 1rem;">
        <Progressbar progress="50" size="h-4" labelInside/>
      </div>
      <hr class="my-4">
  <!-- First Character Begin -->
      <div class="flex space-x-4" style="padding: 1rem; margin-top: 1rem;">
        <Avatar>
          <UserCircleOutline />
        </Avatar>
        <div class="space-y-1 font-medium dark:text-white" style="width: 250px;">
          <div>Don Draper</div> <!-- First Character Name -->
          <div class="text-sm text-gray-500 dark:text-gray-400">Finance Department Head</div> <!-- First Character Job Title -->
        </div>
        <div class="space-y-1 font-medium dark:text-white">
          <div class="flex space-x-4" style="padding: 1rem; margin-top: 1rem;">
            <div class="flex items-center">
              <BadgeCheckOutline/>
              <p style="padding: 1rem; margin-left: 1rem;">Requirement 1</p>
            </div>
          </div>
          <div class="flex space-x-4" style="padding: 1rem; margin-top: 1rem;">
            <div class="flex items-center">
              <BadgeCheckOutline/>
              <p style="padding: 1rem; margin-left: 1rem;">Requirement 2</p>
            </div>
          </div>
          <div class="flex space-x-4" style="padding: 1rem; margin-top: 1rem;">
            <div class="flex items-center">
              <BadgeCheckOutline/>
              <p style="padding: 1rem; margin-left: 1rem;">Requirement 3</p>
            </div>
          </div>
        </div>
      </div>
  <!-- First Character End -->
  <!-- Second Character Begin -->
        <hr class="my-4">
        <div class="flex space-x-4" style="padding: 1rem; margin-top: 1rem; ">
          <Avatar>
            <UserCircleOutline />
          </Avatar>
        <div class="space-y-1 font-medium dark:text-white" style="width: 250px;">
          <div>Elara Arale</div> <!-- Second Character Name -->
          <div class="text-sm text-gray-500 dark:text-gray-400">Receptionist</div> <!-- Second Character Job Title -->
        </div>
        <div class="space-y-1 font-medium dark:text-white">
          <div class="flex space-x-4" style="padding: 1rem; margin-top: 1rem;">
            <div class="flex items-center">
              <BadgeCheckOutline/>
              <p style="padding: 1rem; margin-left: 1rem;">Requirement 1</p>
            </div>
          </div>
          <div class="flex space-x-4" style="padding: 1rem; margin-top: 1rem;">
            <div class="flex items-center">
              <BadgeCheckOutline/>
              <p style="padding: 1rem; margin-left: 1rem;">Requirement 2</p>
            </div>
          </div>
          <div class="flex space-x-4" style="padding: 1rem; margin-top: 1rem;">
            <div class="flex items-center">
              <BadgeCheckOutline/>
              <p style="padding: 1rem; margin-left: 1rem;">Requirement 3</p>
            </div>
          </div>
        </div>
      </div>
    </TabItem>

  </Tabs>
