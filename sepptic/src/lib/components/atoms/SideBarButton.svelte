<script>
    import { Drawer, Button, CloseButton, Sidebar, SidebarBrand, SidebarCta, SidebarDropdownItem, SidebarDropdownWrapper, SidebarGroup, SidebarItem, SidebarWrapper } from 'flowbite-svelte';
    import { ChartPieSolid, InfoCircleOutline, BookOpenOutline, MailBoxOutline, UserOutline, ShoppingBagSolid, ArrowRightToBracketOutline, EditOutline, HomeOutline, OpenDoorOutline, TrashBinOutline, UsersOutline } from 'flowbite-svelte-icons';
    import { sineIn } from 'svelte/easing';
    let hidden2 = true;
    let spanClass = 'flex-1 ms-3 whitespace-nowrap';
    let transitionParams = {
      x: -320,
      duration: 200,
      easing: sineIn
    };
  </script>
  
  <div class="text-center">
    <Button on:click={() => (hidden2 = false)}>Show navigation</Button>
  </div>
  <Drawer transitionType="fly" {transitionParams} bind:hidden={hidden2} id="sidebar2">
    <div class="flex items-center">
      <h5 id="drawer-navigation-label-3" class="text-base font-semibold text-gray-500 uppercase dark:text-gray-400">Menu</h5>
      <CloseButton on:click={() => (hidden2 = true)} class="mb-4 dark:text-white" />
    </div>
    <Sidebar>
      <SidebarWrapper divClass="overflow-y-auto py-4 px-3 rounded dark:bg-gray-800">
        <SidebarGroup>
          <SidebarItem label="Home" href="/">
            <svelte:fragment slot="icon">
              <HomeOutline class="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
            </svelte:fragment>
          </SidebarItem>
          <SidebarItem label="About" href="/main/about">
            <svelte:fragment slot="icon">
              <InfoCircleOutline class="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
            </svelte:fragment>
          </SidebarItem>
          <SidebarDropdownWrapper label="Campaigns">
            <svelte:fragment slot="icon">
              <OpenDoorOutline class="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
            </svelte:fragment>
            <SidebarDropdownItem label="Waste Management" />
            <SidebarDropdownItem label="Harvesta Foods" />
            <SidebarDropdownItem label="Computer Chip Co" />
          </SidebarDropdownWrapper>
          <SidebarItem label="Contact" {spanClass} href="/main/contact">
            <svelte:fragment slot="icon">
              <MailBoxOutline class="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
            </svelte:fragment>
            <svelte:fragment slot="subtext">
              <span class="inline-flex justify-center items-center px-2 ms-3 text-sm font-medium text-gray-800 bg-gray-200 rounded-full dark:bg-gray-700 dark:text-gray-300"> Pro </span>
            </svelte:fragment>
          </SidebarItem>
          <SidebarItem label="Learn" {spanClass} href="/main/learn">
            <svelte:fragment slot="icon">
              <BookOpenOutline class="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
            </svelte:fragment>
            <svelte:fragment slot="subtext">
              <span class="inline-flex justify-center items-center p-3 ms-3 w-3 h-3 text-sm font-medium text-primary-600 bg-primary-200 rounded-full dark:bg-primary-900 dark:text-primary-200"> 3 </span>
            </svelte:fragment>
          </SidebarItem>
          <SidebarItem label="Profile" {spanClass}>
            <svelte:fragment slot="icon">
              <UserOutline class="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
            </svelte:fragment>
        </SidebarItem>
        </SidebarGroup>
      </SidebarWrapper>
    </Sidebar>
  </Drawer>