<script lang="ts">
  import { AccordionItem, Accordion } from 'flowbite-svelte';
  import { writable } from 'svelte/store';
  import { Avatar, Tabs, TabItem, Card, Progressbar, Listgroup, BottomNav, BottomNavItem } from 'flowbite-svelte';
  import { UserCircleOutline, BadgeCheckOutline, ArrowUpRightFromSquareOutline, HomeOutline, InfoCircleOutline, OpenDoorOutline, MailBoxOutline, BookOpenOutline, UserOutline, HomeSolid, WalletSolid, AdjustmentsVerticalOutline, UserCircleSolid, AwardOutline, PhoneOutline } from 'flowbite-svelte-icons';
  import { GenericVideoCard, YoutubeVideoCard, GenericCharacterCard, AchievementCard, SecurityTeamSmallCard, CampaignButton, Email } from '$lib';

  const activeTab = writable('tab1');

  function switchTab(tab: string) {
    console.log(`Switching to ${tab}`);
    activeTab.set(tab);
  }

  let { data } = $props();
  console.log("data = ", data);

  let selectedTab = $state('Mission');
  let userIntels = $state(data?.userIntels ?? {});

  function updateIntel(characterId: number, intelId: number) {
    if (!userIntels[characterId]) {
        userIntels[characterId] = {};
    }
    userIntels[characterId][intelId] = true;
    userIntels = { ...userIntels }; // trigger reactivity
  }
</script>


<div style="display: flex;">
  <!-- Vertical Tabs -->
  <div style="display: flex; flex-direction: column; min-width: 150px; border-right: 1px solid #ccc;"
        class="flex flex-col min-w-[200px] border-r border-gray-300 h-screen">
    <p class="font-semibold text-xs text-gray-600 ml-4">Social Engineering</p>
    <h4 class="font-bold text-gray-600 ml-4">Title of Campaign</h4>
    <hr class="border-t border-gray-300 mb-4 ml-4 mr-4" />
    <button on:click={() => activeTab.set('tab1')} class="py-2 px-4 text-left">Mission Documents</button>
    <button on:click={() => activeTab.set('tab2')} class="py-2 px-4 text-left">Main Dashboard</button>
    <button on:click={() => activeTab.set('tab3')} class="py-2 px-4 text-left">Progress</button>
  </div>

  <!-- Tab Content -->
  <div style="padding: 1rem; flex-grow: 1;">
    {#if $activeTab === 'tab1'}
              <div class="w-full max-w-4xl mx-auto">
            <h4 class="text-black-500 mb-2">Mission Documents</h4>
                <Accordion class="justify-center"
                activeClass="bg-gray-200 hover:bg-gray-300 text-black focus:ring-4 focus:ring-gray-400 focus:outline-none w-full"
                inactiveClass="text-black-500 dark:text-gray-400 hover:bg-blue-100 dark:hover:bg-gray-800">
                    <AccordionItem>
                        <span slot="header">Pen test onboarding</span>
                            <p class="text-sm text-gray-500 dark:text-gray-400">
                                            <b>Intro Video:</b>
                                Watch the video to learn more about not hard coded i like to pee my pants {data.campaign.Campaign_Information.Name}.
                            </p>

                            <p class="text-sm text-gray-500 dark:text-gray-400">
                                {data.campaign.Campaign_Information.Brief}
                            </p>
                            <div class="w-full max-w-3xl mx-auto">
                                <YoutubeVideoCard src={data.campaign.Campaign_Information.Briefing_Video} />
                            </div>
                    </AccordionItem>
                    <AccordionItem>
                        <span slot="header">Harvesta Website</span>
                        <div style="display: flex; align-items: center;">
                            <ArrowUpRightFromSquareOutline/>
                            <span style="margin-left: 0.5rem;">Click <a href="{data.campaign.Campaign_Information.Website}" target="_blank" rel="noopener noreferrer" style="color: blue;">here</a> to open the company website in a new tab.</span>
                        </div>
                    </AccordionItem>
                </Accordion>
            </div>
    {/if}
    {#if $activeTab === 'tab2'}
      <div class="container" style="margin: auto; width:60vw;">
              <div class="wrap" style="display: inline-block; position: relative;">
                {#each data.campaign.Characters as character, index}
                  <div class="content">
                      <div class="block max-w-sm bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                          <GenericCharacterCard messageData={data.messagesByCharacter} updateIntel={(updatedCharacterId: number, updatedIntelId: number) => {updateIntel(updatedCharacterId, updatedIntelId)}} character={character} campaignId={data.slug} characterProgress={data.progresses.characters[character.ID]} userIntels = {userIntels[character.ID]} />
                      </div>
                  </div>
                {/each}
              </div>
          </div>
    {/if}
    {#if $activeTab === 'tab3'}
       <div class="flex space-x-4">
              <div class="flex items-center space-x-4 rtl:space-x-reverse" style="margin: auto; width:60vw;">
                  <Avatar>
                      <UserCircleOutline />
                  </Avatar>
                  <div class="space-y-1 font-medium dark:text-white">
                      <div>{data.user.name}</div>
                  </div>
              </div>
              {#each data.user.achievements as achievement, index}
                {#if achievement.Campaign_ID == data.slug}
                  <AchievementCard title={achievement.Name} description={achievement.Description}/>
                {/if}
              {/each}
          </div>
          Progress
          <div class="flex space-x-4" style="padding: 1rem; margin-top: 1rem;">
              <Progressbar progress={data.progresses.campaign} size="h-4" labelInside/>
          </div>
          <hr class="my-4">
          {#each data.campaign.Characters as character, index}
            <div class="flex space-x-4" style="padding: 1rem; margin-top: 1rem;">
                <Avatar>
                    <img src={character.Image} alt={character.Name} />
                </Avatar>
                <div class="space-y-1 font-medium dark:text-white" style="width: 250px;">
                    <div>{character.Name}</div>
                    <div class="text-sm text-gray-500 dark:text-gray-400">{character.Title}</div>
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
            </div>
          {/each}
    {/if}
  </div>
</div>
