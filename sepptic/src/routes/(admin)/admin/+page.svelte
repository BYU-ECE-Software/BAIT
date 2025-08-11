
<script lang="ts">

import { Button, Modal } from "flowbite-svelte";
let deleteModal = $state(false);
</script>

<main>
    <div class="flex-row">
        <Button color="blue" href="/create">Create a Campaign</Button>
        <Button color="red" onclick={() => (deleteModal = true)}>Delete a Campaign</Button>
    </div>
    <Modal title="Delete Campaigns" bind:open={deleteModal}>
        <p>Select which campaigns you would like to delete</p>
        <p>This action will delete the campaign and all associated data from the database</p>
        
    </Modal>
</main>