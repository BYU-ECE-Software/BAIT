<script>
    import { Card, Button } from 'flowbite-svelte';
    import { ArrowRightOutline } from 'flowbite-svelte-icons';

</script>

<div  class="w-full max-w-3xl mx-auto">
    <Card img="/SocialEngineering.jpeg" class="w-full">
        <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Learn Social Engineering</h5>
        <p class="mb-3 font-normal text-gray-700 dark:text-gray-400 leading-tight">Here you can learn more about the art of Social Engineering to better help you with tackle even our hardest Campaigns.</p>
        <Button class="bg-seppticOrange-600 hover:bg-seppticOrange-700 text-white focus:ring-4 focus:ring-seppticOrange-400 focus:outline-none">
            Learn Here <ArrowRightOutline class="w-6 h-6 ms-2 text-white " />
        </Button>
    </Card>

</div>