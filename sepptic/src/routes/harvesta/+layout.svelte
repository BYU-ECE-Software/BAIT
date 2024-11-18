<script lang="ts">
    export const reset = true;
    interface Props {
        children?: import('svelte').Snippet;
    }
    let { children }: Props = $props();

</script>

<main >
    <div style='margin-bottom: 3rem;'></div>

    {@render children?.()}
</main>