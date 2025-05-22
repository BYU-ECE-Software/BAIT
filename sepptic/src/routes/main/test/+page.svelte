<script>
  let activeTab = 'tab1';
</script>

<div style="display: flex;">
  <!-- Vertical Tabs -->
  <div style="display: flex; flex-direction: column; min-width: 150px; border-right: 1px solid #ccc;"
        class="flex flex-col min-w-[200px] border-r border-gray-300 h-screen">
    <p class="font-semibold text-xs text-gray-600 ml-4">Social Engineering</p>
    <h4 class="font-bold text-gray-600 ml-4">Title of Campaign</h4>
    <hr class="border-t border-gray-300 mb-4 ml-4 mr-4" />
    <button on:click={() => activeTab = 'tab1'} class="py-2 px-4 text-left">Mission Documents</button>
    <button on:click={() => activeTab = 'tab2'} class="py-2 px-4 text-left">Main Dashboard</button>
    <button on:click={() => activeTab = 'tab3'} class="py-2 px-4 text-left">Progress</button>
  </div>

  <!-- Tab Content -->
  <div style="padding: 1rem; flex-grow: 1;">
    {#if activeTab === 'tab1'}
      <p>This is Tab 1 content.</p>
    {/if}
    {#if activeTab === 'tab2'}
      <p>This is Tab 2 content.</p>
    {/if}
    {#if activeTab === 'tab3'}
      <p>This is Tab 3 content.</p>
    {/if}
  </div>
</div>
