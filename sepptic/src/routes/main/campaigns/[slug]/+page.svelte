<script lang="ts">
  import { Avatar, Tabs, TabItem, Card, Progressbar, Listgroup, BottomNav, BottomNavItem } from 'flowbite-svelte';
  import { UserCircleOutline, BadgeCheckOutline, ArrowUpRightFromSquareOutline, HomeOutline, InfoCircleOutline, OpenDoorOutline, MailBoxOutline, BookOpenOutline, UserOutline, HomeSolid, WalletSolid, AdjustmentsVerticalOutline, UserCircleSolid, AwardOutline, PhoneOutline } from 'flowbite-svelte-icons';
  import {GenericVideoCard, YoutubeVideoCard, GenericCharacterCard, HarvestaVideoPlayer, AnnGunnSmallCard, DonDraperSmallCard, ElaraSmallCard, TonyFlaggSmallCard,  AchievementCard, SecurityTeamSmallCard, CampaignButton, Email} from '$lib';

  let icons = [
      { name: 'Home', icon: HomeOutline, href:`/` },
      { name: 'About', icon: InfoCircleOutline, href:`/main/about`},
      { name: 'Campaigns', icon: OpenDoorOutline, href: '/main/campaigns' },
      { name: 'Contact', icon: MailBoxOutline, href: '/main/contact' },
      { name: 'Learn', icon: BookOpenOutline, href: '/main/learn' },
      { name: 'Profile', icon: UserOutline, href: '/main/profile' },
  ];

  let { data } = $props();

  let selectedTab = $state('Mission');
  let userIntels = $state(data.userIntels);

  function updateIntel(characterId: number, intelId: number) {
    userIntels[characterId][intelId] = true;
    userIntels = { ...userIntels };
  }

</script>

<!-- Content to display on screens 1024px wide or larger START-->
<div class="hidden lg:block">

  <Tabs tabStyle="underline">

      <!-- "Mission Briefing" Tab -->
      <TabItem open title="Mission Briefing">
          <div style="display: flex; align-items: center;">
              <ArrowUpRightFromSquareOutline/>
              <span style="margin-left: 0.5rem;">Click <a href="{data.campaign.Campaign_Information.Website}" target="_blank" rel="noopener noreferrer" style="color: blue;">here</a> to open the company website in a new tab.</span>
          </div>
          <div style="width: 75vw; margin: auto;">
              <!-- <GenericVideoCard src={data.campaign.Campaign_Information.Briefing_Video} /> -->
               <YoutubeVideoCard src={data.campaign.Campaign_Information.Briefing_Video} />
          </div>
          <p class="text-sm text-gray-500 dark:text-gray-400">
              <b>Intro Video:</b>
              Watch the video to learn more about {data.campaign.Campaign_Information.Name}.
          </p>

          <p class="text-sm text-gray-500 dark:text-gray-400">
              {data.campaign.Campaign_Information.Brief}
          </p>
      </TabItem>
      <TabItem title="Email">
          <Email messageData={data.messagesByCharacter} campaignId = {data.slug}></Email>
      </TabItem>

      <!-- "Main Dashboard" Tab -->
      <TabItem title="Main Dashboard">
          <div class="container" style="margin: auto; width:60vw;">
              <div class="wrap" style="display: inline-block; position: relative;">
                {#each data.campaign.Characters as character, index}
                  <div class="content">
                      <div class="block max-w-sm bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                          <GenericCharacterCard updateIntel={(updatedCharacterId: number, updatedIntelId: number) => {updateIntel(updatedCharacterId, updatedIntelId)}} character={character} campaignId={data.slug} characterProgress={data.progresses.characters[character.ID]} userIntels = {userIntels[character.ID]} />
                      </div>
                  </div>
                {/each}
              </div>
          </div>
      </TabItem>

      <!-- "Progress" Tab -->
      <TabItem title="Progress">
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
          <!-- First Character End -->
      </TabItem>

  </Tabs>
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
         <YoutubeVideoCard src={data.campaign.Campaign_Information.Briefing_Video} />
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
                    <GenericCharacterCard updateIntel={(updatedCharacterId: number, updatedIntelId: number) => {updateIntel(updatedCharacterId, updatedIntelId)}} character={character} campaignId={data.slug} characterProgress={data.progresses.characters[character.ID]} userIntels = {userIntels[character.ID]} />
                </div>
            </div>
        {/each}
      </div>

  {:else if selectedTab === 'Contact'}
    <Email messageData={data.messagesByCharacter} campaignId = {data.slug}></Email>

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


  <BottomNav position="fixed" classInner="grid-cols-4" activeUrl="/" style="bottom-0: left-0 right-0 z-10">
      <BottomNavItem btnName="Mission" on:click={() => selectedTab = 'Mission'}>
          <WalletSolid class="w-6 h-6 mb-1 text-gray-500 dark:text-gray-400 group-hover:text-primary-600 dark:group-hover:text-primary-500" />
      </BottomNavItem>
      <BottomNavItem btnName="Dashboard" on:click={() => selectedTab = 'Dashboard'}>
          <AdjustmentsVerticalOutline class="w-6 h-6 mb-1 text-gray-500 dark:text-gray-400 group-hover:text-primary-600 dark:group-hover:text-primary-500" />
      </BottomNavItem>
      <BottomNavItem btnName="Message" on:click={() => selectedTab = 'Contact'}>
          <PhoneOutline class="w-6 h-6 mb-1 text-gray-500 dark:text-gray-400 group-hover:text-primary-600 dark:group-hover:text-primary-500" />
      </BottomNavItem>
      <BottomNavItem btnName="Progress" on:click={() => selectedTab = 'Progress'}>
          <UserCircleSolid class="w-6 h-6 mb-1 text-gray-500 dark:text-gray-400 group-hover:text-primary-600 dark:group-hover:text-primary-500" />
      </BottomNavItem>
  </BottomNav>

</div>
<!-- Content to display on screens 1023px wide or smaller END-->