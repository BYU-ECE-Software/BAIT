<script lang="ts">
  import { createEventDispatcher } from 'svelte';

  export let campaignId: number | string;
  const dispatch = createEventDispatcher();

  async function handleReset() {
    try {
      const res = await fetch('/api/resetcampaign', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          campaignId: Number(campaignId),
        })
      });

      if (!res.ok) {
        console.error('Failed to reset campaign');
      } else {
        dispatch('reset'); // ✅ Notify parent to refresh chat
      }
    } catch (err) {
      console.error('Network error deleting campaign data:', err);
    }
  }
</script>

<div class="flex items-start justify-between mt-4 gap-4 max-w-4xl">
  <p class="text-sm text-gray-500 dark:text-gray-400 flex-1">
    Resetting the campaign will erase all progress, including messages and answers. Only use this if absolutely necessary.
  </p>
  <button
    on:click={handleReset}
    type="button"
    class="px-4 py-2 bg-red-600 text-white rounded-lg shadow hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 dark:bg-red-600 dark:text-white dark:hover:bg-red-700"
  >
    Reset Campaign
  </button>
</div>
