<script>
    import { AccordionItem, Accordion } from 'flowbite-svelte';
  </script>
  
<Accordion class="justify-center w-full max-w-4xl mx-auto" activeClass="bg-seppticOrange-600 hover:bg-seppticOrange-700 text-white focus:ring-4 focus:ring-seppticOrange-400 focus:outline-none w-full" inactiveClass="text-gray-500 dark:text-gray-400 hover:bg-blue-100 dark:hover:bg-gray-800">
<AccordionItem>
    <span slot="header">Pretexting</span>
    <p class="mb-2 text-gray-500 dark:text-gray-400">Pretexting uses a deceptive identity as the “pretext” for establishing trust, such as directly impersonating a vendor or a facility employee. This approach requires the attacker to interact with you more proactively. The exploit follows once they’ve convinced you they are legitimate.</p>
    <p class="text-gray-500 dark:text-gray-400">
    For more information, check out the helpful links below: 
    </p>
    <ul class="list-disc ps-5 dark:text-gray-400 text-gray-500">
        <li>
            <a href="/" target="_blank" rel="noreferrer" class="text-blue-600 dark:text-blue-500 hover:underline"> What is pretexting?</a>
        </li>
        <li>
            <a href="https://tailwindui.com/" rel="noreferrer" target="_blank" class="text-blue-600 dark:text-blue-500 hover:underline"> How can I protect myself from pretexting attacks?</a>
        </li>
        </ul>
</AccordionItem>
<AccordionItem>
    <span slot="header">Phishing</span>
    <p class="mb-2 text-gray-500 dark:text-gray-400">Allow me to be up front with you my good sir or madam. There are numerous venues by which an individual may attempt to phish for your information. Perchance too many to discuss, I fear...</p>
    <ul class="list-disc ps-5 dark:text-gray-400 text-gray-500">
    <li>
        <a href="/" target="_blank" rel="noreferrer" class="text-blue-600 dark:text-blue-500 hover:underline"> Where are the best fishing spots near me? </a>
    </li>
    <li>
        <a href="https://tailwindui.com/" rel="noreferrer" target="_blank" class="text-blue-600 dark:text-blue-500 hover:underline"> Can I still use my fishing rod if it bends a bit to the left or do I need to make a trip to Costco?</a>
    </li>
    </ul>
</AccordionItem>
<AccordionItem>
    <span slot="header">Baiting</span>
    <p class="mb-2 text-gray-500 dark:text-gray-400">Baiting abuses your natural curiosity to coax you into exposing yourself to an attacker. Typically, potential for something free or exclusive is the manipulation used to exploit you. The attack usually involves infecting you with malware. Popular methods of baiting can include: USB drives left in public spaces, like libraries and parking lots and email attachments including details on a free offer, or fraudulent free software.</p>
    <p class="text-gray-500 dark:text-gray-400">
    For more information, check out the helpful links below: 
    </p>
    <ul class="list-disc ps-5 dark:text-gray-400 text-gray-500">
        <li>
            <a href="/" target="_blank" rel="noreferrer" class="text-blue-600 dark:text-blue-500 hover:underline"> What is baiting?</a>
        </li>
        <li>
            <a href="https://tailwindui.com/" rel="noreferrer" target="_blank" class="text-blue-600 dark:text-blue-500 hover:underline"> What kind of bait should I use to catch bass? Trout?</a>
        </li>
        </ul>
</AccordionItem>
</Accordion>