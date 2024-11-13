<script lang="ts">
    // We can specify Components in the lib/index.ts file to be imported using an Alias! pretty cool
    import { CampaignCard, LearnCard, Testimonial } from '$lib';


</script>
<!-- Cards are imported from our src/lib/components


-->
<!--<SignInModal open={formModal} />-->
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




