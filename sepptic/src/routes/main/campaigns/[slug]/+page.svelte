<script>
  import { Avatar, Tabs, TabItem, Card, Progressbar, Listgroup, BottomNav, BottomNavItem } from 'flowbite-svelte';
  import { UserCircleOutline, BadgeCheckOutline, ArrowUpRightFromSquareOutline, HomeOutline, InfoCircleOutline, OpenDoorOutline, MailBoxOutline, BookOpenOutline, UserOutline, HomeSolid, WalletSolid, AdjustmentsVerticalOutline, UserCircleSolid, AwardOutline, PhoneOutline } from 'flowbite-svelte-icons';
  import {GenericVideoCard, GenericCharacterCard, HarvestaVideoPlayer, AnnGunnSmallCard, DonDraperSmallCard, ElaraSmallCard, TonyFlaggSmallCard,  AchievementCard, SecurityTeamSmallCard, CampaignButton} from '$lib';

  let icons = [
      { name: 'Home', icon: HomeOutline, href:`/` },
      { name: 'About', icon: InfoCircleOutline, href:`/main/about`},
      { name: 'Campaigns', icon: OpenDoorOutline, href: '/main/campaigns' },
      { name: 'Contact', icon: MailBoxOutline, href: '/main/contact' },
      { name: 'Learn', icon: BookOpenOutline, href: '/main/learn' },
      { name: 'Profile', icon: UserOutline, href: '/main/profile' },
  ];

  export let data;
  let selectedTab = 'Home';
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
              <GenericVideoCard src="{data.campaign.Campaign_Information.Briefing_Video}" />
          </div>
          <p class="text-sm text-gray-500 dark:text-gray-400">
              <b>Intro Video:</b>
              Watch the video to learn more about {data.campaign.Campaign_Information.Name}.
          </p>

          <p class="text-sm text-gray-500 dark:text-gray-400">
              {data.campaign.Campaign_Information.Description}
          </p>
      </TabItem>

      <!-- "Main Dashboard" Tab -->
      <TabItem title="Main Dashboard">
          <div class="container" style="margin: auto; width:60vw;">
              <div class="wrap" style="display: inline-block; position: relative;">
                {#each data.campaign.Characters as character, index}
                  <div class="content">
                      <div class="block max-w-sm bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                          <GenericCharacterCard character={character} campaignId={data.slug} characterProgress={data.progresses.characters[character.ID]} userIntels = {data.userIntels[character.ID]} />
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
                    {#if data.userIntels[character.ID][intel.Intel_ID]}
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

  <!-- "Home" or "Site Navigation" Tab Content -->
  {#if selectedTab === 'Home'}
      <h1 style="display: flex; justify-content: center; padding-bottom: 1rem;" class="">Click the links below to navigate to other pages from the main site in a new tab. Make sure to save your progress before clicking.</h1>
      <div style="display: flex; justify-content: center;">
          <Listgroup active items={icons} let:item class="w-48">
              <a href={item.href} target="_blank" rel="noopener noreferrer" class="flex items-center" style="font-size: medium;">
                  <svelte:component this={item.icon} class="w-4 h-4 me-2.5"/>
                  {item.name}
              </a>
          </Listgroup>
      </div>

      <!-- "Mission" or "Briefing" Tab Content -->
  {:else if selectedTab === 'Mission'}
      <div style="display: flex; align-items: center;">
          <ArrowUpRightFromSquareOutline/>
          <span style="margin-left: 0.5rem;">Click <a href="/harvesta/harvestasite" target="_blank" rel="noopener noreferrer" style="color: blue;">here</a> to open the company website in a new tab.</span>
      </div>
      <div style="width: 75vw; margin: auto;">
          <HarvestaVideoPlayer />
      </div>
      <p class="text-sm text-gray-500 dark:text-gray-400">
          <b>Intro Video:</b>
          Watch the video to learn more about Harvesta Foods and their expansion efforts.
      </p>

      <p class="text-sm text-gray-500 dark:text-gray-400">
          Read this text to learn more about Harvesta Foods and their expansion efforts, the background of your pen testing job, rules of engagement, background information, recommendations on where to start, what to look for, and most importantly, which days to bring donuts into the office.
      </p>

      <!-- "Dashboard" Tab Content -->
  {:else if selectedTab === 'Dashboard'}
      <div>
          <div class="content">
              <div class="block max-w-sm bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                  <ElaraSmallCard />
              </div>
          </div>
          <div class="content">
              <div class="block max-w-sm bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                  <TonyFlaggSmallCard />
              </div>
          </div>
          <div class="content" >
              <div class="block max-w-sm bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                  <DonDraperSmallCard />
              </div>
          </div>
          <div class="content" >
              <div class="block max-w-sm bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                  <SecurityTeamSmallCard />
              </div>
          </div>
          <div class="content">
              <div class="block max-w-sm bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                  <AnnGunnSmallCard />
              </div>
          </div>
      </div>

      <!-- "Contact" Tab Content -->
  {:else if selectedTab === 'Contact'}
      <p>Contact content goes here.</p>

      <!-- "Progress" Tab Content -->
  {:else if selectedTab === 'Progress'}
      <div class="flex space-x-4" style="padding: 1rem; margin-top: 1rem;">
          <div class="flex items-center space-x-4 rtl:space-x-reverse" style="margin: auto; width:60vw;">
              <Avatar>
                  <UserCircleOutline />
              </Avatar>
              <div class="space-y-1 font-medium dark:text-white">
                  <div>Jese Leos</div>
                  <div class="text-sm text-gray-500 dark:text-gray-400">Joined in August 2014</div>
              </div>
          </div>
      </div>
      <div class="grid gap-4 w-full" style="padding: 1rem; margin-bottom: 1rem;">
          <div class="flex overflow-x-auto space-x-4 w-full" style="padding: 1rem; margin-bottom: 1rem;">
              <Card style="width: 30vw;">
                  <div class="flex flex-col items-center">
                      <AwardOutline class="w-8 h-8 mb-3 lg" />
                  </div>
              </Card>
              <Card style="width: 30vw;">
                  <div class="flex flex-col items-center">
                      <AwardOutline class="w-8 h-8 mb-3 lg" />
                  </div>
              </Card>
              <Card style="width: 30vw;">
                  <div class="flex flex-col items-center">
                      <AwardOutline class="w-8 h-8 mb-3 lg" />
                  </div>
              </Card>
              <Card style="width: 30vw;">
                  <div class="flex flex-col items-center">
                      <AwardOutline class="w-8 h-8 mb-3 lg" />
                  </div>
              </Card>
              <Card style="width: 30vw;">
                  <div class="flex flex-col items-center">
                      <AwardOutline class="w-8 h-8 mb-3 lg" />
                  </div>
              </Card>
              <Card style="width: 30vw;">
                  <div class="flex flex-col items-center">
                      <AwardOutline class="w-8 h-8 mb-3 lg" />
                  </div>
              </Card>
              <Card style="width: 30vw;">
                  <div class="flex flex-col items-center">
                      <AwardOutline class="w-8 h-8 mb-3 lg" />
                  </div>
              </Card>

          </div>
      </div>
      Progress
      <div class="flex space-x-4" style="padding: 1rem; margin-top: 1rem;">
          <Progressbar progress="50" size="h-4" labelInside/>
      </div>
      <!-- First Character Begin -->
      <hr class="my-4">
      <div class="flex space-x-4" style="padding: 1rem; margin-top: 1rem;">
          <Avatar>
              <img src="/DonDraperAvatar.jpg" alt="Project manager headshot">
          </Avatar>
          <div class="space-y-1 font-medium dark:text-white" style="width: 250px;">
              <div>Don Draper</div> <!-- First Character Name -->
              <div class="text-sm text-gray-500 dark:text-gray-400">Project Manager</div> <!-- First Character Job Title -->
          </div>
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
      <!-- First Character End -->
      <!-- Second Character Begin -->
      <hr class="my-4">
      <div class="flex space-x-4" style="padding: 1rem; margin-top: 1rem; ">
          <Avatar>
              <img src="/ElaraAIAvatar.jpg" alt="Receptionist headshot">
          </Avatar>
          <div class="space-y-1 font-medium dark:text-white" style="width: 250px;">
              <div>Elara Arale</div> <!-- Second Character Name -->
              <div class="text-sm text-gray-500 dark:text-gray-400">Receptionist</div> <!-- Second Character Job Title -->
          </div>
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
  {/if}

  <BottomNav position="fixed" classInner="grid-cols-5" activeUrl="/" style="bottom-0: left-0 right-0 z-10">
      <BottomNavItem btnName="Home" on:click={() => selectedTab = 'Home'}>
          <HomeSolid class="w-6 h-6 mb-1 text-gray-500 dark:text-gray-400 group-hover:text-primary-600 dark:group-hover:text-primary-500" />
      </BottomNavItem>
      <BottomNavItem btnName="Mission" on:click={() => selectedTab = 'Mission'}>
          <WalletSolid class="w-6 h-6 mb-1 text-gray-500 dark:text-gray-400 group-hover:text-primary-600 dark:group-hover:text-primary-500" />
      </BottomNavItem>
      <BottomNavItem btnName="Dashboard" on:click={() => selectedTab = 'Dashboard'}>
          <AdjustmentsVerticalOutline class="w-6 h-6 mb-1 text-gray-500 dark:text-gray-400 group-hover:text-primary-600 dark:group-hover:text-primary-500" />
      </BottomNavItem>
      <BottomNavItem btnName="Contact" on:click={() => selectedTab = 'Contact'}>
          <PhoneOutline class="w-6 h-6 mb-1 text-gray-500 dark:text-gray-400 group-hover:text-primary-600 dark:group-hover:text-primary-500" />
      </BottomNavItem>
      <BottomNavItem btnName="Progress" on:click={() => selectedTab = 'Progress'}>
          <UserCircleSolid class="w-6 h-6 mb-1 text-gray-500 dark:text-gray-400 group-hover:text-primary-600 dark:group-hover:text-primary-500" />
      </BottomNavItem>
  </BottomNav>
</div>
<!-- Content to display on screens 1023px wide or smaller END-->