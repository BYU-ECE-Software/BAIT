<script lang="ts">
    type Message = {
        id: number;
        content: string;
        timestamp: string;
        sender: string;
    };

    type MessageThread = {
        contact: string;
        characterId: number;
        messages: Message[];
    };

    type MessageData = {
        [key: string]: {
            id: number;
            messages: { role: string; content: string; timestamp: string }[];
        };
    };

    let { messageData = {}, onSelect } = $props<{
        messageData: MessageData;
        onSelect: (thread: MessageThread) => void;
    }>();

    // Format the message data into threads
    let threads = Object.entries(messageData).map(([contact, data]) => ({
    contact,
    characterId: data.id,
    messages: data.messages.map(m => ({
        id: m.id,
        sender: m.role === "user" ? "You" : contact,  // ✅ Ensures correct sender
        content: m.content,
        timestamp: m.timestamp
    }))
}));


</script>

<div class="p-4">
    {#if threads.length > 0}
        {#each threads as thread}
            <button
                    type="button"
                    class="p-2 border-b cursor-pointer w-full text-left hover:bg-gray-200"
                    onclick={() => onSelect({ ...thread })}
            >
                <strong>{thread.contact}</strong>
                <br />
                <span class="text-gray-500">{thread.messages[thread.messages.length - 1]?.content.slice(0, 50)}...</span>
            </button>
        {/each}
    {:else}
        <p class="text-gray-500">No messages available.</p>
    {/if}
</div>
