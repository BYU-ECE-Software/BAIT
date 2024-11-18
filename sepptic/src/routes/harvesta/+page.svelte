<script>
    import { Tabs, TabItem, Button, Card } from 'flowbite-svelte';
    import {HarvestaVideoPlayer, HarvestaFoodsCard, SideBarButton} from '$lib';
  </script>
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
      <p class="text-sm text-gray-500 dark:text-gray-400">
        <b>Dashboard:</b>
      </p>
      <div class="container" style="margin: auto">
      <div class="wrap" style="display: inline-block; position: relative;">
        <img src="/HarvestaOfficeFloorplan.jpg" alt="Office Floorplan"/>
        <div class="content" style=" position: absolute; top: 70%; left: 30%;">
          <a href="#" class="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
            <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Elara</h5>
            <p class="font-normal text-gray-700 dark:text-gray-400">Receptionist</p>
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
    <TabItem title="Profile">
      <p class="text-sm text-gray-500 dark:text-gray-400">
        <b>Users:</b>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
      </p>
    </TabItem>
    <TabItem title="Evaluation/Progress">
      <p class="text-sm text-gray-500 dark:text-gray-400">
        <b>See all of your targets below. </b>
        Completed targets will be colored, while those which have yet to be completed will be grey and include a prompt hinting at how to complete it.
      </p>
    </TabItem>
  </Tabs>
