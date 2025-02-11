<script lang="ts">
    import { Card, Button } from 'flowbite-svelte';
</script>

<!--Desktop Campaign Card-->
<div class="mx-auto hidden lg:flex" style="max-width: 768px;">
    <Card img="/HackingCampaign.jpeg" class="w-[768px]">
        <h5 class="mb-2 text-[24px] font-bold tracking-tight text-gray-900 dark:text-white">
            Start a Campaign
        </h5>
        <p class="mb-3 text-[16px] font-normal text-gray-700 dark:text-gray-400 leading-[1.5]">
            Here you can pick between a few of our Social Engineering Campaign modules to become proficient in the art of Social Engineering.
        </p>
        <Button
                class="bg-seppticRed-600 hover:bg-seppticRed-700 text-white focus:ring-4 focus:ring-seppticRed-400 focus:outline-none w-full"
                href="/main/campaigns"
        >
            See Campaigns
        </Button>
    </Card>
</div>

<!--Mobile Campaign Card-->
<div class="mx-auto flex lg:hidden" style="width: 100vw;">
    <Card img="/HackingCampaign.jpeg" class="w-full">
        <h5 class="mb-2 text-[24px] font-bold tracking-tight text-gray-900 dark:text-white">
            Start a Campaign
        </h5>
        <p class="mb-3 text-[16px] font-normal text-gray-700 dark:text-gray-400 leading-[1.5]">
            Here you can pick between a few of our Social Engineering Campaign modules to become proficient in the art of Social Engineering.
        </p>
        <Button
                class="bg-seppticRed-600 hover:bg-seppticRed-700 text-white focus:ring-4 focus:ring-seppticRed-400 focus:outline-none w-full"
                href="/main/campaigns"
        >
            See Campaigns
        </Button>
    </Card>
</div>