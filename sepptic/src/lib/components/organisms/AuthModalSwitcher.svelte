<script lang="ts">
    import { Register } from '$lib';
    import { SignInModal } from '$lib';
    import { TermsAndConditions } from '$lib';

    let { open = false } = $props();
    let isRegistering = $state(false); // Tracks whether the user is registering
    let showTerms = $state(false);    // Tracks whether to show the Terms and Conditions modal

    // Function to toggle between SignIn and Register modals
    function toggleModal() {
        isRegistering = !isRegistering;
    }

    // Function to show the Terms and Conditions modal
    function openTerms() {
        showTerms = true;
    }

    // Function to go back to the previous modal
    function closeTerms() {
        showTerms = false;
    }

</script>

{#if open}
    {#if showTerms}
        <TermsAndConditions isOpen={true} onClose={closeTerms} />
    {:else if isRegistering}
        <Register onSwitchToSignIn={toggleModal} regFormModal={true} onOpenTerms={openTerms} />
    {:else}
        <SignInModal signFormModal={true} onSwitchToRegister={toggleModal} />
    {/if}
{/if}
