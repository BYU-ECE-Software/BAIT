<script>
    import { goto } from '$app/navigation';
    import { onMount } from 'svelte';

    // Redirect to /main when this page is loaded
    onMount(() => {
        goto('/main');
    });

</script>

