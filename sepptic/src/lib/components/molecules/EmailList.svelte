<script lang="ts">
    // Define the expected message type
    type Message = {
        id: number;
        content: string;
    };

    // Define messageData structure
    type MessageData = {
        [key: string]: {
            id: number;
            inbox: Message[];
            sent: Message[];
        };
    };

    // Define props, ensuring TypeScript enforces the correct structure
    let { messageData = {}, onSelect } = $props<{
        messageData: MessageData, // ✅ Explicitly define the type
        onSelect: (email: { id: number; sender: string; characterId: number; preview: string }) => void;
    }>();

    // Ensure TypeScript understands the type of `messages`
    let emails = Object.entries(messageData).flatMap(([characterName, dataObj]) => {
        // ✅ Explicitly type `dataObj` as MessageData[key]
        const data = dataObj as MessageData[string];

        // ✅ Ensure `data.messages` exists
        if (!data || !Array.isArray(data.inbox)) {
            console.error(`Invalid data for character: ${characterName}`, data);
            return []; // Return empty array if data is malformed
        }

        return data.inbox.map((message) => ({
            id: message.id,
            sender: characterName, // Use character name as sender
            characterId: data.id, // ✅ Include character ID
            preview: message.content.slice(0, 50) + "..." // Display first 50 characters
        }));
    });

</script>

<div class="p-4">
    {#if emails.length > 0}
        {#each emails as email}
            <button type="button" class="p-2 border-b cursor-pointer w-full text-left"
                    onclick={() => onSelect(email)}>
                <strong>{email.sender}</strong> <br />
                <span class="text-gray-500">{email.preview}</span>
            </button>
        {/each}
    {:else}
        <p class="text-gray-500">No messages available.</p>
    {/if}
</div>
