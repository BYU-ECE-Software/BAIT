<script lang="ts">

    import { NavBar } from "$lib";
    interface Props {
        children?: import('svelte').Snippet;
    }

    let { children }: Props = $props();


</script>

<main >
    <NavBar></NavBar>
    <div style='margin-bottom: 3rem;'></div>

    {@render children?.()}
</main>

<style>
</style>
