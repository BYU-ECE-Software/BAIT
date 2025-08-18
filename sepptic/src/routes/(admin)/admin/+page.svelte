<script lang="ts">

import { Button, Modal, Label } from "flowbite-svelte";
import { onMount } from "svelte"

let deleteModal = $state(false);

const campaigns: any[] = $state([]); // bypass type checking

onMount(() => {
    getCampaigns();
})

async function getCampaigns() {
    const response = await fetch("/api/campaigns", {method: "GET"});
    if (!response.ok) {
        console.error("Failed to load campaigns");
        return;
    }
    const data = await response.json();
    console.log("Campaigns: ", data)
    for (const c of data) {
        campaigns.push(c);
    }
    console.log(campaigns[0]);
}

async function getCharImages(id: string) {
  const res = await fetch(`/api/campaigns/${id}`, {
    method: "GET"
  })
  if (!res.ok) {
    console.error("Failed to grab campaign data");
    return;
  }
  const jsonRes = await res.json();
  console.log("Campaign chars: ", jsonRes.data.Characters)

  return jsonRes.data.Characters;
}



async function submitDelete(id: string, image: string) {

  const campaignImageRes = await fetch(image, {
    method: "DELETE",
  });

  if (!campaignImageRes.ok) {
    console.warn("Delete failed on campaign image, continuing to delete campaign: ", campaignImageRes.statusText)
  }
  
  const chars = await getCharImages(id);

  // The minus one is to prevent randy from being check because his image is a static asset accross campaigns
  for (let i = 0; i < chars.length - 1; i++) {
    const charImageRes = await fetch(chars[i].Image, {
      method: "DELETE"
    }); 

    if (!charImageRes.ok) {
      console.warn("Delete failed on character image, continuing to delete campaign json: ", charImageRes.statusText)
    }
  }

  const campaignRes = await fetch("/api/campaigns", {
      method: "DELETE",
      headers: {
          "Content-Type": "application/json"
      },
      body: JSON.stringify({ campaignId: id })
  })
  if (!campaignRes.ok) {
      console.error("Failed to delete campaign");
      return;
  }
  console.log("Campaign deleted successfully: ", campaignRes.status);

}
</script>

<main class="p-6 space-y-4">
  <div class="flex gap-4">
    <Button color="blue" href="/create">Create a Campaign</Button>
    <Button color="green" href="/edit">Edit a Campaign</Button>
    <Button color="red" on:click={() => (deleteModal = true)}>Delete a Campaign</Button>
  </div>

  <Modal size="lg" title="Delete Campaigns" bind:open={deleteModal}>
    <div class="space-y-2">
      <h2 class="text-lg font-semibold">Select which campaigns you would like to delete</h2>
      <p class="text-sm text-gray-600">
        This action will <span class="font-bold text-red-600">permanently</span> delete the campaign and all associated data from the database.
      </p>
    </div>

    <div class="mt-4 space-y-3 max-h-64 overflow-y-auto">
      {#if campaigns.length === 0}
        <p class="text-sm italic text-gray-500">No campaigns found.</p>
      {:else}
        {#each campaigns as campaign (campaign.id)}
          <div class="flex items-center justify-between rounded-md border border-gray-200 p-3 hover:bg-gray-50">
            <Label class="text-gray-800">{campaign.name}</Label>
            <Button size="xs" color="red" on:click={() => submitDelete(campaign.id, campaign.image)}>
              Delete
            </Button>
          </div>
        {/each}
      {/if}
    </div>
  </Modal>
</main>
