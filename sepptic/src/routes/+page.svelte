<script lang="ts">
    // We can specify Components in the lib/index.ts file to be imported using an Alias! pretty cool
    import {RootButton} from '$lib';
    import {ButtonOne} from '$lib';
    import {InputField} from '$lib'
</script>


<h1>custom button demo</h1>
<RootButton />
<ButtonOne />
<InputField />


<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>
