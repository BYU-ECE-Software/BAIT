<script>
    import { Card, Avatar, Dropdown, DropdownHeader, DropdownItem, DropdownDivider, Tooltip,  Button, Modal, Progressbar } from 'flowbite-svelte';
    import { ExclamationCircleOutline, UserCircleOutline, BadgeCheckOutline, MessageDotsOutline } from 'flowbite-svelte-icons';
    let clickOutsideModal = false;
</script>

<!--Button Card-->
<Button on:click={() => (clickOutsideModal = true)}>
  <div class="flex items-center space-x-4 rtl:space-x-reverse" style="margin: auto; width:auto;">
    <Avatar>
      <UserCircleOutline />
    </Avatar>
    <div class="space-y-1 font-medium dark:text-white">
      <div>Ann Gunn</div>
      <div class="text-sm text-gray-500 dark:text-gray-400">Finance Associate</div>
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
      <div>Ann Gunn</div>
      <div class="text-sm text-gray-500 dark:text-gray-400">Finance Associate</div>
    </div>
  </div>
  <!--Header Info End-->

  <!--Interaction Icons Begin-->
  <div class="flex items-center space-x-4 rtl:space-x-reverse" style="padding-top: 1rem; margin: auto;">
      <MessageDotsOutline/>
      <p style="padding: auto; margin-right: auto;">Message</p>
    </div>
  <!--Interaction Icons End-->

  <!--Target Goals Begin-->  
  <div class="flex space-x-4" style="padding: 1rem; margin-top: 1rem;">
    <Progressbar progress="50" size="h-4" labelInside/>
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
  <!--Target Goals End-->  
</Modal>
<!--Modal Card-->
