<script lang="ts">
  import { createEventDispatcher, onMount, afterUpdate } from 'svelte';

  // — the only props you need —
  export let characterId: number;          // numeric ID for your API
  export let contactName: string;          // human-readable display name
  export let campaignId: number | string;  // campaign identifier

   let messagesContainer: HTMLDivElement | null = null;

  // Whenever Svelte re-renders (e.g. a new message), scroll to bottom
  afterUpdate(() => {
    if (messagesContainer) {
      messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }
  });

  // — component state —
  let messages: { sender: string; content: string; timestamp: string }[] = [];
  let replyContent = '';

  const dispatch = createEventDispatcher();

  // — onMount lives inside the <script>, right after your state & props —
  onMount(async () => {
    console.log('🔍 fetching history for', { campaignId, characterId });
    try {
      const res = await fetch(
        `/api/message?campaignId=${campaignId}&characterId=${characterId}`,
            { credentials: 'include' }
        );
      console.log('GET /api/message status', res.status);  
      if (res.ok) {
        const payload = await res.json();
        console.log('GET payload', payload);
        const incoming = payload.messages;
        messages = incoming.map(m => ({
          sender: m.role === 'user' ? 'You' : contactName,
          content: m.content,
          timestamp: m.timestamp
        }));
      } else if (res.status === 404) {
        // no history yet → leave messages empty
        console.log('No history found (404)');
      } else {
        console.error('Fetch error:', res.statusText);
      }
    } catch (err) {
      console.error('Network error:', err);
    }
  });

  // — your sendReply function, with the correct names —
  async function sendReply() {
    const text = replyContent.trim();
    if (!text) return;

    // 1) add your own message locally
    const userMessage = {
      sender: 'You',
      content: text,
      timestamp: new Date().toISOString()
    };
    messages = [...messages, userMessage];
    dispatch('messageSent', { characterId, message: userMessage });
    replyContent = '';

    // 2) post to your backend
    try {
      const res = await fetch('/api/message', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          campaignId: Number(campaignId),
          characterId,      // <-- use the prop, not a stray contactId
          message: text,
          role: 'user'
        })
      });

      const payload = await res.json();
      if (res.ok && payload.content) {
        const aiMessage = {
          sender: contactName,    // <-- use contactName, not contact
          content: payload.content,
          timestamp: new Date().toISOString()
        };
        messages = [...messages, aiMessage];
        dispatch('messageSent', { characterId, message: aiMessage });
      } else {
        console.error('API error:', payload);
      }
    } catch (err) {
      console.error('Network error sending reply:', err);
    }
  }
</script>

<style>
  .chat-container {
    display: flex;
    flex-direction: column;
    height: 100%;
  }
  .messages {
    flex-grow: 1;
    overflow-y: auto;
    padding: 1rem;
    border: 1px solid #ccc;
    border-radius: 0.5rem;
    background: #f9f9f9;
  }
  .message {
    margin-bottom: 0.75rem;
    padding: 0.5rem;
    border-radius: 0.5rem;
  }
  .message.user {
    align-self: flex-end;
    background: #d0f0fd;
    text-align: right;
  }
  .message.ai {
    align-self: flex-start;
    background: #eee;
  }
  .input-area {
    display: flex;
    padding: 0.5rem 0;
  }
  .input-area textarea {
    flex-grow: 1;
    resize: none;
    padding: 0.5rem;
    border: 1px solid #ccc;
    border-radius: 0.25rem;
  }
  .input-area button {
    margin-left: 0.5rem;
    padding: 0.5rem 1rem;
    border: none;
    border-radius: 0.25rem;
    background: #007acc;
    color: white;
    cursor: pointer;
  }
</style>

<div class="chat-container">
  <!-- bind this div to our ref -->
  <div class="messages" bind:this={messagesContainer}>
    {#if messages.length}
      {#each messages as msg}
        <div class="message {msg.sender === 'You' ? 'user' : 'ai'}">
          <strong>{msg.sender}:</strong> {msg.content}
          <div class="text-xs text-gray-500">{new Date(msg.timestamp).toLocaleString()}</div>
        </div>
      {/each}
    {:else}
      <p class="text-gray-500">No messages yet.</p>
    {/if}
  </div>
  <div class="input-area">
    <textarea bind:value={replyContent} rows="2" placeholder="Type a message..."></textarea>
    <button on:click={sendReply}>Send</button>
  </div>
</div>
