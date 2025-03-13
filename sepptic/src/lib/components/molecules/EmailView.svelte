<script lang="ts">

    import { onDestroy, onMount } from "svelte";

    onMount(() => {
        console.log("EmailView thread received:", thread);
        console.log("EmailView mounted:", $state.snapshot(thread));
    });

    onDestroy(() => {
        console.log("EmailView unmounted!");
    });

    type Message = {
        id: number;
        recipient: string;
        characterId: number;
        content: string;
        timestamp: string;
    };

    let { thread, campaignId, onClose, onMessageSent } = $props<{
        thread: { contact: string; characterId: number; messages: { sender: string; content: string; timestamp: string }[] };
        campaignId: string | number;
        onClose: () => void;
        onMessageSent: (contact: string, newMessage: Message) => void;
    }>();

    // ✅ Ensure campaignId is always a number
    let campaignIdNum = typeof campaignId === "string" ? parseInt(campaignId, 10) : campaignId;

    let replyContent = $state("");

    async function sendReply() {
    if (!replyContent.trim() || !thread.characterId) return;

    try {
        let response = await fetch("/api/message", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify({
                campaignId: campaignIdNum,
                characterId: thread.characterId,
                message: replyContent.trim(),
                role: "user"
            })
        });

        let responseText = await response.text();
        let responseData;

        try {
            responseData = JSON.parse(responseText);
        } catch (error) {
            console.warn("Response is not JSON, assuming it's a bot reply:", responseText);
            responseData = { content: responseText };
        }

        if (!response.ok) {
            console.error("API Error:", responseData);
            throw new Error(`Failed to send message: ${responseData.message || responseText}`);
        }

        const newMessage = {
            id: Date.now(),
            sender: "You",
            content: replyContent.trim(),
            timestamp: new Date().toISOString(),
        };

        // ✅ Call onMessageSent instead of directly modifying thread.messages
        onMessageSent(thread.contact, newMessage);

        // ✅ Clear input field
        replyContent = "";

        // ✅ Handle AI reply (if applicable)
        if (responseData.content) {
            const aiMessage = {
                id: Date.now() + 1,
                sender: thread.contact,
                content: responseData.content,
                timestamp: new Date().toISOString(),
            };

            setTimeout(() => {
                onMessageSent(thread.contact, aiMessage);
            }, 1000);
        }

    } catch (error) {
        console.error("Error sending reply:", error);
    }
}



</script>

<div class="p-4 flex flex-col flex-grow">
    <h2 class="text-lg font-semibold mb-2">{thread.contact}</h2>

    <div class="overflow-y-auto max-h-[400px] border rounded p-2 bg-gray-50">
        {#each thread.messages as message}
            <div class="mb-2 p-2 {message.sender === 'You' ? 'text-right bg-blue-100' : 'bg-gray-200'} rounded">
                <p class="text-sm"><strong>{message.sender}:</strong> {message.content}</p>
                <p class="text-xs text-gray-500">{message.timestamp}</p>
            </div>
        {/each}
    </div>

    <!-- Reply Input -->
    <div class="mt-4">
        <textarea bind:value={replyContent} placeholder="Reply..." class="w-full p-2 border rounded"></textarea>
        <button class="mt-2 bg-blue-500 text-white px-4 py-2 rounded" onclick={sendReply}>
            Send Reply
        </button>
    </div>
</div>
