
<script lang="ts">
    export let email;
</script>

<div class="p-4 border-l w-full">
    <h2 class="text-lg font-bold">{email.subject}</h2>
    <p>From: {email.sender}</p>
    <p>{email.preview}</p>
    <button class="mt-4 bg-red-500 text-white p-2" on:click={() => email = null}>Close</button>
</div>