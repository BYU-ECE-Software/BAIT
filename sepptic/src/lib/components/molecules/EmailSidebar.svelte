<script lang="ts">
    let menuItems = ["Inbox", "Sent", "Drafts", "Spam", "Trash"];
</script>

<div class="w-64 bg-gray-100 p-4">
    <button class="w-full bg-blue-500 text-white p-2 rounded">Compose</button>
    <ul class="mt-4">
        {#each menuItems as item}
            <li class="p-2 hover:bg-gray-200 cursor-pointer">{item}</li>
        {/each}
    </ul>
</div>

