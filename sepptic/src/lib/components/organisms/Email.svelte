
<script lang="ts">
    import { EmailSidebar } from '$lib';
    import { EmailHeader } from "$lib";
    import { EmailList } from "$lib";
    import { EmailCompose } from "$lib";
    import { EmailView } from "$lib";

    let isComposing = $state(false);
    let selectedEmail = $state();

    let { messageData = {} } = $props<{ messageData: { [key: number]: any[] } }>();
    console.log(messageData);
</script>

<div class="flex h-screen">
    <EmailSidebar />
    <div class="flex flex-col flex-1">
        <EmailHeader />
        <EmailList on:select={(e) => selectedEmail = e.detail} />
        {#if selectedEmail}
            <EmailView email={selectedEmail} on:close={() => selectedEmail = null} />
        {/if}
        {messageData}
    </div>
</div>

{#if isComposing}
    <EmailCompose on:close={() => isComposing = false} />
{/if}