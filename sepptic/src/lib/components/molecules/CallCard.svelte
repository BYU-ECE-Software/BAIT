<script lang="ts">
  import { createEventDispatcher, onMount, afterUpdate } from 'svelte';
	import postcssConfig from '../../../../postcss.config';

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
  let messages: { sender: string; content: string; timestamp: string; isTyping?: boolean }[] = [];
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
        const incoming = payload.messages;
        messages = incoming.map(m => ({
          sender: m.role === 'user' ? 'You' : contactName,
          content: m.content,
          timestamp: m.timestamp
        }));
      } else if (res.status === 404) {
        console.log('No history found (404)');
      } else {
        console.error('Fetch error:', res.statusText);
      }
    } catch (err) {
      console.error('Network error:', err);
    }
  });

  // — your sendReply function, now with typing indicator —
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
          characterId,
          message: text,
          role: 'user'
        })
      });

      const payload = await res.json();
      if (res.ok && payload.content) {
        const aiMessage = {
          sender: contactName,
          content: payload.content,
          timestamp: new Date().toISOString()
        };

        // show typing indicator
        const typingBubble = {
          sender: contactName,
          content: '...',
          timestamp: new Date().toISOString(),
          isTyping: true
        };
        messages = [...messages, typingBubble];

        // random delay under 4 seconds
        const delay = Math.random() * 4000;
        setTimeout(() => {
          // remove typing bubble
          messages = messages.filter(msg => msg !== typingBubble);
          // add actual AI message
          messages = [...messages, aiMessage];
          dispatch('messageSent', { characterId, message: aiMessage });
        }, delay);
      } else {
        console.error('API error:', payload);
      }
    } catch (err) {
      console.error('Network error sending reply:', err);
    }
  }

  // — call management functions —
  let currentCall = 0; // 0 = no call, 1 = call in progress

  // Declare pc at the component scope so both functions can access it
  let pc: RTCPeerConnection | null = null;
  let ms: MediaStream | null = null; // MediaStream for microphone input

  async function startCall() {
    // Placeholder for call functionality
    console.log('Starting call...');
    currentCall = 1; // Set current call state to indicate a call is in progress
    // Start a new API session
    try {
      const response = await fetch('/api/realtime', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          characterId: characterId,
          campaignId: campaignId,
          // **Pass prompt info here**
        })
        // credentials: 'include', // Maybe?
      }); // Potential architectures here;
      // I could have this be a POST request including the characterId and campaignId, which then returns a session ID or similar
      // Or I could have this be a GET request that returns the ephemeral KEY to be used then do another function to start call
      const session = await response.json();
      console.log('Session data:', session);

      // Handling session data
      const EPHEMERAL_KEY = session.client_secret.value;
      
      // WebRTC peer connection
      pc = new RTCPeerConnection();
      
      // Set up to play remote audio from the model
      const audioEl = document.createElement("audio");
      audioEl.autoplay = true;
      pc.ontrack = e => audioEl.srcObject = e.streams[0];// Assuming the response contains an ephemeral key

      // Add local audio track for mic input from user
      ms = await navigator.mediaDevices.getUserMedia({ audio: true });
      pc.addTrack(ms.getTracks()[0]);

      // Set data channel for sending and receiving events
      const dc = pc.createDataChannel("realtime-chat");
      dc.addEventListener("message", (e) => {
        // Realtime server appear here!
        console.log(e);
      });

      // Start the session using the Session Description Protocol (SDP)
      const offer = await pc.createOffer();
      await pc.setLocalDescription(offer);

      const baseUrl = "https://api.openai.com/v1/realtime";
      const model = "gpt-40-realtime-preview-2025-06-03";
      const sdpResponse = await fetch(`${baseUrl}?model=${model}`, {
        method: "POST",
        body: offer.sdp,
        headers: {
          Authorization: `Bearer ${EPHEMERAL_KEY}`,
          "Content-Type": "application/sdp",
        }
      });

      const answer = {
        type: "answer",
        sdp: await sdpResponse.text(),
      };
      await pc.setRemoteDescription(answer);
      console.log('Call started successfully');


      } catch (err) {
      console.error('Error starting call:', err);
    }
  }

  async function endCall() {
    // Placeholder for ending call functionality
    console.log('Ending call...');
    // Implement logic to end the call session
    currentCall = 0;

    if (pc) {
      // Close the peer connection and clean up
      try {
        console.log('Closing peer connection...');
        pc.close(); // Clear the peer connection to OpenAI
        pc = null; // Clear the peer connection variable
        console.log('Peer connection closed');
        await ms?.removeTrack(ms.getTracks()[0]); // Remove the microphone track if it exists
        ms = null; // Clear the MediaStream
        console.log('Call ended successfully');
      } catch (err) {
        console.error('Error ending call:', err);
      }
    }
  }

</script>

<div class="chat-container max-h-[300px]">
  <div class="input-area">
    {#if currentCall}
      <div class="flex flex-col gap-2 w-full">
        <div>
          <p class="text-gray-500">Call in progress...</p>
        </div>
        <button class="end-call py-2 px-4 rounded" on:click={endCall}>End Phone Call</button>
      </div>
    {:else}
    <div class="flex flex-col gap-2 w-full">
      <p class="text-gray-500">No active call...</p>
      <button class="call py-2 px-4 rounded" on:click={startCall}>Start Phone Call</button>
    </div>
    {/if}
  </div>
</div>


<style>
  .end-call {
    background: red;
    color: white;
  }
  .call {
    background: green;
    color: white;
  }
  .chat-container {
    display: flex;
    flex-direction: column;
    height: 100%;
  }
  .messages {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
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
    max-width: 70%;
  }
  .message.user {
    align-self: flex-end;
    background: #d0f0fd;
    text-align: right;
    margin-left: auto;
  }
  .message.ai {
    align-self: flex-start;
    background: #eee;
    margin-right: auto;
  }
  .message.typing {
    font-style: italic;
    color: #888;
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