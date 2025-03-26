<script lang="ts">
  import { Card, Avatar, Dropdown, DropdownHeader, DropdownItem, DropdownDivider, Tooltip, Button, Modal, Progressbar, Label, Input } from 'flowbite-svelte';
  import { ExclamationCircleOutline, UserCircleOutline, BadgeCheckOutline, MessageDotsOutline } from 'flowbite-svelte-icons';
  import { QuizSubmission } from '$lib';
  import EmailView from './EmailView.svelte'; // Import EmailView

  let clickOutsideModal = $state(false);
  let showEmailView = $state(false); // Controls EmailView visibility

  let selectedThread = $state<{
    contact: string;
    characterId: number;
    messages: { sender: string; content: string; timestamp: string }[];
  } | null>(null); // Allow null

  let { character, characterProgress, userIntels, campaignId, updateIntel, messageData = {} } = $props<{messageData: { [key: string]: { id: number; messages: any[] } };
    campaignId: string;}>();
  const name = character.Name;
  const title = character.Title;
  const image = character.Image;
  const intel = character.Intel;
  const characterId = character.ID;

  if (characterProgress === undefined) {
    characterProgress = 0;
  }

  let statefulUserIntels = $state(userIntels);

  function passUpdate(characterId: number, intelId: number) {
    statefulUserIntels[intelId] = true;
    statefulUserIntels = { ...statefulUserIntels };
    updateIntel(characterId, intelId);
  }

  function handleSelect(thread: any) {
    console.log("Selected thread (raw proxy):", thread);
    console.log("Selected thread (snapshot):", $state.snapshot(thread)); // ✅ Logs actual state

    if (thread && thread.contact && thread.messages) {
      selectedThread = null;  // ✅ Force reactivity by resetting
      setTimeout(() => {
        selectedThread = JSON.parse(JSON.stringify(thread)); // ✅ Ensure deep reactivity update
        console.log("Updated selectedThread:", $state.snapshot(selectedThread));
      }, 0);
    } else {
      console.error("Invalid thread selected:", thread);
    }
  }

  function openEmailView() {
    console.log('Message data:', messageData); // Debugging line
    console.log('Character name:', name); // Debugging line

    const threadData = messageData[name]; // Extract data for the selected contact
    console.log('Thread data:', threadData); // Debugging line

    if (threadData) {
      handleSelect({
        contact: name,
        characterId: characterId,
        messages: threadData.messages.map((message) => ({
          sender: message.role === 'user' ? 'You' : name,
          content: message.content,
          timestamp: message.timestamp,
        }))
      });
      showEmailView = true; // Show EmailView
      console.log('EmailView should be visible now'); // Debugging line
    } else {
      console.error('No thread data found for:', name);
    }
  }

  function closeEmailView() {
    showEmailView = false; // Close EmailView
    selectedThread = null; // Reset selected thread
  }

  function handleMessageSent(contact, newMessage) {
    // Update message data with the new message
    if (!messageData[contact]) {
      messageData[contact] = { id: newMessage.characterId, messages: [] };
    }
    messageData[contact].messages.push(newMessage);

    // Update EmailView if it's open
    if (selectedThread && selectedThread.contact === contact) {
      selectedThread.messages = [...selectedThread.messages, newMessage];
    }
  }
</script>

<!--Desktop Button Card-->
<Button on:click={() => (clickOutsideModal = true)} class="hidden lg:flex" style="background: white;">
  <div class="flex items-center space-x-4 rtl:space-x-reverse" style="margin: auto; width:auto;">
    <Avatar>
      <img src="{image}" alt="{name} headshot">
    </Avatar>
    <div class="space-y-1 font-medium dark:text-white">
      <div class="text-black font-medium">{name}</div>
      <div class="text-sm text-gray-500 dark:text-gray-400">{title}</div>
    </div>
    <!-- Mail Icon Trigger -->
    <div class="flex items-center" on:click|stopPropagation={openEmailView}>
      <Button class="p-2" style="background: transparent;">
        <MessageDotsOutline class="w-6 h-6 text-gray-500 dark:text-gray-400" />
      </Button>
    </div>
  </div>
</Button>

<!-- Mobile Button Card -->
<Button on:click={() => (clickOutsideModal = true)} class="flex lg:hidden h-full w-full" style="background: white; width: full">
  <div class="flex items-center w-full h-full">
    <div class="flex justify-center w-2/5">
      <Avatar rounded size="lg">
        <img src="{image}" alt="{name} headshot">
      </Avatar>
    </div>
    <div class="flex flex-col justify-center w-3/5 text-center space-y-1 font-medium dark:text-white pl-2">
      <div class="text-black font-medium">{name}</div>
      <div class="text-sm text-gray-500 dark:text-gray-400">{title}</div>
    </div>
    <!-- Mail Icon Trigger -->
    <div class="flex items-center" on:click|stopPropagation={openEmailView}>
      <Button class="p-2" style="background: transparent;">
        <MessageDotsOutline class="w-6 h-6 text-gray-500 dark:text-gray-400" />
      </Button>
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
    <div on:click|stopPropagation={openEmailView}>
      <MessageDotsOutline class="w-6 h-6 text-gray-500 dark:text-gray-400" />
    </div>
    <p style="padding: auto; margin-right: auto;">Message</p>
  </div>
  <!--Interaction Icons End-->

  <!--Target Goals Begin-->
  <div class="flex space-x-4" style="padding: 1rem; margin-top: 1rem;">
    <Progressbar progress={characterProgress} size="h-4" labelInside/>
  </div>
  <div class="space-y-1 font-medium dark:text-white">
    {#each intel as item, index}
      {#if statefulUserIntels[item.Intel_ID]}
        <div class="flex space-x-4" style="padding: 1rem; margin-top: 1rem;">
          <div class="flex items-center">
            <BadgeCheckOutline/>
            <p style="padding: 1rem;">{item.Intel_Description}</p>
          </div>
        </div>

      {:else}
        <div class="flex space-x-4" style="padding: 1rem; margin-top: 1rem;">
          <div class="flex items-center">
            <p style="padding: 1rem;">{item.Quiz}</p>
          </div>
        </div>
        <QuizSubmission correctAnswer={() => {passUpdate(characterId, item.Intel_ID)}} campaignId={campaignId} characterId={characterId} intelId={item.Intel_ID} />
      {/if}
    {/each}
  </div>
  <!--Target Goals End-->
</Modal>
<!--Modal Card-->

<!-- EmailView Modal -->
{#if showEmailView}
  <div class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
    <div class="bg-white w-[600px] max-h-[80vh] overflow-auto shadow-lg rounded-lg relative">
      <!-- Close Button -->
      <button
              class="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
              on:click={closeEmailView}
      >
        <span class="material-icons text-lg">close</span>
      </button>
      <!-- EmailView Component -->
      <EmailView
              thread={selectedThread}
              campaignId={campaignId}
              onClose={closeEmailView}
              onMessageSent={handleMessageSent}
      />
    </div>
  </div>
{/if}