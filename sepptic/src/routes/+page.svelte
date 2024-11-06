<script lang="ts">
    // We can specify Components in the lib/index.ts file to be imported using an Alias! pretty cool
    import { CampaignCard } from '$lib';
    import { LearnCard } from '$lib';

</script>

<div class="flex flex-col md:flex-row items-center justify-center gap-6 w-full max-w-4xl mx-auto">
    <div class="w-full md:w-1/2 flex justify-center">
        <CampaignCard />
    </div>
    <div class="w-full md:w-1/2 flex justify-center">
        <LearnCard />
    </div>
</div>




