<script lang="ts">
    let { onCompose, onSelectTab } = $props<{
        onCompose: () => void,
        onSelectTab: (tab: string) => void // ✅ Pass selected tab
    }>();

    let menuItems = ["Inbox", "Sent"];
</script>

<div class="w-64 bg-gray-100 p-4">
    <button
            class="w-full bg-blue-500 text-white p-2 rounded"
            onclick={onCompose}
    >
        Compose
    </button>

    <ul class="mt-4">
        {#each menuItems as item}
            <li class="p-2 hover:bg-gray-200 cursor-pointer"
                onclick={() => onSelectTab(item.toLowerCase())}>
                {item}
            </li>
        {/each}
    </ul>
</div>

