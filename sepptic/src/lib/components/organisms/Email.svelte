
<script>
    import { EmailSidebar } from '$lib';
    import { EmailHeader } from "$lib";
    import { EmailList } from "$lib";
    import { EmailCompose } from "$lib";
    import { EmailView } from "$lib";

    let isComposing = false;
    let selectedEmail = null;
</script>

<div class="flex h-screen">
    <EmailSidebar />
    <div class="flex flex-col flex-1">
        <EmailHeader />
        <EmailList on:select={(e) => selectedEmail = e.detail} />
        {#if selectedEmail}
            <EmailView email={selectedEmail} on:close={() => selectedEmail = null} />
        {/if}
    </div>
</div>

{#if isComposing}
    <EmailCompose on:close={() => isComposing = false} />
{/if}