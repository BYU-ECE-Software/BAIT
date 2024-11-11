<script lang="ts">
    // We can specify Components in the lib/index.ts file to be imported using an Alias! pretty cool
    import { CampaignCard, LearnCard, Testimonial, SignInModal } from '$lib';
    import { isAuthenticated, signIn } from '$lib/stores/auth';
    import { onMount } from 'svelte';
    import { get } from 'svelte/store';
    let formModal = $state(false);

    onMount(() => {
        if (!get(isAuthenticated)){
            formModal = true;
        }
    })

    function handleSignIn(event: Event){
        event.preventDefault();
        signIn();
        formModal = false;
    }

</script>

<!-- Cards are imported from our src/lib/components


-->
<SignInModal open={formModal} />
<div class="flex flex-col md:flex-row items-center justify-center gap-6 w-full max-w-4xl mx-auto">
    <div class="w-full md:w-1/2 flex justify-center">
        <CampaignCard />
    </div>
    <div class="w-full md:w-1/2 flex justify-center">
        <LearnCard />
    </div>
</div>
<div class="gap-6">
    <Testimonial />
</div>




