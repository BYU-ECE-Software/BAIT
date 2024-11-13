<script lang="ts">
	import '../app.css';
	import { onMount } from 'svelte';
	import { applyTheme } from '$lib/themes/theme';
	import type { CampaignName } from '$lib/themes/themeTypes';
	import { NavBar } from "$lib";
	import { AuthModalSwitcher } from "$lib";
	import {isAuthenticated} from "$lib/auth.svelte";
	import { DarkMode } from 'flowbite-svelte'
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

<main class="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 flex flex-col">
	<NavBar></NavBar>
	<div style='margin-bottom: 3rem;'></div>
	<AuthModalSwitcher open={formModal} />

	{@render children?.()}
</main>

<style>
</style>
