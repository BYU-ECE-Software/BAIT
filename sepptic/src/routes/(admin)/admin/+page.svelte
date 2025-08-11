
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

async function submitDelete(id: string) {
    const response = await fetch("/api/campaigns", {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ campaignId: id })
    })
    if (!response.ok) {
        console.error("Failed to delete campaign");
        return;
    }
    console.log("Campaign deleted successfully: ", response.status);

}
</script>

<main>
    <div class="flex-row">
        <Button color="blue" href="/create">Create a Campaign</Button>
        <Button color="red" onclick={() => (deleteModal = true)}>Delete a Campaign</Button>
    </div>
    <Modal title="Delete Campaigns" bind:open={deleteModal}>
        <h2>Select which campaigns you would like to delete</h2>
        
        <div>
            {#each campaigns as campaign}
                {#key campaign.id}
                    <Label>{campaign.name}</Label>
                    <Button color="red" onclick={() => submitDelete(campaign.id)}>Delete Campaign</Button>
                    <small>This action will delete the campaign and all associated data from the database</small>
                {/key}
            {/each}
        </div>
    </Modal>
</main>