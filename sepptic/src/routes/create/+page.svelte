<script lang="ts">
    import type { Character } from "../../server/utils/types/create";
    import { onMount } from "svelte";
    import { Modal, Input, Button, Label, Select, Fileupload } from "flowbite-svelte";
	import { goto } from "$app/navigation";

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

    export let data; // from the layout.svelte

    // Prevent access until authenticated
    onMount(() => {
        //Redirects to /main so there isn't a double modal
        if (!data.isLoggedIn) {
            goto("/main");
            return;
        }
        blocked = true;
    });

    let charactersSelected = false;
    let characterNum = 0;
    let showPromptModal = false;
    let currentCharacter: Character
    function revealCharacters() {
        charactersSelected = true;
        // initializing character with empty placeholders
        characters = Array(Number(characterNum)).fill(null).map((_, index) => ({
            ID: index + 1,
            Name: "",
            Title: "",
            Voice: "",
            Image: "",
            CallorText: 0,
            Description: "",
            CallLimit: 0,
            Prompt: {
                Background: "",
                Weaknesses: "",
                Strengths: "",
                General: "",
                Critical_Info: "",
                Personality: "",
                Contacts: []
            }
        }));
    }

    function openPromptModal(character: Character) {
        showPromptModal = true;
        currentCharacter = character;
    }


    let files: FileList;

    // File upload logic
    async function uploadImage(files: FileList) {
        
       const file = files[0]

        const response = await fetch("/api/image", {
            method: "POST",
            headers: {
                "Content-Type": "application/octet-stream", // basically any binary file
                "X-Filename": file.name
            },
            body: file
        });
        console.log(response.status);
        console.log(files[0]);
    }

    //let selected = "";
    let description = "";
    let briefing = "";
    let image = "";
    let website = "";
    let video = "";
    let question = "";
    let finalAnswers = "";
    let campaignName = "";
    
    let callOrTextOptions = [
        { value: "0", name: "Call" },
        { value: "1", name: "Text" },
        { value: "2", name: "Both" }
    ];
    let voices = [
        { value: "alloy", name: "Female" },
        { value: "ash", name: "Deep Male" },
        { value: "ballad", name: "Female" },
        { value: "coral", name: "Soft Female" },
        { value: "echo", name: "Male" },
        { value: "sage", name: "Firm Female" },
        { value: "shimmer", name: "Male" },
        { value: "verse", name: "Soft Male" }
    ];
    let timeLimits = [
        { value: "60000", name: "1 Minute"},
        { value: "120000", name: "2 Minutes"},
        { value: "180000", name: "3 Minutes"},
        { value: "240000", name: "4 Minutes"},
        { value: "300000", name: "5 Minutes"},
    ]
    let nums = [
        { value: 1, name: "1"},
        { value: 2, name: "2"},
        { value: 3, name: "3"},
        { value: 4, name: "4"},
        { value: 5, name: "5"},
        { value: 6, name: "6"}
    ]

    let characters: Character[] = []

    async function createJson() {
        uploadImage(files)

        const campaignData = {
            Campaign_Information: {
                Name: campaignName,
                Description: description,
                Brief: briefing,
                Image: image,
                Website: website,
                Briefing_Video: video,
                Question: question,
                Final_Answer: finalAnswers.split(',').map(ans => ans.trim())
            },
            Characters: characters
        };
        let data = JSON.stringify(campaignData, null, 2);
        console.log(data);
        try {
            const response = await fetch('/api/saveCampaign', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: data
            });

            if (!response.ok) {
                throw new Error('Failed to save campaign');
            }
            console.log("Campaign saved successfully");
            // Optionally, redirect or show a success message
        } catch (error) {
            console.error("Error saving campaign:", error);
        }
        // save data as a file in server/campaigns
    }
</script>

