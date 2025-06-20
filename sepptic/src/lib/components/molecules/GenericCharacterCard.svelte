<script lang="ts">
  import { Avatar } from "flowbite-svelte";
  import { BadgeCheckOutline, MessageDotsOutline } from "flowbite-svelte-icons";
  import { QuizSubmission } from "$lib";

  let selectedThread = $state<{
    contact: string;
    characterId: number;
    messages: { sender: string; content: string; timestamp: string }[];
  } | null>(null);

  let {
    character,
    campaignId,
    updateIntel,
    messageData = {}
  } = $props<{ campaignId: string }>();

  const name = character.Name;
  const title = character.Title;
  const image = character.Image;
  const characterId = character.ID;
  const description = character.Description;

</script>

<!-- For an 8×8 rem square, stack content top-to-bottom -->
<div class="flex flex-col items-center justify-center w-70 h-70 aspect-square p-4 space-y-1">
  <Avatar class="object-cover w-25 h-25 rounded-full">
    <img src="{image}" alt="{name} headshot" />
  </Avatar>

<div class="text-center overflow-hidden">
  <div class="text-sm font-medium leading-snug truncate underline text-black dark:text-white">
    {name}
  </div>
  <div class="text-xs font-semibold truncate underline text-gray-800 dark:text-gray-200">
    {title}
  </div>
  <p class="text-xs text-gray-500 dark:text-gray-400">
    {description}
  </p>
</div>
</div>
