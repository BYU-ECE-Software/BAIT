<script lang="ts">
    // We can specify Components in the lib/index.ts file to be imported using an Alias! pretty cool
    import { CampaignCard, LearnCard, Testimonial } from '$lib';
</script>

<!-- This is just listing out all of our components on the home page -->

<div class="flex flex-col md:flex-row items-center justify-center gap-8 mx-auto text-center">
    <div class="flex flex-col md:flex-row gap-12 max-w-4xl mx-auto">
        <!-- Ensure equal height for both cards -->
        <div class="w-full md:w-1/2 flex justify-center">
            <div class="flex flex-col h-full w-full max-w-sm">
                <CampaignCard />
            </div>
        </div>
        <div class="w-full md:w-1/2 flex justify-center">
            <div class="flex flex-col h-full w-full max-w-sm">
                <LearnCard />
            </div>
        </div>
    </div>
</div>

<!-- Testimonial section -->
<div class="gap-6 mt-12 mb-12">
    <Testimonial />
</div>
