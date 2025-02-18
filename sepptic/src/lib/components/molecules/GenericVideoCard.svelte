<script lang="ts">
    import { Video } from 'flowbite-svelte';
    let {src = "Not Initialized Yet"}: {src: string} = $props();

</script>

<Video src={src} controls class="w-full max-w-full h-auto" />