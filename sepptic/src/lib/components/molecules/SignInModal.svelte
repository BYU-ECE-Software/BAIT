<script lang="ts">
    import { Button, Modal, Label, Input, Checkbox } from 'flowbite-svelte';
    import {signIn} from "$lib/auth.svelte";
    let { onSwitchToRegister, signFormModal = true }: {onSwitchToRegister: () => void, signFormModal: boolean } = $props();
    let email = $state('');
    let password = $state('');
    let errorMessage = $state(''); // Reactive variable for error messages



    async function handleLogin() {
        const loginData = { email, password };
        try {
            const response = await fetch('/api/auth', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(loginData),
            });
            if (response.ok){
                const responseData = await response.json();
                console.log('Login successful', responseData);
                signIn();
            } else {
                const errorData = await response.json();
                errorMessage = errorData.message || 'Login failed.';
                console.error(errorMessage);
            }
        } catch (error) {
            console.error('Network error:', error);
        }
    }
</script>

<Modal bind:open={signFormModal} size="xs" autoclose={false} class="w-full" dismissable={true}>
    <form onsubmit={handleLogin} class="flex flex-col space-y-6">
        {#if errorMessage}
            <div class="text-red-600 dark:text-red-400 text-sm">{errorMessage}</div>
        {/if}
        <h3 class="mb-4 text-xl font-medium text-gray-900 dark:text-white">Sign in to SEPPTIC</h3>
        <Label class="space-y-2">
            <span>Email</span>
            <Input class="focus:border-seppticOrange-600 focus:ring focus:ring-seppticOrange-300" type="email" bind:value={email} placeholder="onedoesnotsimplywalk@gmail.com" required />
        </Label>
        <Label class="space-y-2">
            <span>Your password</span>
            <Input class="focus:border-seppticOrange-600 focus:ring focus:ring-seppticOrange-300" type="password" bind:value={password} placeholder="••••••••••" required />
        </Label>
        <div class="flex items-center justify-between">
            <div class="flex items-center space-x-2">
                <Checkbox checked inline class="text-seppticOrange-600 focus:ring-seppticOrange-400" />
                <span class="text-sm text-gray-700 dark:text-gray-300">Remember me</span>
            </div>
            <a href="/" class="text-sm text-primary-700 hover:underline dark:text-primary-500">Lost password?</a>
        </div>

        <Button type="submit" class="w-full bg-seppticRed-600 hover:bg-seppticRed-700">Login to your account</Button>
        <div class="text-sm font-medium text-gray-500 dark:text-gray-300">
            Not registered?
            <a href="/main" onclick={(e) => { e.preventDefault(); onSwitchToRegister(); signFormModal=false; }}
               class="text-seppticOrange-600 hover:underline dark:text-seppticOrange-500">
                Create account
            </a>
        </div>
    </form>
</Modal>

