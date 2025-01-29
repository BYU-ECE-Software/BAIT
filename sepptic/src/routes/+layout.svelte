<script lang="ts">

    import '../app.css';
    import {isAuthenticated} from "$lib/auth.svelte";
    import {AuthModalSwitcher} from "$lib";
    import type { LayoutProps } from './$types';
    // Importing the data element from the LayoutProps from the +layout.server.ts page so we can load the data.
    let { data, children}: LayoutProps = $props();
    // let { isLoggedIn = false, children }: { isLoggedIn: boolean, children: () => any }: LayoutProps = $props();

    let formModal = $state(false);

    isAuthenticated.isAuthenticated = data.isLoggedIn;
    //If isLoggedIn is false then it will show the formModal.
    formModal = !data.isLoggedIn;

</script>

<main class="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 flex flex-col">

    <AuthModalSwitcher open={formModal} />

    {@render children?.()}
</main>
<style>
</style>


