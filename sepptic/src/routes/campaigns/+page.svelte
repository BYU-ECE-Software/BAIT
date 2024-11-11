<script lang="ts">
    import { CampaignCard, HarvestaFoodsCard, WasteManagementCard, ComputerChipCoCard } from '$lib';

</script>

<div class="flex flex-col md:flex-row items-center justify-center gap-6 w-full max-w-4xl mx-auto">
    <div class="w-full md:w-1/2 flex justify-center">
        <WasteManagementCard />
    </div>
    <div class="w-full md:w-1/2 flex justify-center">
        <HarvestaFoodsCard />
    </div>
    <div class="w-full md:w-1/2 flex justify-center">
        <ComputerChipCoCard />
    </div>
</div>

