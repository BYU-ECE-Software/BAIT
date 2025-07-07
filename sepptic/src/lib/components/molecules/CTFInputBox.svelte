<script lang="ts">
  import Congratulations from './CongratulationsModal.svelte';
  import Failure from './FailureModal.svelte';

  export let question: string = 'Enter the flag:';
  export let userId: number;

  // Now an array of acceptable answers
  export let answer: string[] = ['flag-one', 'another-flag', 'secret-flag'];

  let flag: string = '';
  export let placeholder: string = 'e.g. 1234567';
  export let onSubmit: (value: string) => void = (value) => {
    // console.log('Submitted flag:', value);
  };

  let showModal = false;
  let failshowModal = false;

  async function logFlagAttempt(userId: number) {
    const name = "Flag Submission";
    const user = userId;
    console.log("userId passed into fetch call", userId);

    try {
      const response = await fetch("/api/timestamp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ user, name })
      });
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error("Failed to log flag attempt:", errorText);
      } else {
        // Optionally handle success
        // const data = await response.json();
        // console.log("Flag attempt logged:", data);
      }
    } catch (err) {
      console.log("Error creating flag submission timestamp", err);
    }
  }

  function checkFlag(value: string): void {
    const normalized = value.toLowerCase();
    // see if any of the answers appear in the entered text
    const isMatch = answer.some(ans => normalized.includes(ans.toLowerCase()));
    // console.log(`Checking flag: "${value}" contains one of [${answer.join(', ')}]? →`, isMatch);
    if (isMatch) {
      showModal = true;
    } else {
      failshowModal = true;
    }
  }

  function handleSubmit(e: Event) {
    e.preventDefault();
    checkFlag(flag);
    onSubmit(flag);
    logFlagAttempt(userId);
  }

</script>

<div class="bg-blue-500 border border-blue-500 rounded-lg p-6 mx-auto dark:bg-blue-600 dark:border-blue-600">
  <p class="text-white font-semibold text-lg mb-4">{question}</p>

  <form on:submit|preventDefault={handleSubmit} class="flex items-center space-x-4">
    <input
      type="text"
      bind:value={flag}
      placeholder={placeholder}
      class="w-full px-4 py-2 border border-blue-300 dark:border-blue-600 dark:bg-gray-800 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
    <button
      type="submit"
      class="max-w-sm px-4 py-2 bg-gray-800 text-white rounded-lg shadow hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-200 dark:text-gray-900 dark:hover:bg-gray-300"
    >
      Submit
    </button>
  </form>

  {#if showModal}
    <Congratulations onClose={() => (showModal = false)} show={true} />
  {/if}

  {#if failshowModal}
    <Failure onClose={() => (failshowModal = false)} show={true} />
  {/if}
</div>
