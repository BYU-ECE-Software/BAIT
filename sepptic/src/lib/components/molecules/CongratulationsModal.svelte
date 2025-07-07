<script lang="ts">
  export let show = false;
  export let onClose: () => void = () => {};
</script>

{#if show}
  <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 relative w-full max-w-md text-center">
      <!-- Close Button -->
      <button
        class="absolute top-2 right-2 text-gray-500 dark:text-gray-300 hover:text-red-500 text-xl font-bold"
        onclick={onClose}
        aria-label="Close"
      >
        &times;
      </button>

      <!-- Content -->
      <h2 class="text-2xl font-bold mb-4 text-green-600 dark:text-green-400">🎉 Congratulations! 🎉</h2>
      <p class="text-gray-700 dark:text-gray-200 mb-4">
        You've successfully completed the Social Engineering campaign. Great job leveraging multiple social engineering tactics to reach your goal!
      </p>
      <a
        href="https://qualtricsxm997pm86gx.qualtrics.com/jfe/form/SV_00YGmv8m4F9fSYK"
        target="_blank"
        class="inline-block mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition dark:bg-blue-500 dark:hover:bg-blue-600"
      >
        Take Survey
      </a>
    </div>
  </div>
{/if}
