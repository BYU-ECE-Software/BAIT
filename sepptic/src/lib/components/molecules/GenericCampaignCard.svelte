<script>
	import { Card, Button } from 'flowbite-svelte';
	export let name;
	export let image;
	export let description;
	export let campaignId;
</script>

<div class="mx-auto w-full max-w-3xl">
	<Card img={image} class="w-full">
		<h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
			{name}
		</h5>
		<p class="mb-3 font-normal leading-tight text-gray-700 dark:text-gray-400">
			{description}
		</p>
		<Button
			href="/campaign"
			on:click={() => {
				localStorage.setItem('campaignId', campaignId);
			}}
			class="bg-seppticRed-600 hover:bg-seppticRed-700 focus:ring-seppticRed-400 w-full text-white focus:outline-none focus:ring-4 "
		>
			Play
		</Button>
	</Card>
</div>
