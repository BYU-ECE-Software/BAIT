<script lang="ts">
    import { Card } from 'flowbite-svelte';
    import { AwardOutline, ArrowUpRightFromSquareOutline } from 'flowbite-svelte-icons';
    let { title = "title", description = "Description"}: {title: string, description: string} = $props();


</script>

<Card style="width: 10vw;">
    <div class="flex flex-col items-center">
        <h1>{title}</h1>
        <AwardOutline  class="w-8 h-8 mb-3 lg" />
        <p>{description}</p>
    </div>
</Card>

