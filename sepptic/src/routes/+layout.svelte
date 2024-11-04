<script lang="ts">
	import { onMount } from 'svelte';
	import { applyTheme } from '$lib/themes/theme';
	import type { CampaignName } from '$lib/themes/themeTypes';

	let selectedTheme: CampaignName = 'default';

	// Apply theme only after component is mounted (browser only)
	onMount(() => {
		applyTheme(selectedTheme);
	});

	// Function to switch themes dynamically
	function switchTheme(campaign: CampaignName) {
		selectedTheme = campaign;
		applyTheme(selectedTheme);
	}
</script>

<main>
	<button on:click={() => switchTheme('campaign1')}>Campaign 1</button>
	<button on:click={() => switchTheme('campaign2')}>Campaign 2</button>
	<button on:click={() => switchTheme('default')}>Default</button>

	<slot />
</main>
