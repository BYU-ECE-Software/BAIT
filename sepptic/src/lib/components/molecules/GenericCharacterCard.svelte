<script>
    import { Card, Avatar, Dropdown, DropdownHeader, DropdownItem, DropdownDivider, Tooltip,  Button, Modal, Progressbar } from 'flowbite-svelte';
    import { ExclamationCircleOutline, UserCircleOutline, BadgeCheckOutline, MessageDotsOutline } from 'flowbite-svelte-icons';
    let clickOutsideModal = false;
    export let name;
    export let title;
    export let image;
    export let intel;
    export let characterProgress;
</script>

<!--Button Card-->
<Button on:click={() => (clickOutsideModal = true)} style="background: white;">
  <div class="flex items-center space-x-4 rtl:space-x-reverse" style="margin: auto; width:auto;">
    <Avatar>
      <img src="{image}" alt="{name} headshot">
    </Avatar>
    <div class="space-y-1 font-medium dark:text-white">
      <div class="text-black font-medium">{name}</div>
      <div class="text-sm text-gray-500 dark:text-gray-400">{title}</div>
    </div>
  </div>
</Button>

<!--Modal Card-->
<Modal bind:open={clickOutsideModal} autoclose outsideclose>
  <!--Header Info Begin-->
  <div class="flex items-center space-x-4 rtl:space-x-reverse" style="margin: auto; width:auto;">
    <Avatar>
      <img src="{image}" alt="{name} headshot">
    </Avatar>
    <div class="space-y-1 font-medium dark:text-white">
      <div>{name}</div>
      <div class="text-sm text-gray-500 dark:text-gray-400">{title}</div>
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
    <Progressbar progress="{characterProgress}" size="h-4" labelInside/>
  </div>
  <div class="space-y-1 font-medium dark:text-white">
    {#each intel as item, index}
        <div class="flex space-x-4" style="padding: 1rem; margin-top: 1rem;">
            <div class="flex items-center">
                <BadgeCheckOutline/> 
                <p style="padding: 1rem; margin-left: 1rem;">Intel {index + 1}</p>
                <p style="padding: 1rem; margin-left: 1rem;">{item.Quiz}</p>
            </div>
        </div>
    {/each}
  </div>
  <!--Target Goals End-->  
</Modal>
<!--Modal Card-->
