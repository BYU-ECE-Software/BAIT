<script lang="ts">
  import Congratulations from './CongratulationsModal.svelte';
  import Failure from './FailureModal.svelte';
  // Question or prompt to display above the input
  export let question: string = 'Enter the flag:';

  // The correct answer to check against
  export let answer: string = 'correct-flag';

  // Value entered by the user
  let flag: string = '';

  // Placeholder text for the input
  export let placeholder: string = 'e.g. 1234567';

  // Callback when the user submits the flag
  export let onSubmit: (value: string) => void = (value) => {
    console.log('Submitted flag:', value);
  };
  
  // Just log if the value includes the answer
  function checkFlag(value: string): void {
    const result = value.includes(answer);
    console.log(`Checking flag: "${value}" contains "${answer}"? →`, result);
    if (result) {
    showModal = true;
  }
  if (!result) {
    failshowModal = true;
  }
  }

  function handleSubmit(e: Event) {
    e.preventDefault();
    checkFlag(flag);
    onSubmit(flag);
  }

let showModal = false;
let failshowModal = false;
</script>

<!-- Container: blue box with padding and rounded corners -->
<div class="bg-blue-500 border border-blue-500 rounded-lg p-6 mx-auto dark:bg-blue-600 dark:border-blue-600">
  <!-- Question at the top -->
  <p class="text-white font-semibold text-lg mb-4">{question}</p>

  <!-- Input and submit button -->
  <form on:submit|preventDefault={handleSubmit} class="flex items-center space-x-4">
    <!-- Text input field -->
    <input
      type="text"
      bind:value={flag}
      placeholder={placeholder}
      class="w-full px-4 py-2 border border-blue-300 dark:border-blue-600 dark:bg-gray-800 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
    />

    <!-- Submit button -->
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
