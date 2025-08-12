<script lang="ts">
	import {
		WasteManagementCard,
		ComputerChipCoCard,
		GenericCampaignCard
	} from '$lib';
	export let data;
</script>

<div class="mx-auto flex w-full max-w-4xl flex-col items-center justify-center gap-6 md:flex-row">
	{#each data.campaigns as campaign, index}
		<div class="flex w-full justify-center md:w-1/2">
			<GenericCampaignCard
				name={campaign.name}
				description={campaign.description}
				image={campaign.image}
				campaignId={campaign.id}
			/>
		</div>
	{/each}
</div>