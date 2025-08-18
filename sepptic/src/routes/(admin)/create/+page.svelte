<script lang="ts">
    import CampaignForm from "$lib/components/molecules/CampaignForm.svelte";

</script>
    <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
        <!-- Header -->
        <div class="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
            <div class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                <h1 class="text-2xl font-bold text-gray-900 dark:text-white">Create a Campaign</h1>
            </div>
        </div>

        <!-- Main Content -->
        <div class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
            <div class="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
                <h3 class="text-xl font-semibold mb-6 text-gray-900 dark:text-white">Campaign Information</h3>
                
                <div class="space-y-6">
                    <CampaignForm mode="create"/>
                </div>
            </div>
        </div>
    </div>

<style>
    :global(.form-section) {
        @apply space-y-6;
    }
</style>