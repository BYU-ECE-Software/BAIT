<script>
    import { Card, Button } from 'flowbite-svelte';
    import { ArrowRightOutline } from 'flowbite-svelte-icons';

</script>

<div  class="w-full max-w-3xl mx-auto">
    <Card img="/HackingCampaign.jpeg" class="w-full">
        <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Start A Campaign</h5>
        <p class="mb-3 font-normal text-gray-700 dark:text-gray-400 leading-tight">Here you can pick between a few of our Social Engineering Campaign modules to become proficient in the art of Social Engineering.</p>
        <Button class="bg-seppticRed-600 hover:bg-seppticRed-700 text-white focus:ring-4 focus:ring-seppticRed-400 focus:outline-none ">
            Begin Adventure <ArrowRightOutline class="w-6 h-6 ms-2 text-white " />
        </Button>
    </Card>

</div>