{#if showModal}
    <Modal
        title="Authentication Required"
        open={showModal}
        outsideclose={false}
        class="max-w-md mx-auto"
    >
        <div class="px-6 py-4">
            <form on:submit|preventDefault={checkPassword} class="space-y-4">
                <div class="space-y-2">
                    <Label for="password" class="block font-medium text-gray-700 dark:text-gray-300">
                        Password:
                    </Label>
                    <Input
                        id="password"
                        type="password"
                        bind:value={password}
                        placeholder="Enter password"
                        class="w-full rounded-md shadow-sm"
                        required
                    />
                </div>
                {#if errorMessage}
                    <p class="text-sm text-red-600 dark:text-red-500">{errorMessage}</p>
                {/if}
                <div class="pt-2">
                    <Button type="submit" class="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-md transition-colors">
                        Submit
                    </Button>
                </div>
            </form>
        </div>
    </Modal>
{/if}

{#if !blocked}
    <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
        <!-- Header -->
        <div class="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
            <div class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                <h1 class="text-2xl font-bold text-gray-900 dark:text-white">Create a Campaign</h1>
                <a href="/main" class="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300">
                    Back to Main
                </a>
            </div>
        </div>

        <!-- Main Content -->
        <div class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
            <div class="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
                <h3 class="text-xl font-semibold mb-6 text-gray-900 dark:text-white">Campaign Information</h3>

                <!-- Campaign Name -->
                <div class="space-y-6">
                    <div>
                        <Label for="campaignName" class="text-sm font-medium text-gray-700 dark:text-gray-300">Campaign Name</Label>
                        <Input
                            id="campaignName"
                            type="text"
                            placeholder="Enter campaign name"
                            class="mt-1"
                            bind:value={campaignName}
                        />
                    </div>

                    <!-- Campaign Form -->
                    <form on:submit|preventDefault={createJson} class="space-y-6">
                        <div class="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg space-y-6">
                            <Label for="description" class="block mb-2">Campaign Description</Label>
                            <Input
                                id="description"
                                type="text"
                                placeholder="Enter campaign description"
                                class="mb-4 w-full"
                                bind:value={description}
                            />
                            <Label for="briefing" class="block mb-2">Campaign Briefing</Label>
                            <Input
                                id="briefing"
                                type="text"
                                placeholder="Enter campaign briefing"
                                class="mb-4 w-full"
                                bind:value={briefing}
                            />
                            <!-- I think this is broken for now -->
                            <Label for="campaignLogo" class="block mb-2">Campaign Logo</Label>
                            <input 
                                id="campaignLogo" 
                                type="file" 
                                accept="image/png, image/jpeg"
                                bind:files={files}
                                placeholder="Select campaign image" 
                                class="mb-4 w-full" 
                            />
                            <Label for="campaignWebsite" class="block mb-2">Campaign Website</Label>
                            <Input
                                id="campaignWebsite"
                                type="text"
                                placeholder="Enter campaign website URL"
                                class="mb-4 w-full"
                                bind:value={website}
                            />
                            <Label for="campaignVideo" class="block mb-2">Campaign Video</Label>
                            <Fileupload
                                id="campaignVideo"
                                class="mb-4 w-full"
                            />
                            <small> Size limit is 512KB </small>
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
                        </div>

                        <!-- Character Selection/Forms -->
                        {#if !charactersSelected}
                            <div class="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg space-y-4">
                                <Label for="characterNumber">Select Character Number</Label>
                                <Select
                                    class="w-full"
                                    items={nums}
                                    bind:value={characterNum}
                                />
                                <Button on:click={revealCharacters} class="w-full sm:w-auto">
                                    Confirm Number of Characters
                                </Button>
                            </div>
                        {:else}
                            <div class="space-y-8">
                                {#each characters as character, index}
                                    <div class="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg">
                                        <h4 class="text-lg font-medium text-gray-900 dark:text-white mb-6 text-center">
                                            Character {index + 1}
                                        </h4>
                                        <div class="grid gap-6">
                                            <!-- Character form fields -->
                                            <div>
                                                <Label for="characterName{index}">Character Name</Label>
                                                <Input
                                                    id="characterName{index}"
                                                    type="text"
                                                    placeholder="Enter character name"
                                                    class="mt-1"
                                                    bind:value={character.Name}
                                                />
                                            </div>
                                            <div>
                                                <Label for="jobTitle{index}">Job Title</Label>
                                                <Input
                                                    id="jobTitle{index}"
                                                    type="text"
                                                    placeholder="Enter job title"
                                                    class="mt-1"
                                                    bind:value={character.Title}
                                                />
                                            </div>
                                            <div>
                                                <Label for="characterImage{index}">Character Image</Label>
                                                <Fileupload
                                                    id="characterImage{index}"
                                                    class="mb-4 w-full"
                                                />
                                            </div>
                                            <div>
                                                <Label for="characterVoice{index}">Character Voice</Label>
                                                <Select
                                                    class="mb-4 w-full" 
                                                    items={voices}
                                                    bind:value={character.Voice}
                                                />
                                            </div>
                                            <div>
                                                <Label for="callOrText{index}">Call or Text?</Label>
                                                <Select
                                                    class="mb-4 w-full" 
                                                    items={callOrTextOptions}
                                                    bind:value={character.CallorText}
                                                />
                                            </div>
                                            <div>
                                                <Label for="timeLimit{index}">Call Time Limit</Label>
                                                <Select
                                                    class="mb-4 w-full" 
                                                    items={timeLimits}
                                                    bind:value={character.CallLimit}
                                                />
                                            </div>
                                            <div>
                                                <Label for="characterDescription{index}">Character Description</Label>
                                                <Input
                                                    id="characterDescription{index}"
                                                    type="text"
                                                    placeholder="Enter character description"
                                                    class="mb-4 w-full"
                                                    bind:value={character.Description}
                                                />
                                            </div>
                                            <div>
                                                <Button type="button" class="mt-4 w-full" on:click={() => openPromptModal(character)}>
                                                    Edit Character Prompt
                                                </Button>
                                            </div>
                                            {#if showPromptModal}
                                                <Modal
                                                    title="Edit Character Prompt"
                                                    open={showPromptModal}
                                                    outsideclose={true}
                                                    on:close={() => showPromptModal = false}
                                                >
                                                    <div class="p-6">
                                                        <!-- Prompt fields -->
                                                        <div class="space-y-4">
                                                            <Label for="background">Background</Label>
                                                            <Input id="background" type="text" bind:value={currentCharacter.Prompt.Background} />
                                                            <Label for="weaknesses">Weaknesses</Label>
                                                            <Input id="weaknesses" type="text" bind:value={currentCharacter.Prompt.Weaknesses} />
                                                            <Label for="strengths">Strengths</Label>
                                                            <Input id="strengths" type="text" bind:value={currentCharacter.Prompt.Strengths} />
                                                            <Label for="general">General Info</Label>
                                                            <Input id="general" type="text" bind:value={currentCharacter.Prompt.General} />
                                                            <Label for="criticalInfo">Critical Info</Label>
                                                            <Input id="criticalInfo" type="text" bind:value={currentCharacter.Prompt.Critical_Info} />
                                                            <Label for="personality">Personality</Label>
                                                            <Input id="personality" type="text" bind:value={currentCharacter.Prompt.Personality} />
                                                        </div>
                                                        <Button class="mt-4 w-full sm:w-auto" on:click={() => showPromptModal = false}>Save</Button>
                                                    </div>
                                                </Modal>
                                            {/if}
                                        </div>
                                    </div>
                                {/each}
                                <div class="flex justify-end mt-6">
                                    <Button type="submit" class="w-full sm:w-auto">Create Campaign</Button>
                                </div>
                            </div>
                        {/if}
                    </form>
                </div>
            </div>
        </div>
    </div>
{/if}

<style>
    /* We can remove most custom CSS and keep only what's absolutely necessary */
    :global(.form-section) {
        @apply space-y-6;
    }
</style>