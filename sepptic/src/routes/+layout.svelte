<script lang="ts">

    import '../app.css';
	import {onMount} from "svelte";
    import {isAuthenticated} from "$lib/auth.svelte";
    import {AuthModalSwitcher} from "$lib";
    import type { LayoutProps } from './$types';
    // Importing the data element from the LayoutProps from the +layout.server.ts page so we can load the data.
    let { data, children}: LayoutProps = $props();
    // let { isLoggedIn = false, children }: { isLoggedIn: boolean, children: () => any }: LayoutProps = $props();

    onMount(() => {
        isAuthenticated.isAuthenticated = data.isLoggedIn ?? false;
        //If the isLoggedIn is false then it will show the formModal.
    });

</script>

<main class="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 flex flex-col">

    <AuthModalSwitcher open={!isAuthenticated.isAuthenticated} />

    {@render children?.()}
</main>
<style>
</style>


