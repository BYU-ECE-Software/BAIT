<script>
    import { Card } from 'flowbite-svelte';
    import { AwardOutline, ArrowUpRightFromSquareOutline } from 'flowbite-svelte-icons';
    export let title = "Title";
    export let description = "Description";
</script>

<Card style="width: 10vw;">
    <div class="flex flex-col items-center">
        <h1>{title}</h1>
        <AwardOutline  class="w-8 h-8 mb-3 lg" />
        <p>{description}</p>
    </div>
</Card>

