<script lang="ts">
    import { onMount } from "svelte";
    import { Modal, Input, Button, Label, Select } from "flowbite-svelte";

    let blocked = false;
    let showModal = true;
    let password = "";
    let errorMessage = "";
    const CORRECT_PASSWORD = "password"; // In production, this should come from environment variables or server

    function checkPassword() {
        if (password === CORRECT_PASSWORD) {
            showModal = false;
            blocked = false;
        } else {
            errorMessage = "Incorrect password";
            password = "";
        }
    }

    // Prevent access until authenticated
    onMount(() => {
        blocked = true;
    });

    let selected = "";
    let description = "";
    let briefing = "";
    let question = "";
    let finalAnswers = "";
    let name = "";
    let voices = [
        { value: "alloy", label: "Female" },
        { value: "ash", label: "Deep Male" },
        { value: "ballad", label: "Female" },
        { value: "coral", label: "Soft Female" },
        { value: "echo", label: "Male" },
        { value: "sage", label: "Firm Female" },
        { value: "shimmer", label: "Male" },
        { value: "verse", label: "Soft Male" }
    ];

    function createJson() {
        const campaignData = {
            Name: name,
            Description: description,
            Brief: briefing,
            Final_Question: question,
            Final_Answer: finalAnswers.split(',').map(ans => ans.trim())
        };
        console.log(JSON.stringify(campaignData, null, 2));
    }
</script>

{#if showModal}
    <Modal
        title="Authentication Required"
        open={showModal}
        outsideclose={false}
    >
        <div class="text-center">
            <form on:submit|preventDefault={checkPassword} class="flex flex-col space-y-4">
                <div>
                    <Label for="password" class="mb-2">Password:</Label>
                    <Input
                        id="password"
                        type="password"
                        bind:value={password}
                        placeholder="Enter password"
                        required
                    />
                </div>
                {#if errorMessage}
                    <p class="text-red-500 text-sm">{errorMessage}</p>
                {/if}
                <Button type="submit" class="primary">Submit</Button>
            </form>
        </div>
    </Modal>
{/if}

{#if !blocked}
    <div class="top-container">
        <h1>Create a Campaign</h1>
    </div>
    <div class="main-container">
        <h3>Campaign Information</h3>
        <div class="mb-4">
            <Label for="campaign" class="block mb-2">Campaign Name</Label>
            <Input
                id="campaign"
                type="text"
                placeholder="Enter campaign name"
                class="mb-4 w-full"
                bind:value={name}
            />
        </div>

        <form on:submit|preventDefault={createJson} class="campaign-info">
            <Label for="description" class="block mb-2">Campaign Description</Label>
            <Input
                id="description"
                type="text"
                placeholder="Enter campaign description"
                class="mb-4 w-full"
                bind:value={description}
            />
            <!-- Make a text box -->
            <Label for="briefing" class="block mb-2">Campaign Briefing</Label>
            <Input
                id="briefing"
                type="text"
                placeholder="Enter campaign briefing"
                class="mb-4 w-full"
                bind:value={briefing}
            />
            <Label for="question" class="block mb-2">Campaign Question</Label>
            <Input
                id="question"
                type="text"
                placeholder="Enter question to solve in campaign"
                class="mb-4 w-full"
                bind:value={question}
            />
            <Label for="finalAnswers" class="block mb-2">Final Answers</Label>
            <Input
                id="finalAnswers"
                type="text"
                placeholder="Enter valid campaign solutions (Comma Separated)"
                class="mb-4 w-full"
                bind:value={finalAnswers}
            />

            <h3>Character Information</h3>

            <Label for="characterName" class="block mb-2">Character Name</Label>
            <Input
                id="characterName"
                type="text"
                placeholder="Enter character name"
                class="mb-4 w-full"
                bind:value={characterName}
            />
            <Label for="jobTitle" class="block mb-2">Job Title</Label>
            <Input
                id="jobTitle"
                type="text"
                placeholder="Enter job title"
                class="mb-4 w-full"
                bind:value={jobTitle}
            />
            <Label for="voice" class="block mb-2">Character Voice</Label>
            <Select
                id="voice"
                bind:value={selected}
                class="mb-4 w-full" />
            <Label for="characterDescription" class="block mb-2">Character Description</Label>
            <Input
                id="characterDescription"
                type="text"
                placeholder="Enter character description"
                class="mb-4 w-full"
                bind:value={characterDescription}
            />
            <Label for="finalAnswers" class="block mb-2">Final Answers</Label>
            <Input
                id="finalAnswers"
                type="text"
                placeholder="Enter valid campaign solutions (Comma Separated)"
                class="mb-4 w-full"
                bind:value={finalAnswers}
            />
            <Button type="submit" class="primary">Create Campaign</Button>
        </form>
    </div>

{/if}

<style>
    .top-container {
        padding: 2rem;
        background-color: #f9fafb;
        border-bottom: 1px solid #e5e7eb;
        font-size: x-large;
    }
    .main-container {
        padding: 2rem;
    }
    h3 {
        margin-bottom: 1rem;
    }
</style>