<script lang="ts">
  import { createEventDispatcher, onMount, onDestroy } from 'svelte';
	import postcssConfig from '../../../../postcss.config';

  // — the only props you need —
  export let characterId: number;          // numeric ID for your API
  export let contactName: string;          // human-readable display name
  export let campaignId: number | string;  // campaign identifier
  export let prompt: string; // prompt for the AI model
  export let voice: string; // Base voice model for the AI

  // -- Will be used to handle pulling in fresh transcript from database if present --
  onMount(() => {
  //   console.log("Call component is being built")
  //   if (//Databse function here) {
  //   console.log("Retriving transcript from database");
  //   // Placeholder for code that will pull transcript from database
  //   } else {
  //     console.log("No transcript found in database, starting new conversation");
  //   }
  });

  // — onDestroy called to wipe call session before user can move to another card, prevents multiple RTC sessions at once 
  onDestroy(() => {
    console.log("Call component is being destroyed")
    try {
      pc?.close(); // Clear the peer connection to OpenAI
      pc = null; // Clear the peer connection variable
      console.log('Peer connection closed');
      ms?.getTracks().forEach((track) => track.stop()); // Iterate through and remove microphone tracks if they exists
      ms = null; // Clear the MediaStream
      console.log('Call ended successfully');
      console.log()
    }
    catch(err) {
      console.error("onDeestroy failed to end call:", err)
    }
  })


  // — call management functions —
  let currentCall = 0; // 0 = no call, 1 = call in progress

  // -- Timer management variables --
  let start = 0;
  let end = 0;


  // Declare pc at the component scope so both functions can access it
  let pc: RTCPeerConnection | null = null;
  let ms: MediaStream | null = null; // MediaStream for microphone input

  let transcript: string[] = [];

  // -- Timer Functionality
  let mm = 0;
  let ss = 0;

  function beginTimer() {
    let start = Date.now();
    setInterval(() => {
      ss += 1;
      if (ss == 60) {
        mm += 1;
        ss = 0;
      }
    }, 1000)
  }

  async function startCall() {
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
          prompt: prompt,
          voice: voice
        })
      });

      // Check if the response is ok
      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }

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
      dc.addEventListener("message", (event) => {
        // Realtime server calls and responses logged in console here
        console.log(event);
        // Records AI output to transcript array to be use on DOM and stored when conversation ends
        const data = JSON.parse(event.data);
        if (data.type === "response.audio_transcript.done"){
          console.log("Identified response end");
          let output = data.transcript;
          transcript = [...transcript, output];
          console.log("Current transcript array", transcript)
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
      console.log('Call started successfully');

      // Set call start variable
      start = Date.now();

      // Set maximum 5 minute call duration and display remaining time
      beginTimer();
      setTimeout(() => {
        endCall();
        console.log("5 minute timeout has been reached, call has been ended.")
      }, 1000 * 60 * 5)
      
      } catch (err) {
      console.error('Error starting call:', err);
    }
  }

  async function endCall() {
    // Placeholder for ending call functionality
    console.log('Ending call...');
    // Implement logic to end the call session
    currentCall = 0;

    try {
      // Filler for code that will store transcript array in database
    } catch (err) {
      console.error("Error storing transcript in database:", err);
    }

    if (pc) {
      // Close the peer connection and clean up
      try {
        console.log('Closing peer connection...');
        pc.close(); // Clear the peer connection to OpenAI
        pc = null; // Clear the peer connection variable
        console.log('Peer connection closed');
        ms?.getTracks().forEach((track) => track.stop()); // Iterate through and remove microphone individual tracks to free microphone
        ms = null; // Clear the MediaStream
        console.log('Call ended successfully');

        //Set end time for call
        end = Date.now();
        console.log(`Call time was: ${((end - start))}`);


      } catch (err) {
        console.error('Error ending call:', err);
      }
    }
  }

</script>

<div class="chat-container max-h-[300px]">
  <!-- <div class="transcript m-5">
    This is the reactive version of the code-->
    <!-- {#each transcript as response}
    <p class="messageai">{response}</p>
    <br>
    {/each} 
    </div>-->

    <!--This is the version that prints the full transcript post conversation-->
    
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
    <div>
      <h2>{mm}:{ss}</h2>
    </div>
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
  .messageai {
    align-self: flex-start;
    background: #eee;
    margin-right: auto;
  }
</style>