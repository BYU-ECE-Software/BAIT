<script lang="ts">
    import { Button, Modal, Label, Input, Checkbox } from 'flowbite-svelte';

    let { onSwitchToSignIn, regFormModal = true }: { onSwitchToSignIn: () => void, regFormModal: boolean } = $props();

    let fullName = $state('');
    let email = $state('');
    let password = $state('');
    let confirmPassword = $state('');

    async function handleRegister(event: SubmitEvent) {
        event.preventDefault();

        const formData = { fullName, email, password, confirmPassword };

        try {
            const response = await fetch('/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                console.log('Registration successful');
                // Handle successful registration (e.g., show a success message)
            } else {
                console.error('Registration failed');
                // Handle error (e.g., show an error message)
            }
        } catch (error) {
            console.error('Network error:', error);
        }
    }
</script>

<Modal bind:open={regFormModal} size="xs" autoclose={false} class="w-full">
    <form onsubmit={handleRegister} class="flex flex-col space-y-6">
        <h3 class="mb-4 text-xl font-medium text-gray-900 dark:text-white">Create an account</h3>
        <Label class="space-y-2">
            <span>Full Name</span>
            <Input type="text" bind:value={fullName} placeholder="Frodo Baggins" required class="focus:border-seppticOrange-600 focus:ring focus:ring-seppticOrange-300" />
        </Label>
        <Label class="space-y-2">
            <span>Email</span>
            <Input type="email" bind:value={email} placeholder="onedoesnotsimplywalk@gmail.com" required class="focus:border-seppticOrange-600 focus:ring focus:ring-seppticOrange-300" />
        </Label>
        <Label class="space-y-2">
            <span>Password</span>
            <Input type="password" bind:value={password} placeholder="••••••••••" required class="focus:border-seppticOrange-600 focus:ring focus:ring-seppticOrange-300" />
        </Label>
        <Label class="space-y-2">
            <span>Confirm Password</span>
            <Input type="password" bind:value={confirmPassword} placeholder="••••••••••" required class="focus:border-seppticOrange-600 focus:ring focus:ring-seppticOrange-300" />
        </Label>
        <div class="flex items-start space-x-2">
            <Checkbox class="text-seppticOrange-600 focus:ring-seppticOrange-400" />
            <span class="text-sm text-gray-700 dark:text-gray-300">
                I agree to the <a href="/" class="text-primary-700 hover:underline dark:text-primary-500">terms and conditions</a>
            </span>
        </div>

        <Button type="submit" class="w-full bg-seppticRed-600 hover:bg-seppticRed-700">Create account</Button>
        <div class="text-sm font-medium text-gray-500 dark:text-gray-300">
            Already have an account?
            <a href="/main" onclick={(e) => { e.preventDefault(); onSwitchToSignIn(); }} class="text-seppticOrange-600 hover:underline dark:text-seppticOrange-500">Sign in</a>
        </div>
    </form>
</Modal>

