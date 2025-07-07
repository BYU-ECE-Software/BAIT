<script lang="ts">
    import { Modal } from 'flowbite-svelte';

    export let isOpen: boolean = false;
    export let onClose: () => void = () => {};

    // Close the modal
    function closeModal() {
        isOpen = false;
        onClose();
    }
</script>

<Modal bind:open={isOpen} size="lg" autoclose={false} {...$$restProps} dismissable={false}>
    <div class="space-y-4">
        <h2 class="text-2xl font-semibold text-gray-900 dark:text-white">
            Terms and Conditions
        </h2>
        <p class="text-gray-700 dark:text-gray-300 text-sm">
            By using this platform, you acknowledge and agree to the following:
        </p>
        <ul class="list-disc pl-5 text-gray-700 dark:text-gray-300 text-sm space-y-2">
            <li>Your data may be used for testing and improving our social engineering practice platform.</li>
            <li>The platform uses GPT-based APIs. Do not provide sensitive or confidential information.</li>
            
        </ul>
        <div class="flex justify-end">
            <button
                    type="button"
                    class="text-primary-600 hover:underline"
                    onclick={closeModal}>
                Close
            </button>
        </div>
    </div>
</Modal>
