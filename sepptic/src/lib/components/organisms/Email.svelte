<script lang="ts">
    import { EmailSidebar } from "$lib";
    import { EmailHeader } from "$lib";
    import { EmailList } from "$lib";
    import { EmailSent } from "$lib";  // ✅ Import Sent Messages Component
    import { EmailCompose } from "$lib";
    import { EmailView } from "$lib";

    let isComposing = $state(false);
    let selectedEmail = $state();
    let activeTab = $state("inbox"); // ✅ Track which tab is active

    let { messageData = {}, campaignId } = $props<{
        messageData: { [key: string]: { id: number, inbox: any[], messages: any[] } };
        campaignId: string; // ✅ Ensure campaignId is properly typed
    }>();

    function handleSelect(email: any) {
        selectedEmail = email;
    }

    function handleCompose() {
        isComposing = true;
    }

    function switchTab(tab: string) {
        activeTab = tab; // ✅ Update active tab
    }
</script>

<div class="flex h-screen">
    <!-- Sidebar now switches tabs -->
    <EmailSidebar onCompose={handleCompose} onSelectTab={switchTab} />

    <div class="flex flex-col flex-1">
        <EmailHeader />

        {#if activeTab === "inbox"}
            <EmailList messageData={messageData} onSelect={handleSelect} />
        {:else if activeTab === "sent"}
            <EmailSent messageData={messageData} campaignId={campaignId} />
        {/if}

        {#if selectedEmail}
            <EmailView email={selectedEmail} on:close={() => selectedEmail = null} />
        {/if}
    </div>
</div>

{#if isComposing}
    <EmailCompose campaignId={campaignId} messageData={messageData} onClose={() => isComposing = false} />
{/if}
