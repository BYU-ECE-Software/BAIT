<script lang="ts">
    import { EmailSidebar } from "$lib";
    import { EmailHeader } from "$lib";
    import { EmailList } from "$lib";
    import { EmailCompose } from "$lib";
    import { EmailView } from "$lib";


    let isComposing = $state(false);
    let selectedTab = $state("inbox");

    let selectedThread = $state<{
        contact: string;
        characterId: number;
        messages: { sender: string; content: string; timestamp: string }[];
    } | null>(null);

    let { messageData = {}, campaignId } = $props<{
        messageData: { [key: string]: { id: number; messages: any[] } };
        campaignId: string;
    }>();

    function handleSelect(thread: any) {
        console.log("Selected thread (raw proxy):", thread);
        console.log("Selected thread (snapshot):", $state.snapshot(thread)); // ✅ Logs actual state

        if (thread && thread.contact && thread.messages) {
            selectedThread = null;  // Force reactivity
            setTimeout(() => {
                selectedThread = { ...thread };
                console.log("Updated selectedThread:", $state.snapshot(selectedThread)); // ✅ Check if updated
            }, 0);
        } else {
            console.error("Invalid thread selected:", thread);
        }
    }


    function handleCompose() {
        isComposing = true;
    }

    function handleSelectTab(tab: string) {
        selectedTab = tab;
    }

    function handleMessageSent(contact: string, newMessage: any) {
        console.log("New message received:", newMessage);

        if (messageData[contact]) {
            messageData[contact].messages.push(newMessage);
        }
    }
</script>

<div class="flex h-screen">
    <EmailSidebar onCompose={handleCompose} onSelectTab={handleSelectTab} />

    <div class="flex flex-col flex-1">
        <EmailHeader />

        {#if selectedTab === "inbox"}
            <EmailList messageData={messageData} onSelect={handleSelect} />
        {/if}

        {#if selectedThread}
            {#if selectedThread.contact}
                <p>Selected Thread: {selectedThread.contact}</p>
            {/if}
            <EmailView
                    thread={selectedThread}
                    campaignId={campaignId}
                    onClose={() => selectedThread = null}
                    onMessageSent={handleMessageSent}
            />
        {/if}

    </div>
</div>

{#if isComposing}
    <EmailCompose campaignId={campaignId} messageData={messageData} onClose={() => isComposing = false} />
{/if}
