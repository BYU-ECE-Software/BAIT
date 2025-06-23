<script lang="ts">
  import { AccordionItem, Accordion } from 'flowbite-svelte';
  import { writable } from 'svelte/store';
  import { Avatar, Card, Progressbar, BottomNav, BottomNavItem } from 'flowbite-svelte';
  import { UserCircleOutline, BadgeCheckOutline, ArrowUpRightFromSquareOutline, WalletSolid, AdjustmentsVerticalOutline, UserCircleSolid } from 'flowbite-svelte-icons';
  import { GenericVideoCard, GenericCharacterCard, AchievementCard } from '$lib';
  import Chat from '../../../../lib/components/molecules/ChatCard.svelte'; // Import EmailView
  import Call from '../../../../lib/components/molecules/CallCard.svelte'; // Import Realtime Call Card
  import CTFInputBox from '../../../../lib/components/molecules/CTFInputBox.svelte';

  const activeTab = writable('tab1');

  function switchTab(tab: string) {
    console.log(`Switching to ${tab}`);
    activeTab.set(tab);
  }

  let { data } = $props();
  console.log("data = ", data);

  let selectedTab = $state('Mission');


    const selectedCharacter = writable(data.campaign.Characters[0]);

    function selectCharacter(character) {
        console.log("Selected character:", character);
        selectedCharacter.set({ ...character });
    }
// TEXTING FUNCTIONS
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

    const initialMessages = data.messagesByCharacter[$selectedCharacter.Name]?.messages.map(m => ({
        sender: m.role === 'user' ? 'You' : $selectedCharacter.Name,
        content: m.content,
        timestamp: m.timestamp
    })) ?? [];

    interface Contact {
        id: number;
        name: string;
    }

    // Build once at component initialization
    const userContacts: Contact[] = [
        { id: 1, name: 'You' },
        // then map your Characters into contacts
        ...data.campaign.Characters.map((c, i) => ({
        id: i + 2,      // +2 because “You” is id=1
        name: c.Name
        }))
    ];
    let fromContactId = userContacts[0].id;


  let chatOrCall = $state("chat"); // Default to chat

  function setCall() {
    chatOrCall = "call";
    console.log("Opening call window");
    console.log(chatOrCall);
  }
    function setChat() {
    chatOrCall = "chat";
    console.log("Opening chat window");
    console.log(chatOrCall);
  }
  
</script>

