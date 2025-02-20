<script lang="ts">
    import { createEventDispatcher } from "svelte";
    const dispatch = createEventDispatcher();
</script>

<div class="absolute top-10 left-1/2 transform -translate-x-1/2 bg-white p-4 shadow-lg w-96">
    <h2 class="text-lg font-bold">New Message</h2>
    <input class="w-full p-2 border mb-2" type="text" placeholder="To">
    <input class="w-full p-2 border mb-2" type="text" placeholder="Subject">
    <textarea class="w-full p-2 border mb-2" placeholder="Message"></textarea>
    <button class="bg-blue-500 text-white p-2" on:click={() => dispatch('close')}>Send</button>
    <button class="p-2" on:click={() => dispatch('close')}>Close</button>
</div>