<script lang="ts">
    let { messageData = {}, campaignId, onClose, onMessageSent } = $props<{
        messageData: { [key: string]: { id: number, inbox: any[], messages: any[] } };
        campaignId: string | number;
        onClose: () => void;
        onMessageSent: (contact: string, newMessage: any) => void;  // ✅ Add this prop
    }>();


    let messageText = $state("");
    let filteredRecipients: string[] = $state([]);
    let showSuggestions = $state(false);
    let isMinimized = $state(false);
    let isFullscreen = $state(false);

    let recipient = $state("");  // Stores the selected character name
    let recipientId = $state(null);  // Stores the selected character ID

    // ✅ Ensure campaignId is always a number
    let campaignIdNum = typeof campaignId === "string" ? parseInt(campaignId, 10) : campaignId;

    let recipients = Object.keys(messageData);

    function filterRecipients() {
        if (recipient.trim() === "") {
            showSuggestions = false;
            return;
        }
        filteredRecipients = recipients.filter(name =>
            name.toLowerCase().includes(recipient.toLowerCase())
        );
        showSuggestions = filteredRecipients.length > 0;
    }

    function selectRecipient(name: string) {
        recipient = name;
        recipientId = messageData[name]?.id || null;
        showSuggestions = false;
    }

    function toggleFullscreen() {
        isFullscreen = !isFullscreen;
        if (isFullscreen) isMinimized = false;
    }

    function toggleMinimize() {
        isMinimized = !isMinimized;
        if (isMinimized) isFullscreen = false;
    }

    async function sendMessage() {
        if (!recipient || !messageText.trim() || !recipientId) return;

        try {
            let response = await fetch("/api/message", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify({
                    campaignId: campaignIdNum,
                    characterId: recipientId,
                    message: messageText.trim()
                })
            });

            let responseText = await response.text();
            console.log("Raw response:", responseText);

            let responseData;
            try {
                responseData = JSON.parse(responseText);
            } catch (error) {
                console.warn("Response is not JSON, assuming it's a bot reply:", responseText);
                responseData = { content: responseText }; // Handle plain text bot replies
            }

            if (!response.ok) {
                console.error("API Error:", responseData);
                throw new Error(`Failed to send message: ${responseData.message || responseText}`);
            }

            console.log("Message sent successfully!", responseData);

            // ✅ Create new message object
            const newMessage = {
                id: Date.now(),
                sender: "You",
                content: messageText.trim(),
                timestamp: new Date().toISOString(),
            };

            // ✅ Update messageData immediately
            if (!messageData[recipient]) {
                messageData[recipient] = { id: recipientId, messages: [] };
            }
            messageData[recipient].messages.push(newMessage);

            // ✅ Notify parent component (Email.svelte) to update UI
            onMessageSent(recipient, newMessage);

            // ✅ Clear input field and close modal
            messageText = "";
            onClose();

            // ✅ Handle AI reply (if applicable)
            if (responseData.content) {
                const aiMessage = {
                    id: Date.now() + 1,
                    sender: recipient,
                    content: responseData.content,
                    timestamp: new Date().toISOString(),
                };

                setTimeout(() => {
                    messageData[recipient].messages.push(aiMessage);
                    onMessageSent(recipient, aiMessage);
                }, 1000); // Simulate AI response delay
            }

        } catch (error) {
            console.error("Error sending message:", error);
        }
    }



</script>

<!-- Import Material Icons -->
<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />

<!-- Main Compose Window -->
<div class="fixed bottom-2 right-4 w-[480px] bg-white shadow-lg rounded-lg flex flex-col transition-all duration-300 ease-in-out z-50
    sm:inset-0 sm:w-full sm:h-full sm:rounded-none sm:bottom-0 sm:right-0
    {isFullscreen ? 'w-[90vw] h-[80vh] bottom-[5%] right-[5%] flex flex-col' : ''}">


    <!-- Header -->
    <div class="bg-gray-100 px-4 py-2 flex justify-between items-center">
        <h2 class="text-sm font-medium">New Message</h2>
        <div class="flex space-x-2">
            <button class="text-gray-600 hover:text-gray-900" onclick={toggleMinimize}>
                <span class="material-icons text-lg">remove</span>
            </button>
            <button class="text-gray-600 hover:text-gray-900" onclick={toggleFullscreen}>
                <span class="material-icons text-lg">open_in_full</span>
            </button>
            <button class="text-gray-600 hover:text-gray-900" onclick={onClose}>
                <span class="material-icons text-lg">close</span>
            </button>
        </div>
    </div>

    {#if !isMinimized}

        <!-- Body -->
        <div class="p-4 flex flex-col flex-grow">
            <!-- Recipient Input -->
            <div class="relative">
                <div class="flex items-center pb-1">
                    <input type="text" placeholder="To" bind:value={recipient} oninput={filterRecipients}
                           class="flex-grow text-sm p-2 bg-transparent focus:outline-none focus:ring-0 border-none" />
                    <span class="text-sm text-gray-700">Cc Bcc</span>
                </div>
                <div class="w-[98%] mx-auto border-b border-gray-300"></div>

                <!-- Auto-Suggestions -->
                {#if showSuggestions}
                    <div class="absolute left-0 mt-2 w-[95%] bg-white shadow-md rounded-md z-10 border border-gray-300">
                        {#each filteredRecipients as name}
                            <button class="p-2 text-sm cursor-pointer hover:bg-gray-100" onclick={() => selectRecipient(name)}>
                                {name}
                            </button>
                        {/each}
                    </div>
                {/if}
            </div>

            <!-- Message Input -->
            <textarea placeholder="Write your message..." rows="10" bind:value={messageText}
                      class="w-full p-2 text-sm bg-transparent resize-none focus:outline-none focus:ring-0 border-none flex-grow {isFullscreen ? 'h-[calc(100%-80px)]' : 'h-[200px]'}"></textarea>
        </div>

        <div class="w-[98%] mx-auto border-b border-gray-300"></div>

        <!-- Footer -->
        <div class="px-4 py-3 bg-white flex justify-start">
            <button class="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-full text-sm" onclick={sendMessage}>
                Send
            </button>
        </div>
    {/if}
</div>
