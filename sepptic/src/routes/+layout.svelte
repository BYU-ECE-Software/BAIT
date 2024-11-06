<script lang="ts">
	import '../app.css';
	import { onMount } from 'svelte';
	import { applyTheme } from '$lib/themes/theme';
	import type { CampaignName } from '$lib/themes/themeTypes';
	import { NavBar} from "$lib";

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
	<NavBar></NavBar>
	<slot></slot>
</main>

<style>
	main {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
		background-color: #ffffff;
		font-family: sans-serif;
		position: relative;
		padding: 2rem;
		align-items: center;
	}
	.banner-top {
		width: 100%;
		height: 60px;
		background-color: #d32f2f; /* Red color */
	}

	.banner-bottom {
		width: 100%;
		height: 100px;
		background: linear-gradient(to top right, #ffd966, #37474f, #d32f2f);
		clip-path: polygon(50% 0, 0% 100%, 100% 100%);
	}
</style>
