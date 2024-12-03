<script>
    import { Avatar, Tabs, TabItem, Button, Card, Carousel } from 'flowbite-svelte';
    import {HarvestaVideoPlayer, HarvestaFoodsCard, SideBarButton, ElaraSmallCard, AchievementCard} from '$lib';
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
          <a href="#" class="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
            <ElaraSmallCard />
          </a>
        </div>
        <div class="content" style=" position: absolute; top: 35%; left: 75%;">
          <a href="#" class="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
            <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Ben Dover</h5>
            <p class="font-normal text-gray-700 dark:text-gray-400">Finance Guy</p>
          </a>
       </div>
       <div class="content" style=" position: absolute; top: 25%; left: 10%;">
          <a href="#" class="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
            <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Don Draper</h5>
            <p class="font-normal text-gray-700 dark:text-gray-400">Projects</p>
          </a>
        </div>
        <div class="content" style=" position: absolute; top: 65%; left: 5%;">
          <a href="#" class="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
            <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Security</h5>
            <p class="font-normal text-gray-700 dark:text-gray-400">Don't Mess with these guys</p>
          </a>
        </div>
        <div class="content" style=" position: absolute; top: 65%; left: 75%;">
          <a href="#" class="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
            <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Interns</h5>
            <p class="font-normal text-gray-700 dark:text-gray-400">MVP MVP MVP MVP MVP</p>
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
          <Avatar src="/images/profile-picture-1.webp" />
          <div class="space-y-1 font-medium dark:text-white">
            <div>Jese Leos</div>
            <div class="text-sm text-gray-500 dark:text-gray-400">Joined in August 2014</div>
          </div>
        </div>
        <AchievementCard title="Achievement 1" description="Unlocked for thing 1"/>
        <AchievementCard title="Achievement 2" description="Unlocked for thing 2"/>
        <AchievementCard title="Achievement 3" description="Unlocked for thing 3"/>
      </div>
   
    </TabItem>

  </Tabs>
