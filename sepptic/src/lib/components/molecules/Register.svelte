<script lang="ts">
    import { Button, Modal, Label, Input, Checkbox } from 'flowbite-svelte';
    import { TermsAndConditions } from '$lib';
    import {signIn} from "$lib/auth.svelte";

    let { onSwitchToSignIn, regFormModal = true, onOpenTerms }: { onSwitchToSignIn: () => void, regFormModal: boolean, onOpenTerms: () => void } = $props();
    let termsModalOpen = $state(false);

    let name = $state('');
    let email = $state('');
    let password = $state('');
    let confirmPassword = $state('');
    let agreedToTerms = $state(false); // State for terms and conditions agreement
    let errorMessage = $state(''); // Reactive variable for error messages

    function closeTermsModal() {
        termsModalOpen = false;
    }

    async function handleRegister(event: SubmitEvent) {
        event.preventDefault();

        // Clear any previous error messages
        errorMessage = '';

        // Validate client-side before making the API call
        if (!agreedToTerms) {
            errorMessage = 'You must agree to the terms and conditions.';
            return;
        }
        if (password !== confirmPassword) {
            errorMessage = 'Passwords do not match.';
            return;
        }
        const formData = { name, email, password, confirmPassword };

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
                errorMessage = ''; // Clear error messages on success
                // Handle successful registration (e.g., redirect to login page)
                await handleLogin();
            } else {
                const errorData = await response.json();
                errorMessage = errorData.message || 'Registration failed.';
            }
        } catch (error) {
            console.error('Network error:', error);
            errorMessage = 'An unexpected error occurred. Please try again later.';
        }
    }
    //handling the login after registering
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
            }
        } catch (error) {
            console.error('Network error:', error);
            errorMessage = 'An unexpected error occurred. Please try again later.'
        }
    }
</script>

<TermsAndConditions bind:isOpen={termsModalOpen} onClose={closeTermsModal} class="relative z-50" />

<Modal bind:open={regFormModal} size="xs" autoclose={false} class="w-full" dismissable={false}>
    <form onsubmit={handleRegister} class="flex flex-col space-y-6">
        <h3 class="mb-4 text-xl font-medium text-gray-900 dark:text-white">Create an account</h3>
        {#if errorMessage}
            <div class="text-red-600 dark:text-red-400 text-sm">{errorMessage}</div>
        {/if}
        <Label class="space-y-2">
            <span>Full Name</span>
            <Input type="text" bind:value={name} placeholder="Frodo Baggins" required class="focus:border-seppticOrange-600 focus:ring focus:ring-seppticOrange-300" />
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
            <Checkbox bind:checked={agreedToTerms} class="text-seppticOrange-600 focus:ring-seppticOrange-400" />
            <span class="text-sm text-gray-700 dark:text-gray-300">
        I agree to the
        <button
                type="button"
                class="text-primary-700 hover:underline dark:text-primary-500"
                onclick={onOpenTerms}>
            terms and conditions
        </button>
    </span>
        </div>

        <Button type="submit" class="w-full bg-seppticRed-600 hover:bg-seppticRed-700" disabled={!agreedToTerms}>Create account</Button>
        <div class="text-sm font-medium text-gray-500 dark:text-gray-300">
            Already have an account?
            <a href="/main" onclick={(e) => { e.preventDefault(); onSwitchToSignIn(); }} class="text-seppticOrange-600 hover:underline dark:text-seppticOrange-500">Sign in</a>
        </div>
    </form>
</Modal>
