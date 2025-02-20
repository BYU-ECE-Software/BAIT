
<script lang="ts">
    import { createEventDispatcher } from "svelte";
    const dispatch = createEventDispatcher();

    let emails = [
        { id: 1, sender: "Alice", subject: "Hello", preview: "How are you?" },
        { id: 2, sender: "Bob", subject: "Meeting", preview: "Let's schedule a time." }
    ];
</script>

<div class="p-4">
    {#each emails as email}
        <div class="p-2 border-b cursor-pointer" on:click={() => dispatch('select', email)}>
            <strong>{email.sender}</strong> - {email.subject}
            <p class="text-gray-500">{email.preview}</p>
        </div>
    {/each}
</div>