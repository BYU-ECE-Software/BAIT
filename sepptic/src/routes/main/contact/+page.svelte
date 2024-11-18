<script>
    // Placeholder team members data
    let teamMembers = [
        {
            name: "Ethan Beere",
            role: "Team Manager",
            bio: "Leads the team with vision and strategy.",
            linkedin: "https://www.linkedin.com/in/ethan-beere/",
            email: "ecb62@byu.edu",
        },
        {
            name: "Elliot Delay",
            role: "Storyboard and API Director",
            bio: "Develops the campaigns and their stories.",
            linkedin: "https://www.linkedin.com/in/elliot-delay-098ab5231/",
            email: "delay0@byu.edu",
        },
        {
            name: "Nicholas Hague",
            role: "PoC and UI developer",
            bio: "Primary contact and works on some web development.",
            linkedin: "https://www.linkedin.com/in/nicholashague8/",
            email: "nickh8@byu.edu",
        },
        {
            name: "Zachary Hansen",
            role: "Database Developer",
            bio: "Manages the Database and how it connects to other facets.",
            linkedin: "https://www.linkedin.com/in/zachary-j-hansen/",
            email: "zac99@byu.edu",
        },
        {
            name: "Tyler Holland",
            role: "Team Leader",
            bio: "Leads the team when Ethan is busy, tells jokes.",
            linkedin: "https://www.linkedin.com/in/tyler-holland-0a0459156/",
            email: "tyho99@byu.edu",
        },
        {
            name: "Matthew Taylor",
            role: "Frontend Director",
            bio: "Does most of the visual work for the application.",
            linkedin: "#",
            email: "mtaylo48@byu.edu",
        },
        {
            name: "Garrett White",
            role: "Token Engineer",
            bio: "Does frontend work that is pretty good.",
            linkedin: "#",
            email: "gw263@byu.edu",
        },
        // Add more members as needed
    ];
    teamMembers = teamMembers.sort(() => Math.random() - 0.5);
</script>

<div class="max-w-6xl mx-auto px-4 py-8">
    <h1 class="text-3xl font-bold text-center mb-6 text-seppticRed-500 dark:text-seppticRed-300">About Us</h1>
    <p class="text-center text-seppticGray-500 dark:text-seppticGray-300 mb-8">
        Meet our amazing team!
    </p>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {#each teamMembers as member}
            <div class="border rounded-lg p-4 text-center shadow-sm bg-seppticGray-50 dark:bg-seppticGray-900 text-seppticGray-900 dark:text-seppticGray-50">
                <h2 class="text-xl font-bold text-seppticRed-500 dark:text-seppticRed-300">{member.name}</h2>
                <p class="text-seppticGray-700 dark:text-seppticGray-300">{member.role}</p>
                <p class="text-seppticGray-600 dark:text-seppticGray-400 text-sm mt-2">{member.bio}</p>
                <div class="flex justify-center gap-4 mt-4">
                    {#if member.linkedin}
                        <a href={member.linkedin} target="_blank" class="text-seppticOrange-500 dark:text-seppticOrange-300 hover:underline">
                            LinkedIn
                        </a>
                    {/if}
                    {#if member.email}
                        <a href={`mailto:${member.email}`} class="text-seppticGray-800 dark:text-seppticGray-50 hover:underline">
                            Email
                        </a>
                    {/if}
                </div>
            </div>
        {/each}
    </div>
</div>