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
            bio: "Primary contact for our mentors/sponsers, and works on web development.",
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
            bio: "He works hard as our co-team leader and builds team moral.",
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
            role: "Frontend Engineer",
            bio: "Helps Matthew with frontend development and builds pages and internal logic.",
            linkedin: "#",
            email: "gw263@byu.edu",
        },
        // Add more members as needed
    ];
    teamMembers = teamMembers.sort(() => Math.random() - 0.5);
</script>

<div class="max-w-screen-xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {#each teamMembers as member}
        <div class="w-full max-w-md mx-auto p-4 border border-seppticGray-300 dark:border-seppticGray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400 text-center shadow-md">
            <h2 class="mb-2 text-2xl font-bold tracking-tight text-seppticRed-500 dark:text-seppticRed-300">{member.name}</h2>
            <p class="mb-3 font-normal text-gray-800 dark:text-gray-300 leading-tight">{member.role}</p>
            <p class="mb-3 font-normal text-gray-700 dark:text-gray-400 leading-tight">{member.bio}</p>
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