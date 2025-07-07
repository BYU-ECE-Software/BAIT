
<script>
    let teamMembers = [
        
        {
            name: "Jackson Knepper",
            role: "Backend Engineer",
            linkedin: "https://www.linkedin.com/in/jacksonknepper/",
        },
        {
            name: "Spencer Smith",
            role: "Frontend Engineer",
            linkedin: "https://www.linkedin.com/in/spencer-smith2003",
        },
        {
            name: "Ezra Bradley",
            role: "UI/UX Designer",
            linkedin: "https://www.linkedin.com/in/ezra-bradley-63a062262",
        },
        {
            name: "Jonathan Houston",
            role: "Storyboard Developer",
            linkedin: "https://www.linkedin.com/",
        },
        {
            name: "Derek Hansen",
            role: "Project Sponsor",
            linkedin: "https://www.linkedin.com/",
        },
        {
            name: "Benjamin Schooley",
            role: "Project Sponsor",
            linkedin: "https://www.linkedin.com/",
        }
    ];
</script>

<p class="max-w-screen-xl mx-auto text-gray-800 text-base leading-relaxed px-4 pb-2">
    <strong>BAIT</strong> (Behavioral Attack and Influence Training) is a social engineering training platform developed to help individuals recognize and defend against social engineering tactics. Originally launched as a capstone project by seniors at Brigham Young University, BAIT has since grown into an ongoing departmental initiative supported by many students. Its mission is to increase awareness and resilience by providing practical, hands-on experiences in identifying manipulative behaviors commonly used in cyber and physical security breaches.
</p>

<div class="max-w-screen-xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

    {#each teamMembers as member}
        <div class="w-full max-w-md mx-auto p-4 border border-seppticGray-300 dark:border-seppticGray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400 text-center shadow-md">
            <h2 class="mb-2 text-2xl font-bold tracking-tight text-black dark:text-white">{member.name}</h2>
            <p class="mb-3 font-normal text-gray-500 dark:text-gray-400 leading-tight">{member.role}</p>
            <p class="mb-3 font-normal text-gray-700 dark:text-gray-300 leading-tight">{member.bio}</p>
            <div class="flex justify-center gap-4 mt-4">
                {#if member.linkedin}
                    <a href={member.linkedin} target="_blank" class="text-seppticOrange-500 dark:text-seppticOrange-300 hover:underline">
                        LinkedIn
                    </a>
                {/if}
            </div>
        </div>
    {/each}
</div>
<br>
<div class="pb-20 flex flex-col md:flex-column items-center justify-center gap-8 mx-auto text-center">
    <div class="flex flex-col md:flex-row gap-4 mt-4">
        <a href="https://qualtricsxm997pm86gx.qualtrics.com/jfe/form/SV_5pXjr4zF0gfOZMi" 
           target="_blank" 
           class="bg-red-500 hover:bg-red-700 text-white md:text-3xl font-bold py-10 px-10 rounded">
            Report a Bug
        </a>
    </div>
</div>