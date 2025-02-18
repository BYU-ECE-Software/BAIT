<script lang="ts">
    // Define types
    type Message = {
        time: string;
        content: string;
        type: 'sent' | 'received';
        image?: string; // Optional property for messages with images
    };

    type Person = {
        id: number;
        name: string;
        avatar: string;
        messages: Message[];
    };

    // Static list of people
    let people: Person[] = [
        {
            id: 1,
            name: 'Bonnie Green',
            avatar: '/AlbertTay.jpg',
            messages: [
                {
                    time: '11:46',
                    content: 'This is the new office <3',
                    type: 'received',
                    image: '/HarvestaOfficeFloorplan.jpg',
                },
            ],
        },
        {
            id: 2,
            name: 'Jese Leos',
            avatar: '/AlbertTay.jpg',
            messages: [
                {
                    time: '10:30',
                    content: 'How is everything going?',
                    type: 'received',
                },
            ],
        },
    ];

    // State variables
    let selectedPerson: Person | null = null; // Selected person can be null initially
    let newMessage: string = ''; // Message input text

    // Function to select a person
    const selectPerson = (person: Person): void => {
        selectedPerson = person;
    };

    // Function to send a message
    const sendMessage = (message: string): void => {
        if (selectedPerson && message.trim()) {
            // Add the message to the person's message array
            selectedPerson.messages = [
                ...selectedPerson.messages,
                {
                    time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                    content: message,
                    type: 'sent',
                },
            ];

            // Trigger reactivity by reassigning selectedPerson
            selectedPerson = { ...selectedPerson };

            // Clear the input field
            newMessage = '';
        }
    };

</script>

<div class="flex h-screen">
    <!-- Sidebar -->
    <div class="w-1/4 bg-white border-r border-gray-200 dark:bg-gray-700 dark:border-gray-600">
        <ul>
            {#each people as person}
                <li class="border-b border-gray-100 dark:border-gray-600">
                    <button
                            class="w-full text-left flex items-center px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer"
                            on:click={() => selectPerson(person)}
                            type="button"
                    >
                        <img class="me-3 rounded-full w-11 h-11" src={person.avatar} alt={`${person.name} Avatar`} />
                        <div>
                            <p class="text-sm font-medium text-gray-900 dark:text-white">{person.name}</p>
                        </div>
                    </button>
                </li>
            {/each}
        </ul>
    </div>

    <!-- Chat Box -->
    <div class="flex-1 bg-gray-100 p-4">
        {#if selectedPerson}
            <div class="flex flex-col h-full">
                <!-- Header -->
                <div class="flex items-center gap-2 mb-4">
                    <img class="w-10 h-10 rounded-full" src={selectedPerson.avatar} alt={`${selectedPerson.name} Avatar`} />
                    <span class="font-bold text-lg">{selectedPerson.name}</span>
                </div>

                <!-- Message History -->
                <div class="flex-1 overflow-y-auto mb-4">
                    {#each selectedPerson.messages as message}
                        <div
                                class="flex items-start gap-2.5 mb-4"
                                class:justify-end={message.type === 'sent'}
                        >
                            {#if message.type === 'received'}
                                <!-- Avatar for received messages -->
                                <img class="w-8 h-8 rounded-full" src={selectedPerson.avatar} alt="Avatar" />
                            {:else}
                                <!-- Avatar for sent messages -->
                                <img class="w-8 h-8 rounded-full" src="/HackerProfile.png" alt="Your Avatar" />
                            {/if}

                            <div class="flex flex-col gap-1">
                                <div
                                        class="flex flex-col max-w-[326px] p-4 border-gray-200 bg-gray-100 rounded-e-xl dark:bg-gray-700"
                                        class:rounded-es-xl={message.type === 'sent'}
                                >
                                    <div class="flex items-center space-x-2 rtl:space-x-reverse mb-2">
                        <span class="text-sm font-semibold text-gray-900 dark:text-white">
                            {message.type === 'received' ? selectedPerson.name : 'You'}
                        </span>
                                        <span class="text-sm font-normal text-gray-500 dark:text-gray-400">{message.time}</span>
                                    </div>
                                    <p class="text-sm font-normal text-gray-900 dark:text-white">{message.content}</p>
                                    {#if message.image}
                                        <img src={message.image} class="rounded-lg mt-2" alt="rounded message" />
                                    {/if}
                                </div>
                            </div>
                        </div>
                    {/each}
                </div>


                <!-- Input Box -->
                <div class="flex items-center gap-2">
                    <input
                            type="text"
                            placeholder="Type a message..."
                            class="flex-1 p-2 border rounded"
                            bind:value={newMessage}
                            on:keydown={(e) => e.key === 'Enter' && sendMessage(newMessage)}
                    />
                    <button
                            class="p-2 bg-blue-500 text-white rounded"
                            on:click={() => sendMessage(newMessage)}
                    >
                        Send
                    </button>
                </div>
            </div>
        {:else}
            <p class="text-gray-500">Select a person to start chatting.</p>
        {/if}
    </div>
</div>
