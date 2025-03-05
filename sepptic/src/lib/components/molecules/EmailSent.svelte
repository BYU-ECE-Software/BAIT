<script lang="ts">
    import { onMount } from "svelte";

    let { messageData = {}, campaignId } = $props<{
        messageData: { [key: string]: { id: number; inbox: any[]; sent: any[] } };
        campaignId: number;
    }>();

    type Message = {
        id: number;
        recipient: string;
        characterId: number;
        content: string;
        timestamp: string;
    };

    type MessageThread = {
        recipient: string;
        characterId: number;
        messages: Message[];
    };

    let messageThreads: MessageThread[] = $state([]);
    let isLoading = $state(true);
    let errorMessage = $state("");
    let selectedThread: MessageThread | null = $state(null);
    let replyContent = $state("");

    async function fetchMessageThreads() {
        try {
            isLoading = true;
            const threadMap = new Map<string, MessageThread>();

            Object.entries(messageData).forEach(([characterName, data]) => {
                if (!threadMap.has(characterName)) {
                    threadMap.set(characterName, {
                        recipient: characterName,
                        characterId: data.id,
                        messages: [],
                    });
                }
                const thread = threadMap.get(characterName)!;
                data.sent.forEach(msg => {
                    thread.messages.push({
                        id: msg.id,
                        recipient: characterName,
                        characterId: data.id,
                        content: msg.content,
                        timestamp: msg.timestamp
                    });
                });
                thread.messages.sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());
            });

            messageThreads = Array.from(threadMap.values());
            console.log("Grouped Threads:", messageThreads);
        } catch (error) {
            console.error("Error fetching message threads:", error);
            errorMessage = "Failed to load message threads.";
        } finally {
            isLoading = false;
        }
    }

    function openThread(thread: MessageThread) {
        selectedThread = thread;
        replyContent = "";
    }

    function closeThread() {
        selectedThread = null;
    }

    function sendReply() {
        if (!selectedThread || !replyContent.trim()) return;

        const newMessage: Message = {
            id: Date.now(), // Temporary ID
            recipient: selectedThread.recipient,
            characterId: selectedThread.characterId,
            content: replyContent,
            timestamp: new Date().toISOString(),
        };

        selectedThread.messages.push(newMessage);
        replyContent = "";
    }

    onMount(fetchMessageThreads);
</script>

<!-- UI -->
<div class="p-4">
    <h2 class="text-lg font-medium mb-3">Message Threads</h2>

    {#if isLoading}
        <p>Loading message threads...</p>
    {:else if errorMessage}
        <p class="text-red-500">{errorMessage}</p>
    {:else if messageThreads.length === 0}
        <p class="text-gray-500">No message threads found.</p>
    {:else}
        {#each messageThreads as thread}
            <div class="p-3 border-b cursor-pointer hover:bg-gray-100" onclick={() => openThread(thread)}>
                <strong>To: {thread.recipient}</strong>
                <div class="text-gray-600 text-sm">
                    {thread.messages[thread.messages.length - 1]?.content.slice(0, 50)}...
                </div>
                <div class="text-xs text-gray-400">
                    Last message: {new Date(thread.messages[thread.messages.length - 1]?.timestamp).toLocaleString()}
                </div>
            </div>
        {/each}
    {/if}
</div>

<!-- Thread View Modal -->
{#if selectedThread}
    <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
        <div class="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
            <h3 class="text-lg font-semibold">Thread with {selectedThread.recipient}</h3>
            <div class="mt-4 max-h-60 overflow-y-auto border p-3">
                {#each selectedThread.messages as msg}
                    <div class="mb-2">
                        <div class="text-gray-700">{msg.content}</div>
                        <div class="text-xs text-gray-500">{new Date(msg.timestamp).toLocaleString()}</div>
                    </div>
                {/each}
            </div>
            <textarea
                    class="w-full mt-4 p-2 border rounded"
                    placeholder="Write a reply..."
                    bind:value={replyContent}
            ></textarea>
            <div class="mt-4 flex justify-end">
                <button class="bg-gray-500 text-white px-4 py-2 rounded mr-2" onclick={closeThread}>
                    Close
                </button>
                <button class="bg-blue-500 text-white px-4 py-2 rounded" onclick={sendReply}>
                    Send Reply
                </button>
            </div>
        </div>
    </div>
{/if}
