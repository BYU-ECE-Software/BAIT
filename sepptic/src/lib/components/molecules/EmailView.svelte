<script lang="ts">
    import { onMount } from "svelte";

    onMount(() => {
        console.log("EmailView thread received:", thread);
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
            console.log("Sending reply:", {
                campaignId: campaignIdNum,  // ✅ Ensure campaignId is included
                characterId: thread.characterId,
                message: replyContent.trim(),
            });

            let response = await fetch("/api/message", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify({
                    campaignId: campaignIdNum,  // ✅ Matches EmailCompose
                    characterId: thread.characterId,
                    message: replyContent.trim()
                })
            });

            let responseData = await response.json();

            if (!response.ok) {
                console.error("API Error:", responseData);
                throw new Error(`Failed to send message: ${responseData.message}`);
            }

            console.log("Message sent successfully!", responseData);

            const newMessage = {
                id: Date.now(),
                recipient: thread.contact,
                characterId: thread.characterId,
                content: replyContent.trim(),
                timestamp: new Date().toISOString(),
            };

            // ✅ Update UI instantly
            thread.messages.push({
                sender: "You",
                content: newMessage.content,
                timestamp: newMessage.timestamp
            });

            // ✅ Clear input field
            replyContent = "";

            // ✅ Notify parent component
            onMessageSent(thread.contact, newMessage);

        } catch (error) {
            console.error("Error sending reply:", error);
        }
    }


    function handleKeyDown(event: KeyboardEvent) {
        if (event.key === "Enter" && !event.shiftKey) {
            event.preventDefault();
            sendReply();
        }
    }
</script>
