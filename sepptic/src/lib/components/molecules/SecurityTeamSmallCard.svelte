<script>
    import { Card, Avatar, Dropdown, DropdownHeader, DropdownItem, DropdownDivider, Tooltip,  Button, Modal, Progressbar } from 'flowbite-svelte';
    import { ExclamationCircleOutline, UserCircleOutline, BadgeCheckOutline, MessageDotsOutline } from 'flowbite-svelte-icons';
    let clickOutsideModal = false;
</script>

<!--Button Card-->
<Button on:click={() => (clickOutsideModal = true)} style="background: white;">
  <div class="flex items-center space-x-4 rtl:space-x-reverse" style="margin: auto; width:auto;">
    <Avatar>
      <UserCircleOutline />
    </Avatar>
    <div class="space-y-1 font-medium dark:text-white">
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
      <UserCircleOutline />
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