<!-- Content to display on screens 1024px wide or larger START-->
<div class="hidden lg:block">
    <div style="display: flex;">
    <!-- Vertical Tabs -->
    <div style="display: flex; flex-direction: column; min-width: 300px; border-right: 1px solid #ccc;"
            class="flex flex-col min-w-[300px] border-r border-gray-300 h-screen">
        <p class="font-semibold text-xs text-gray-500 ml-4">Social Engineering</p>
        <h4 class="font-bold text-gray-700 ml-4">Title of Campaign</h4>
        <hr class="border-t border-gray-300 mb-4 ml-4 mr-4" />
        <button
        on:click={() => activeTab.set('tab1')}
        class="py-3 px-2 mb-3 mx-4 text-left rounded-lg hover:bg-gray-100 relative"
        >
        {#if $activeTab === 'tab1'}
            <div class="absolute top-0 left-0 w-full h-1 bg-gray-400 rounded-t-md bg-gray-100"></div>
        {/if}
        <div class="flex flex-col">
            <span class="font-semibold text-md">Mission Documents</span>
            <p class="text-xs text-gray-500">Briefing files and instructions</p>
        </div>
        </button>

        <button
        on:click={() => activeTab.set('tab2')}
        class="py-3 px-2 mb-3 mx-4 text-left rounded-lg hover:bg-gray-100 relative"
        >
        {#if $activeTab === 'tab2'}
            <div class="absolute top-0 left-0 w-full h-1 bg-gray-400 rounded-t-md bg-gray-100"></div>
        {/if}
        <div class="flex flex-col">
            <span class="font-semibold text-md">Chat Portal</span>
            <p class="text-xs text-gray-500">Contact Cards and Info</p>
        </div>
        </button>

        <button
        on:click={() => activeTab.set('tab3')}
        class="py-3 px-2 mb-3 mx-4 text-left rounded-lg hover:bg-gray-100 relative"
        >
        {#if $activeTab === 'tab3'}
            <div class="absolute top-0 left-0 w-full h-1 bg-gray-400 rounded-t-md bg-gray-100"></div>
        {/if}
        <div class="flex flex-col">
            <span class="font-semibold text-md">Progress dashboard</span>
            <p class="text-xs text-gray-500">Progress Bar and Hints</p>
        </div>
        </button>
    </div>

    <!-- Tab Content -->
    <div style="padding: 1rem; flex-grow: 1;">
        {#if $activeTab === 'tab1'}
                <div class="w-full max-w-4xl mx-auto font-semibold">
                <h4 class="text-black-500 mb-2">Mission Documents</h4>
                    <Accordion class="justify-center"
                    activeClass="bg-gray-200 hover:bg-gray-300 text-black focus:ring-4 focus:ring-gray-400 focus:outline-none w-full"
                    inactiveClass="text-black-500 dark:text-gray-400 hover:bg-blue-100 dark:hover:bg-gray-800">
                        <AccordionItem>
                            <span slot="header">Pen test onboarding</span>

                            <div class="space-y-4">
                                <p class="text-sm text-gray-500 dark:text-gray-400">
                                {data.campaign.Campaign_Information.Brief}
                                </p>

                                <p class="text-sm text-gray-500 dark:text-gray-400">
                                <b>Intro Video:</b> Watch the video to learn more about {data.campaign.Campaign_Information.Name}.
                                </p>

                                <div class="overflow-hidden w-full">
                                <div class="w-full max-w-full px-2">
                                    <GenericVideoCard src={data.campaign.Campaign_Information.Briefing_Video} />
                                </div>
                                </div>
                            </div>
                        </AccordionItem>

                        <AccordionItem>
                            <span slot="header">Harvesta Website</span>
                            <div style="display: flex; align-items: center;">
                                <ArrowUpRightFromSquareOutline/>
                                <span style="margin-left: 0.5rem;">Click <a href="{data.campaign.Campaign_Information.Website}" target="_blank" rel="noopener noreferrer" style="color: blue;">here</a> to open the company website in a new tab.</span>
                            </div>
                        </AccordionItem>


                        <AccordionItem>
                            <span slot="header">Gathered Intel on Employees</span>
                            <div class="space-y-4">
                                <p class="text-sm text-gray-800 dark:text-gray-400">
                                This is the information that we have been able to gather on the Employees of [Insert Company Name]. Use this info to decide things like who to contact or learn more about the companies hierarchy. We weren't able to find out everything about everyone, so you may need ask around. 
                                </p>
                                      <div class="grid grid-cols-3 gap-4 p-4">
                                        {#each data.campaign.Characters as character, index}
                                        {#if character.ID !== 99}
                                            <div class="content">
                                            <div class="block bg-white border border-gray-200 rounded-lg shadow 
                                                        hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                                                <GenericCharacterCard 
                                                {character}
                                                campaignId={data.slug} />
                                            </div>
                                            </div>
                                        {/if}
                                        {/each}
                                    </div>
                            </div>
                        </AccordionItem>

                        <AccordionItem>
                            <span slot="header">Other</span>
                        </AccordionItem>
                    </Accordion>
                </div>
        {/if}
        {#if $activeTab === 'tab2'}
            <div class="flex h-[85vh] border rounded-lg overflow-hidden">
                
                <!-- Left: Character List -->
                <div class="w-1/4 flex-shrink-0 bg-white dark:bg-gray-900 border-r border-gray-300 overflow-y-auto">
                {#each data.campaign.Characters as character}
                {#if character.ID !== 99}
                <div class="border-b border-gray-200 dark:border-gray-700">
                    <div
                    class="flex items-center px-4 py-3 transition"
                    class:selected-character={$selectedCharacter?.ID === character.ID}
                    >
                    <img src={character.Image ?? '/placeholder.png'} alt={character.Name} class="w-10 h-10 rounded-full mr-3" />
                    <span class="text-gray-800 dark:text-gray-200">{character.Name}</span>
                        <div class="ml-auto flex space-x-2">
                            <img class="cursor-pointer" on:click={() => { setChat(); selectCharacter(character); }} src="/message_selected.png"/>
                            <img class="cursor-pointer" on:click={() => { setCall(); selectCharacter(character); }} src="/call_selected.png"/>
                        </div>
                    </div>
                </div>
                {/if}
                {/each}
                </div>

                <!-- RIGHT: Chat Panel --> 
                <div class="flex flex-col flex-1 h-full bg-gray-50 dark:bg-gray-800 p-6">
                    <!-- Header + selectors go here… -->
                    <div class="flex items-center justify-between mb-4">
                        <!-- “To:” with avatar and name -->
                        <div class="flex items-center space-x-3">
                        <img
                            src="{$selectedCharacter.Image}"
                            alt="{$selectedCharacter.Name}"
                            class="w-10 h-10 rounded-full"
                        />
                        <div>
                            <p class="text-sm text-gray-500 dark:text-gray-400">To:</p>
                            <p class="text-lg font-semibold text-gray-800 dark:text-white">
                            {$selectedCharacter?.Name}
                            </p>
                        </div>
                        </div>

                        <!-- “From:” dropdown -->
                        <div class="flex flex-col">
                        <label for="from-select" class="text-sm text-gray-500 dark:text-gray-400">
                            From:
                        </label>
                        <select
                            id="from-select"
                            bind:value={fromContactId}
                            class="mt-1 p-1 bg-white dark:bg-gray-700 border border-gray-300 rounded"
                        >
                            {#each userContacts as c}
                            <option value={c.id}>{c.name}</option>
                            {/each}
                        </select>
                        </div>
                    </div>

                    <!-- Chat area fills all remaining space -->
                    <!--Depending on which button is selected chat or call will fill space-->
                    {#if chatOrCall == "chat"}
                        <div class="flex-grow overflow-y-auto">
                            {#key $selectedCharacter?.ID}
                            <Chat
                                class="h-full"
                                characterId={$selectedCharacter.ID}
                                contactName={$selectedCharacter.Name}
                                campaignId={data.slug}
                                on:messageSent={e => {
                                console.log('new message for', e.detail.characterId, e.detail.message);
                                }}
                            />
                            {/key}
                        </div>
                    {:else if chatOrCall == "call"}
                    <div>
                        {#key $selectedCharacter?.ID}
                        <Call
                            class="h-full"
                            characterId={$selectedCharacter.ID}
                            contactName={$selectedCharacter.Name}
                            campaignId={data.slug}
                            prompt={$selectedCharacter.Prompt}
                            voice={$selectedCharacter.Voice}
                            CallLimit={$selectedCharacter.CallLimit}
                        />
                        {/key}
                    </div>
                    {/if}   
                </div>
            </div>


            <style>
                .selected-character {
                background-color: #e5e7eb;
                }
            </style>
        {/if}
        {#if $activeTab === 'tab3'}
            <div class="w-full max-w-4xl mx-auto font-semibold space-y-5">
                <h4 class="text-black-500 mb-2">Progress Dashboard</h4>
                <p class="text-sm text-gray-500 dark:text-gray-400">
                 {data.campaign.Campaign_Information.Brief}
                </p>
                
                <CTFInputBox
                    placeholder="Write answer here"
                    question={data.campaign.Campaign_Information.Final_Question}
                    answer={data.campaign.Campaign_Information.Final_Answer}
                />

                <div class="flex flex-col flex-1 h-full bg-gray-50 dark:bg-gray-800 p-6">
                    <!-- Header + selectors go here… -->
                    <div class="flex items-center justify-between mb-4">
                        <!-- “To:” with avatar and name -->
                        <div class="flex items-center space-x-3">
                        <img
                            src="/Randy.png"
                            alt="Randy"
                            class="w-10 h-10 rounded-full"
                        />
                        <div>
                            <p class="text-sm text-gray-500 dark:text-gray-400">To:</p>
                            <p class="text-lg font-semibold text-gray-800 dark:text-white">
                            Randy
                            </p>
                        </div>
                        </div>
                    </div>

                    <!-- Chat area fills all remaining space -->
                    <div class="flex-grow overflow-y-auto">
                        <Chat
                            size={1}
                            class="h-full"
                            characterId={99}
                            contactName={"Randy"}
                            campaignId={data.slug}
                            on:messageSent={e => {
                            console.log('new message for', e.detail.characterId, e.detail.message);
                            }}
                        />
                    </div>
                </div>

            </div>
        {/if}
    </div>
    </div>
</div>
<!-- Content to display on screens 1024px wide or larger END-->

<!-- Content to display on screens 1023px wide or smaller START-->
<div class="block lg:hidden">
      <!-- "Mission" or "Briefing" Tab Content -->

  {#if selectedTab === 'Mission'}
      <div style="display: flex; align-items: center;">
          <ArrowUpRightFromSquareOutline/>
          <span style="margin-left: 0.5rem;">Click <a href="{data.campaign.Campaign_Information.Website}" target="_blank" rel="noopener noreferrer" style="color: blue;">here</a> to open the company website in a new tab.</span>
      </div>
      <div style="width: 75vw; margin: auto;">
        <!-- <GenericVideoCard src={data.campaign.Campaign_Information.Briefing_Video} /> -->
         <GenericVideoCard src={data.campaign.Campaign_Information.Briefing_Video} />
    </div>
      <p class="text-sm text-gray-500 dark:text-gray-400">
          <b>Intro Video:</b>
          Watch the video to learn more about Harvesta Foods and their expansion efforts.
      </p>

      <p class="text-sm text-gray-500 dark:text-gray-400">
        Watch the video to learn more about {data.campaign.Campaign_Information.Name}.
      </p>

      <p class="text-sm text-gray-500 dark:text-gray-400">
        {data.campaign.Campaign_Information.Brief}
      </p>

      <!-- "Dashboard" Tab Content -->
  {:else if selectedTab === 'Dashboard'}
      <div>
        {#each data.campaign.Characters as character, index}
            <div class="content">
                <div class="block max-w-sm bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                    <GenericCharacterCard messageData={data.messagesByCharacter} updateIntel={(updatedCharacterId: number, updatedIntelId: number) => {updateIntel(updatedCharacterId, updatedIntelId)}} character={character} campaignId={data.slug} characterProgress={data.progresses.characters[character.ID]} userIntels = {userIntels[character.ID]} />
                </div>
            </div>
        {/each}
      </div>

      <!-- "Progress" Tab Content -->
  {:else if selectedTab === 'Progress'}
      <div class="flex space-x-4" style="padding: 1rem; margin-top: 1rem;">
          <div class="flex items-center space-x-4 rtl:space-x-reverse" style="margin: auto; width:60vw;">
              <Avatar>
                  <UserCircleOutline />
              </Avatar>
              <div class="space-y-1 font-medium dark:text-white">
                  <div>{data.user.name}</div>
              </div>
          </div>
      </div>
      <div class="grid gap-4 w-full" style="padding: 1rem; margin-bottom: 1rem;">
          <div class="flex overflow-x-auto space-x-4 w-full" style="padding: 1rem; margin-bottom: 1rem;">
            {#each data.user.achievements as achievement, index}
              {#if achievement.Campaign_ID == data.slug}
                <Card style="width: 30vw;">
                  <div class="flex flex-col items-center">
                    <AchievementCard title={achievement.Name} description={achievement.Description}/>
                  </div>
                </Card>
              {/if}
            {/each}
          </div>
      </div>
      Progress
      <div class="flex space-x-4" style="padding: 1rem; margin-top: 1rem;">
          <Progressbar progress={data.progresses.campaign} size="h-4" labelInside/>
      </div>
      <!-- First Character Begin -->
      {#each data.campaign.Characters as character, index}
        <hr class="my-4">
        <div class="flex space-x-4" style="padding: 1rem; margin-top: 1rem;">
            <Avatar>
                <img src={character.Image} alt={character.Name} />
            </Avatar>
            <div class="space-y-1 font-medium dark:text-white" style="width: 250px;">
                <div>{character.Name}</div> <!-- First Character Name -->
                <div class="text-sm text-gray-500 dark:text-gray-400">{character.Title}</div> <!-- First Character Job Title -->
            </div>
        </div>
        <div class="space-y-1 font-medium dark:text-white">
            {#each character.Intel as intel, index}
                {#if userIntels[character.ID][intel.Intel_ID]}
                    <div class="flex space-x-4" style="padding: 1rem; margin-top: 1rem;">
                        <div class="flex items-center">
                            <BadgeCheckOutline/>
                            <p style="padding: 1rem; margin-left: 1rem;">{intel.Intel_Description}</p>
                        </div>
                    </div>
                {:else}
                    <div class="flex space-x-4" style="padding: 1rem; margin-top: 1rem;">
                        <div class="flex items-center">
                            <p style="padding: 1rem; margin-left: 1rem;">{intel.Quiz}</p>
                        </div>
                    </div>
                {/if}
            {/each}
        </div>
      {/each}
      <!-- First Character End -->
  {/if}


  <BottomNav position="fixed" classInner="grid-cols-3" activeUrl="/" style="bottom-0: left-0 right-0 z-10">
      <BottomNavItem btnName="Mission" on:click={() => selectedTab = 'Mission'}>
          <WalletSolid class="w-6 h-6 mb-1 text-gray-500 dark:text-gray-400 group-hover:text-primary-600 dark:group-hover:text-primary-500" />
      </BottomNavItem>
      <BottomNavItem btnName="Dashboard" on:click={() => selectedTab = 'Dashboard'}>
          <AdjustmentsVerticalOutline class="w-6 h-6 mb-1 text-gray-500 dark:text-gray-400 group-hover:text-primary-600 dark:group-hover:text-primary-500" />
      </BottomNavItem>
      <BottomNavItem btnName="Progress" on:click={() => selectedTab = 'Progress'}>
          <UserCircleSolid class="w-6 h-6 mb-1 text-gray-500 dark:text-gray-400 group-hover:text-primary-600 dark:group-hover:text-primary-500" />
      </BottomNavItem>
  </BottomNav>

</div>
<!-- Content to display on screens 1023px wide or smaller END-->
