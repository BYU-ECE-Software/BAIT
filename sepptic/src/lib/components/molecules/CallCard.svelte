<script lang="ts">
  import { createEventDispatcher, onMount, onDestroy } from 'svelte';
	import postcssConfig from '../../../../postcss.config';
	import { stringify } from 'postcss';

  // — the only props you need —
  export let characterId: number;          // numeric ID for your API
  export let contactName: string;          // human-readable display name
  export let campaignId: number | string;  // campaign identifier
  export let prompt: string; // prompt for the AI model
  export let voice: string; // Base voice model for the AI
  export let CallLimit: number; // Call limit for timeout in miliseconds (60000 per minute)

  // -- Will be used to handle pulling in fresh transcript from database if present --
  onMount(async () => {
  // console.log('Fetching call transcript for', { campaignId, characterId});
    try {
      const res = await fetch(
        `/api/message?campaignId=${campaignId}&characterId=${characterId}&call=true`,
        { credentials: 'include' }
      );
      // console.log('GET /api/message status', res.status);
      if (res.ok) {
        // console.log("Transcript aquired");
        const data = await res.json();
        console.log(data)
        // CRITICAL The following if-stmt sets the transcript variable to start with the transcript from the DB. Allows for conversation history
        if (data && data.data) {
          transcript = data.data;
          console.log("Loaded transcript:", transcript);
          formatTranscript(transcript); // For DOM printing
        }
      } else if (res.status === 404) {
        // console.log('No history found (404)');
      } else {
        console.error('Fetch error:', res.statusText);
      }
    } catch (err) {
      console.error('Network error:', err);
    }
  });

  // — onDestroy called to wipe call session before user can move to another card, prevents multiple RTC sessions at once 
  onDestroy(() => {
    // console.log("Call component is being destroyed");
    if (timeoutId !== null) {
      // console.log("Timeout destroyed");
      clearTimeout(timeoutId);
      timeoutId = null;
    }
    try {
      pc?.close(); // Clear the peer connection to OpenAI
      pc = null; // Clear the peer connection variable
      // console.log('Peer connection closed');
      ms?.getTracks().forEach((track) => track.stop()); // Iterate through and remove microphone tracks if they exists
      ms = null; // Clear the MediaStream
      // console.log('Call ended successfully');
      // console.log()
    }
    catch(err) {
      console.error("onDestroy failed to end call:", err)
    }
  })


  // — call management variables —
  let currentCall = 0; // 0 = no call, 1 = call in progress
  let responseInProgress = false; // Flag to indicate if a response is currently being processed
  let timeOutReached = false; // Flag to indicate if the call timeout has been reached

  // -- Timer management variables --
  let start = 0;
  let end = 0;
  let timeoutId: ReturnType<typeof setTimeout> | null;


  // Declare pc at the component scope so both functions can access it
  let pc: RTCPeerConnection | null = null;
  let ms: MediaStream | null = null; // MediaStream for microphone input

  // Transcript storage variable
  let transcript: string = "";
  let formattedTrans : string[] = [];

  function formatTranscript(transcript: string) {
    formattedTrans = transcript.split("\n");
  }


  function exitAudio() {
    const audio = document.createElement("audio");
    audio.src = "/AshGoodbye.m4a";
    audio.play().catch((e) => console.error("Audio goobye playback failed", e));
  }


  async function startCall() {
    // console.log('Starting call...');
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
          prompt: prompt,
          voice: voice
        })
      });

      // Check if the response is ok
      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }

      const session = await response.json();
      // console.log('Session data:', session);

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

      dc.addEventListener("message", (event) => {

        // Realtime server calls and responses logged in console here
        // console.log(event);

        // Records AI output to transcript array to be use on DOM and stored when conversation ends
        const data = JSON.parse(event.data);
        if (data.type === "response.audio_transcript.done") {
          // console.log("Identified response end");
          let output = data.transcript;
          transcript = transcript + "/n" + output;
          // console.log("Current transcript array after response", transcript)
        }
        // else if (data.type === "conversation.item.create") {
        //   // console.log("Identified User Input");
        //   let input = data.content.text;
        //   transcript = [...transcript, input];
        //   // console.log("Current Transcript after user input", transcript)
        // } // A Failed attempt at capturing User input for the transcript. This will have to be done another way...
        else if (data.type === "output_audio_buffer.started") {
          responseInProgress = true; // Set a flag to indicate that a response is in progress
          console.log("Response in progress");
        }
        else if (data.type === "output_audio_buffer.stopped") {
          responseInProgress = false; // Reset the flag when the response is done
          console.log("Response done");

          if (timeOutReached) {
            console.log("Response done, but timeout reached, ending call...");
            endCall();
            exitAudio();
          }
        }
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
      // console.log('Call started successfully');

      // Set call start variable
      start = Date.now();

      // Set maximum call duration 
      timeoutId = setTimeout(() => {
        timeOutReached = true;
        console.log("Call limit reached, waiting for response to end...");

        if (!responseInProgress) {
          console.log("Response is not in progress, ending call immediately.");
          endCall();
          exitAudio();
          return;
        }
        console.log("Timeout has been reached, call has been ended.")
        exitAudio();
      }, CallLimit)
      
      } catch (err) {
      console.error('Error starting call:', err);
    }
  }

  async function endCall() {
    // Placeholder for ending call functionality
    // console.log('Ending call...');
    currentCall = 0;

    //Remove timeout
    if (timeoutId !== null) {
      // console.log("Timeout destroyed")
      clearTimeout(timeoutId);
      timeoutId = null;
    }

    // Send transcript to DB through API
    try {
      const response = fetch("/api/transcript", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "include",
        body: JSON.stringify({
          campaignId: Number(campaignId),
          characterId,
          call: true,
          transcript: transcript
        })
      })
    } catch (err) {
      console.error("Error storing transcript in database:", err);
    }

    if (pc) {
      // Close the peer connection and clean up
      try {
        // console.log('Closing peer connection...');
        pc.close(); // Clear the peer connection to OpenAI
        pc = null; // Clear the peer connection variable
        // console.log('Peer connection closed');
        ms?.getTracks().forEach((track) => track.stop()); // Iterate through and remove microphone individual tracks to free microphone
        ms = null; // Clear the MediaStream
        // console.log('Call ended successfully');

        //Set end time for call
        end = Date.now();
        // console.log(`Call time was: ${((end - start))}`);

        formatTranscript(transcript);


      } catch (err) {
        console.error('Error ending call:', err);
      }
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
        <button class="end-call py-2 px-4 rounded" on:click={endCall}>End Phone Call</button>
        <div>
          <p class="text-gray-500">Call in progress...</p>
        </div>
      </div>
    {:else}
      <div class="flex flex-col gap-2 w-full">
        <button class="start-call py-2 px-4 rounded" on:click={startCall}>Start Phone Call</button>
        <div>
          <p class="text-gray-500">No active call...</p>
        </div>
      </div>
    {/if}
  </div>
</div>


<style>
  .end-call {
    background: red;
    color: white;
  }
  .start-call {
    background: green;
    color: white;
  }
  .chat-container {
    display: flex;
    flex-direction: column;
    height: 100%;
  }

  .transcript {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    overflow-y: auto;
    padding: 1rem;
    border: 1px solid #ccc;
    border-radius: 0.5rem;
    background: #f9f9f9;
  }

  .transcriptLine {
    border-radius: 0.25rem;
    border-bottom: 1px solid #333;
    border-top: 1px solid #333;
    background: #e0f7fa; /* Light cyan background for better readability */
    color: #333; /* Dark text for contrast */
  }
</style>