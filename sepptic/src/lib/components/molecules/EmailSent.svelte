<script lang="ts">
    import { onMount } from "svelte";

    let { messageData = {}, campaignId } = $props<{
        messageData: { [key: string]: { id: number; inbox: any[], sent: any[] } };
        campaignId: number;
    }>();

    type SentMessage = {
        id: number;
        recipient: string;
        characterId: number;
        content: string;
        timestamp: string;
    };



    let sentMessages: SentMessage[] = [];
    let isLoading = $state(true);
    let errorMessage = $state("");
    let selectedMessage: SentMessage | null = $state(null); // ✅ Store selected message

    async function fetchSentMessages() {
        try {
            sentMessages = [];
            isLoading = true;

            sentMessages = Object.entries(messageData).flatMap(([characterName, data]) =>
                data.sent.map(msg => ({
                    id: msg.id,
                    recipient: characterName,
                    characterId: data.id,
                    content: msg.content,
                    timestamp: msg.timestamp
                }))
            );

            console.log("Fetched Sent Messages:", sentMessages);
        } catch (error) {
            console.error("Error fetching sent messages:", error);
            errorMessage = "Failed to load sent messages.";
        } finally {
            isLoading = false;
        }
    }

    function selectMessage(message: SentMessage) {
        selectedMessage = message;
    }

    function closeMessageView() {
        selectedMessage = null;
    }

    onMount(fetchSentMessages);
</script>

<!-- UI -->
<div class="p-4">
    <h2 class="text-lg font-medium mb-3">Sent Messages</h2>

    {#if isLoading}
        <p>Loading sent messages...</p>
    {:else if errorMessage}
        <p class="text-red-500">{errorMessage}</p>
    {:else if sentMessages.length === 0}
        <p class="text-gray-500">No sent messages found.</p>
    {:else}
        {#each sentMessages as message}
            <div class="p-3 border-b cursor-pointer hover:bg-gray-100" onclick={() => selectMessage(message)}>
                <strong>To: {message.recipient}</strong> <br />
                <span class="text-gray-600 text-sm">{message.content.slice(0, 50)}...</span>
                <div class="text-xs text-gray-400">{new Date(message.timestamp).toLocaleString()}</div>
            </div>
        {/each}
    {/if}
</div>

<!-- Message View Modal -->
{#if selectedMessage}
    <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
        <div class="bg-white p-6 rounded-lg shadow-lg max-w-lg">
            <h3 class="text-lg font-semibold">To: {selectedMessage.recipient}</h3>
            <p class="mt-2 text-gray-700">{selectedMessage.content}</p>
            <div class="text-xs text-gray-500 mt-4">
                Sent: {new Date(selectedMessage.timestamp).toLocaleString()}
            </div>
            <button class="mt-4 bg-blue-500 text-white px-4 py-2 rounded" onclick={closeMessageView}>
                Close
            </button>
        </div>
    </div>
{/if}
