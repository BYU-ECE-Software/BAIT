<script lang="ts">
    import { Card, Avatar, Dropdown, DropdownHeader, DropdownItem, DropdownDivider, Tooltip,  Button, Modal, Progressbar } from 'flowbite-svelte';
    import { ExclamationCircleOutline, UserCircleOutline, BadgeCheckOutline, MessageDotsOutline } from 'flowbite-svelte-icons';
    let {clickOutsideModal = false}: {clickOutsideModal: boolean} = $props();

</script>

<!--Desktop Button Card-->
<Button on:click={() => (clickOutsideModal = true)} class="hidden lg:flex" style="background: white;">
  <div class="flex items-center space-x-4 rtl:space-x-reverse" style="margin: auto; width:auto;">
    <Avatar>
        <img src="/Mr.T.jpeg" alt="Security guard headshot">
    </Avatar>
    <div class="space-y-1 font-medium dark:text-white">
    <div class="text-black font-medium">Mr. T</div>
      <div class="text-sm text-gray-500 dark:text-gray-400">Security</div>
    </div>
  </div>
</Button>

<!-- Mobile Button Card -->
<Button on:click={() => (clickOutsideModal = true)} class="flex lg:hidden h-full" style="background: white; width: 70vw">
  <div class="flex items-center w-full h-full">
    <div class="flex justify-center w-2/5">
      <Avatar rounded size="lg">
        <img src="/Mr.T.jpeg" alt="Security guard headshot">
      </Avatar>
    </div>
    <div class="flex flex-col justify-center w-3/5 text-center space-y-1 font-medium dark:text-white pl-2">
      <div class="text-black font-medium">Mr. T</div>
      <div class="text-sm text-gray-500 dark:text-gray-400">Security</div>
    </div>
  </div>
</Button>

<!--Modal Card-->
<Modal bind:open={clickOutsideModal} autoclose outsideclose>
  <!--Header Info Begin-->
  <div class="flex items-center space-x-4 rtl:space-x-reverse" style="margin: auto; width:auto;">
    <Avatar>
        <img src="/Mr.T.jpeg" alt="Security guard headshot">
    </Avatar>
    <div class="space-y-1 font-medium dark:text-white">
      <div>Mr. T</div>
      <div class="text-sm text-gray-500 dark:text-gray-400">Security</div>
      <p>I pity the fool who acts suspicious. Mr. T will kick you out if he thinks you are.</p>
    </div>
  </div>
  
  <!--Header Info End-->

  <!--Interaction Icons Begin-->
  <div class="flex items-center space-x-4 rtl:space-x-reverse" style="padding-top: 1rem; margin: auto;">
      <MessageDotsOutline/>
      <p style="padding: auto; margin-right: auto;">Message</p>
    </div>
  <!--Interaction Icons End-->

</Modal>
<!--Modal Card-->
