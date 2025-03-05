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
            selectedThread = null;  // ✅ Force reactivity by resetting
            setTimeout(() => {
                selectedThread = JSON.parse(JSON.stringify(thread)); // ✅ Ensure deep reactivity update
                console.log("Updated selectedThread:", $state.snapshot(selectedThread));
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

        // ✅ Ensure messageData exists for the contact
        if (!messageData[contact]) {
            messageData[contact] = { id: newMessage.characterId, messages: [] };
        }

        // ✅ Update the messages array
        messageData[contact].messages = [...messageData[contact].messages, newMessage];

        // ✅ Update the UI preview in EmailList
        messageData = { ...messageData };  // 🔄 Forces reactivity

        // ✅ If the selected thread is open, update it instantly
        if (selectedThread && selectedThread.contact === contact) {
            selectedThread.messages = [...selectedThread.messages, newMessage];
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
            <div class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                <div class="bg-white w-[600px] max-h-[80vh] overflow-auto shadow-lg rounded-lg relative">
                    <!-- Close Button -->
                    <button class="absolute top-2 right-2 text-gray-600 hover:text-gray-900" onclick={() => selectedThread = null}>
                        <span class="material-icons text-lg">close</span>
                    </button>

                    <!-- EmailView Component -->
                    <EmailView
                            thread={selectedThread}
                            campaignId={campaignId}
                            onClose={() => selectedThread = null}
                            onMessageSent={handleMessageSent}
                    />
                </div>
            </div>
        {/if}


    </div>
</div>

{#if isComposing}
    <EmailCompose
            campaignId={campaignId}
            messageData={messageData}
            onClose={() => isComposing = false}
            onMessageSent={handleMessageSent}
    />
{/if}

