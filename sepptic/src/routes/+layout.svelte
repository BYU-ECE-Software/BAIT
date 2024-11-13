<script lang="ts">
    import '../app.css';
	import {onMount} from "svelte";
    import {isAuthenticated} from "$lib/auth.svelte";
    import {AuthModalSwitcher} from "$lib";

    let formModal = $state(false);
    let { children } = $props();

    onMount(() => {
        if (!isAuthenticated.isAuthenticated){
            formModal = true;
        }
    });
</script>

<main class="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 flex flex-col">

    <AuthModalSwitcher open={formModal} />

    {@render children?.()}
</main>
<style>
</style>
