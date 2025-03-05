<script lang="ts">
    import { Card, Button } from 'flowbite-svelte';
</script>

<div class="mx-auto" style="max-width: 768px;">
    <Card img="/SocialEngineering.jpeg" class="w-[768px]">
        <h5 class="mb-2 text-[24px] font-bold tracking-tight text-gray-900 dark:text-white">
            Learn Social Engineering
        </h5>
        <p class="mb-3 text-[16px] font-normal text-gray-700 dark:text-gray-400 leading-[1.5]">
            Here you can learn more about the art of Social Engineering to better help you tackle even our hardest Campaigns.
        </p>
        <Button
                class="dark:hover:bg-seppticOrange-700 bg-seppticOrange-600 dark:bg-seppticOrange-600 hover:bg-seppticOrange-700 text-white focus:outline-none w-full"
                href="/main/learn"
        >
            Learn Here  
        </Button>
    </Card>
</div>
