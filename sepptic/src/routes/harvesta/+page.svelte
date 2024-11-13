<script>
    import { Tabs, TabItem } from 'flowbite-svelte';
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
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
      </p>
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
