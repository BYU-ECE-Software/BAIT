<script>
    import { Button, Input } from 'flowbite-svelte';
    let inputValue = '';
</script>

<div class="flex space-x-4" style="padding: 1rem;">
    <Input bind:value={inputValue} class="focus:border-seppticOrange-600 focus:ring focus:ring-seppticOrange-300" style="padding: 1rem;" placeholder="answer" />
    <Button>Submit</Button>
</div>