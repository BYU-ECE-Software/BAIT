<!-- AuthModalSwitcher.svelte -->
<script lang="ts">

    import { Register } from '$lib';
    import { SignInModal } from '$lib';
    let { open = false } = $props();
    let isRegistering = $state(false);

    // Function to toggle between SignIn and Register modals
    function toggleModal() {
        isRegistering = !isRegistering;
    }

</script>


{#if open}
    {#if isRegistering }
        <Register onSwitchToSignIn={toggleModal} regFormModal={true}/>
    {:else }
        <SignInModal signFormModal={true} onSwitchToRegister={toggleModal}/>
    {/if}
{/if}

