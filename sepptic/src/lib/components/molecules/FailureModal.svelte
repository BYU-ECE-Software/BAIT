<script lang="ts">
  export let show = false;
  export let onClose: () => void = () => {};
</script>

{#if show}
  <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div class="bg-white rounded-2xl shadow-xl p-8 relative w-full max-w-md text-center">
      <!-- Close Button -->
      <button
        class="absolute top-2 right-2 text-gray-500 hover:text-red-500 text-xl font-bold"
        on:click={onClose}
        aria-label="Close"
      >
        &times;
      </button>

      <!-- Content -->
      <h2 class="text-2xl font-bold mb-4 text-red-600">Failure</h2>
      <p class="text-gray-700">You've failed to completed the task.</p>
    </div>
  </div>
{/if}
