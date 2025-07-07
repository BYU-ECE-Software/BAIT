<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
	import postcssConfig from '../../../../postcss.config';
	import { stringify } from 'postcss';

  // — the only props you need —
  export let characterId: number;          // numeric ID for your API
  export let campaignId: number | string;  // campaign identifier
  export let prompt: string; // prompt for the AI model
  export let voice: string; // Base voice model for the AI
  export let CallLimit: number; // Call limit for timeout in miliseconds (60000 per minute)

  // -- Will be used to handle pulling in fresh transcript from database if present --
  onMount(async () => {
    try {
      const res = await fetch(
        `/api/message?campaignId=${campaignId}&characterId=${characterId}&call=true`,
        { credentials: 'include' }
      );
      if (res.ok) {
        const data = await res.json();
        if (data?.data) {
          transcript = data.data;
          formatTranscript(transcript);
        }
      }
    } catch (err) {
      console.error('Network error:', err);
    }
  });

  onDestroy(() => {
    if (timeoutId !== null) {
      clearTimeout(timeoutId);
      timeoutId = null;
    }
    try {
      pc?.close();
      pc = null;
      ms?.getTracks().forEach(t => t.stop());
      ms = null;
    } catch(err) {
      console.error("onDestroy failed:", err)
    }
  })

  // -- Timer management variables --
  let mm: string = "00";
  let ss: string = "00";

  // — call management variables —
  let currentCall = 0;
  let responseInProgress = false;
  let timeOutReached = false;
  let timeoutId: ReturnType<typeof setTimeout> | null;

  let pc: RTCPeerConnection | null = null;
  let ms: MediaStream | null = null;

  let transcript: string = "";
  let formattedTrans: string[] = [];

  function formatTranscript(txt: string) {
    formattedTrans = txt.split("/n");
  }

  function exitAudio() {
    const audio = document.createElement("audio");
    audio.src = `/audio/${voice}.m4a`;
    audio.play().catch(e => console.error("Audio goodbye failed", e));
  }

  async function startCall() {
    currentCall = 1;
    try {
      const response = await fetch('/api/realtime', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ characterId, campaignId, prompt, voice })
      });
      if (!response.ok) throw new Error(`Error: ${response.status}`);

      const session = await response.json();
      const EPHEMERAL_KEY = session.client_secret.value;

      pc = new RTCPeerConnection();
      const audioEl = document.createElement("audio");
      audioEl.autoplay = true;
      pc.ontrack = e => audioEl.srcObject = e.streams[0];

      ms = await navigator.mediaDevices.getUserMedia({ audio: true });
      pc.addTrack(ms.getTracks()[0]);

      const dc = pc.createDataChannel("realtime-chat");
      dc.addEventListener("message", ev => {
        const data = JSON.parse(ev.data);
        if (data.type === "response.audio_transcript.done") {
          transcript += "/n" + data.transcript;
        } else if (data.type === "conversation.item.input_audio_transcription.completed") {
          transcript += "/n" + data.transcript;
        } else if (data.type === "output_audio_buffer.started") {
          responseInProgress = true;
        } else if (data.type === "output_audio_buffer.stopped") {
          responseInProgress = false;
          if (timeOutReached) {
            setTimeout(() => { endCall(); exitAudio(); }, 1000);
          }
        }
      });

      const offer = await pc.createOffer();
      await pc.setLocalDescription(offer);

      const model   = "gpt-40-realtime-preview-2025-06-03";
      const baseUrl = "https://api.openai.com/v1/realtime";
      const sdpRes  = await fetch(`${baseUrl}?model=${model}`, {
        method: "POST",
        body: offer.sdp,
        headers: {
          Authorization: `Bearer ${EPHEMERAL_KEY}`,
          "Content-Type": "application/sdp",
        }
      });

      const answer = { type: "answer", sdp: await sdpRes.text() };
      await pc.setRemoteDescription(answer);

      timeoutId = setTimeout(() => {
        timeOutReached = true;
        if (!responseInProgress) {
          endCall();
          exitAudio();
        }
      }, CallLimit);

    } catch (err) {
      console.error('Error starting call', err);
    }
  }

  async function endCall() {
    currentCall = 0;
    if (timeoutId !== null) {
      clearTimeout(timeoutId);
      timeoutId = null;
    }
    // save transcript
    fetch("/api/transcript", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ campaignId: Number(campaignId), characterId, call: true, transcript })
    }).catch(err => console.error("Store transcript failed:", err));

    if (pc) {
      pc.close();
      pc = null;
      ms?.getTracks().forEach(t => t.stop());
      ms = null;
      formatTranscript(transcript);
    }
  }
</script>

<div class="chat-container max-h-[300px]">
  <div class="transcript m-5">
    {#each formattedTrans as line}
      <p>{line}</p>
    {/each}
  </div>
  <div>
    {#if currentCall}
      <div class="flex flex-col gap-2 w-full">
        <button class="end-call py-2 px-4 rounded" onclick={endCall}>End Phone Call</button>
        <div>
          <p class="text-gray-500">Call in progress...</p>
          <p>{mm}:{ss}</p>
        </div>
      </div>
    {:else}
      <div class="flex flex-col gap-2 w-full">
        <button class="start-call py-2 px-4 rounded" onclick={startCall}>Start Phone Call</button>
        <div>
          <p class="text-gray-500">No active call...</p>
        </div>
      </div>
    {/if}
  </div>
</div>

<style>
  /* base light styles */
  .chat-container {
    display: flex;
    flex-direction: column;
    height: 100%;
    background: #F3F4F6;
    color: #111827;
  }

  .transcript {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    overflow-y: auto;
    padding: 1rem;
    border: 1px solid #ccc;
    border-radius: 0.5rem;
    background: #fff;
    color: #1f2937;
  }

  .start-call {
    background: #10b981; /* green-500 */
    color: white;
  }
  .end-call {
    background: #ef4444; /* red-500 */
    color: white;
  }

  /* dark-mode overrides */
  :global(.dark) .chat-container {
    background-color: #111827; /* gray-900 */
    color: #f9fafb;           /* gray-50 */
  }
  :global(.dark) .transcript {
    border-color: #4b5563;    /* gray-600 */
    background: #1f2937;      /* gray-800 */
    color: #e5e7eb;           /* gray-200 */
  }
  :global(.dark) .start-call {
    background: #059669;      /* green-600 */
  }
  :global(.dark) .end-call {
    background: #dc2626;      /* red-600 */
  }
</style>
