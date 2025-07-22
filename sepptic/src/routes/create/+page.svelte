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
    let image = "";
    let website = "";
    let video = "";
    let question = "";
    let finalAnswers = "";
    let campaignName = "";
    let characterName = "";
    let jobTitle = "";
    let characterDescription = "";
    let characterVoice = "";
    let callOrText = "";
    let timeLimit = "";
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

    function createJson() {
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
            Characters: [
                {
                    ID: 1,
                    Name: characterName,
                    Title: jobTitle,
                    Voice: characterVoice,
                    CallorText: callOrText,
                    Description: characterDescription,
                    CallLimit: timeLimit
                }
            ]
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
        <h1 class="w-auto">Create a Campaign</h1>
    </div>
    <div class="main-container">

        <h3>Campaign Information</h3>

        <div class="mb-4">
            <Label for="campaignName" class="block mb-2">Campaign Name</Label>
            <Input
                id="campaignName"
                type="text"
                placeholder="Enter campaign name"
                class="mb-4 w-full"
                bind:value={campaignName}
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
            <Label for="characterVoice" class="block mb-2">Character Voice</Label>
            <Select
                class="mb-4 w-full" 
                items={voices}
                bind:value={characterVoice}
                />
            <Label for="callOrText" class="block mb-2">Call or Text?</Label>
            <Select
                class="mb-4 w-full" 
                items={callOrTextOptions}
                bind:value={callOrText}
                />
            <Label for="timeLimit" class="block mb-2">Call Time Limit</Label>
            <Select
                class="mb-4 w-full" 
                items={timeLimits}
                bind:value={timeLimit}
                />
            <Label for="characterDescription" class="block mb-2">Character Description</Label>
            <Input
                id="characterDescription"
                type="text"
                placeholder="Enter character description"
                class="mb-4 w-full"
                bind:value={characterDescription}
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