<script lang="ts">
	import '../app.css';
	import { onMount } from 'svelte';
	import { applyTheme } from '$lib/themes/theme';
	import type { CampaignName } from '$lib/themes/themeTypes';
	import { NavBar } from "$lib";
	import { AuthModalSwitcher } from "$lib";
	import {isAuthenticated} from "$lib/auth.svelte";
	interface Props {
		children?: import('svelte').Snippet;
	}
	let formModal = $state(false);
	let { children }: Props = $props();

	let selectedTheme: CampaignName = 'default';

	// Apply theme only after component is mounted (browser only)
	onMount(() => {
		if (!isAuthenticated.isAuthenticated){
			formModal = true;
		}
	});

	// Function to switch themes dynamically
	function switchTheme(campaign: CampaignName) {
		selectedTheme = campaign;
		applyTheme(selectedTheme);
	}
</script>

<main>
	<NavBar></NavBar>
	<AuthModalSwitcher open={formModal} />

	{@render children?.()}
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
</style>
