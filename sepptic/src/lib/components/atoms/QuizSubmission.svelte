<script lang="ts">
    import { Button, Input } from 'flowbite-svelte';
    let inputValue = $state('');
    let { correctAnswer, campaignId, characterId, intelId } = $props();
    campaignId = Number(campaignId);

    async function checkAnswer(userAnswer: string) {
        console.log(campaignId, characterId, intelId, userAnswer);
        const response = await fetch('/api/quiz', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                campaignId: campaignId,
                characterId: characterId,
                intelId: intelId,
                userAnswer: userAnswer
            })
        });

        const data = await response.json();
        console.log(data);
        if (data.correct) {
            correctAnswer();
        }
        alert(data.message);
    }
</script>

<div class="flex space-x-4" style="padding: 1rem;">
    <Input bind:value={inputValue} class="focus:border-seppticOrange-600 focus:ring focus:ring-seppticOrange-300" style="padding: 1rem;" placeholder="answer" />
    <Button on:click={() => checkAnswer(inputValue)}>Submit</Button>
</div>