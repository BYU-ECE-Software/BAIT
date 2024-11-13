<script lang="ts">
    console.log("SignInModal mounted");
    import { Button, Modal, Label, Input, Checkbox } from 'flowbite-svelte';
    let { onSwitchToRegister, signFormModal = true }: {onSwitchToRegister: () => void, signFormModal: boolean } = $props();
    let email = $state('');
    let password = $state('');

    async function handleSubmit(event: SubmitEvent) {
        event.preventDefault();

        const formData = { email, password };

        try {
            const response = await fetch('/api/auth', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                console.log('Login successful');
            } else {
                console.error('Login failed');
            }
        } catch (error) {
            console.error('Network error:', error);
        }
    }
</script>

<Modal bind:open={signFormModal} size="xs" autoclose={false} class="w-full">
    <form onsubmit={handleSubmit} class="flex flex-col space-y-6">
        <h3 class="mb-4 text-xl font-medium text-gray-900 dark:text-white">Sign in to our platform</h3>
        <Label class="space-y-2">
            <span>Email</span>
            <Input type="email" bind:value={email} placeholder="name@company.com" required />
        </Label>
        <Label class="space-y-2">
            <span>Your password</span>
            <Input type="password" bind:value={password} placeholder="•••••" required />
        </Label>
        <div class="flex items-start">
            <Checkbox>Remember me</Checkbox>
            <a href="/" class="ms-auto text-sm text-primary-700 hover:underline dark:text-primary-500">Lost password?</a>
        </div>
        <Button type="submit" class="w-full">Login to your account</Button>
        <div class="text-sm font-medium text-gray-500 dark:text-gray-300">
            Not registered?
            <a href="/" onclick={(e) => { e.preventDefault(); onSwitchToRegister(); signFormModal=false; }}
               class="text-primary-700 hover:underline dark:text-primary-500">
                Create account
            </a>
        </div>
    </form>
</Modal>

