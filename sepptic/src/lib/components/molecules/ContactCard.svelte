<script lang="ts">
    import { Card, Button } from 'flowbite-svelte';
</script>

<div class="mx-auto" style="max-width: 768px;">
    <Card img="/Contact.png" class="w-[768px]">
        <h5 class="mb-2 text-[24px] font-bold tracking-tight text-gray-900 dark:text-white">
            Contact The Developers
        </h5>
        <p class="mb-3 text-[16px] font-normal text-gray-700 dark:text-gray-400 leading-[1.5]">
            Reach out to the developers about questions, report bugs, or provide feedback on the BAIT platform
        </p>
        <Button
            class="bg-seppticRed-600 hover:bg-seppticRed-700 text-white focus:ring-4 focus:ring-seppticRed-400 focus:outline-none w-full"
            href="/main/contact">
            Contact  
        </Button>
    </Card>
</div>
