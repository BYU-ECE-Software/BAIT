<script>
    import { AccordionItem, Accordion } from 'flowbite-svelte';
  </script>
  
<Accordion class="justify-center w-full max-w-4xl mx-auto" activeClass="bg-seppticOrange-600 hover:bg-seppticOrange-700 text-white focus:ring-4 focus:ring-seppticOrange-400 focus:outline-none w-full" inactiveClass="text-gray-500 dark:text-gray-400 hover:bg-blue-100 dark:hover:bg-gray-800">
<AccordionItem>
    <span slot="header">Urgency</span>
    <p class="mb-2 text-gray-500 dark:text-gray-400">Urgency is a tactic where the attacker creates a sense of immediate need or time pressure to compel a target to act quickly without fully analyzing the situation. The attacker might pose as someone requiring critical information to resolve an "emergency" that affects the company, such as a system outage or a deadline-sensitive issue.</p>
    <b class="text-gray-500 dark:text-gray-400">Example Use Case:</b>
    <p class="mb-2 text-gray-500 dark:text-gray-400">An attacker emails an employee, claiming to be from the IT department and requesting their login credentials urgently to prevent their account from being locked due to "suspicious activity." This pressure often leads victims to bypass usual verification steps and act impulsively, divulging sensitive information or performing unauthorized actions.</p>
</AccordionItem>
<AccordionItem>
    <span slot="header">Authority</span>
    <p class="mb-2 text-gray-500 dark:text-gray-400">Authority exploits the human tendency to comply with figures of power or influence. Attackers often impersonate high-ranking officials, managers, or external auditors to create the illusion that the request is legitimate and must be fulfilled.</p>
    <b class="text-gray-500 dark:text-gray-400">Example Use Case:</b>
    <p class="mb-2 text-gray-500 dark:text-gray-400">An attacker pretending to be the CEO calls a finance employee and instructs them to expedite a payment or share confidential financial data. The appearance of authority makes the victim hesitant to question the request, fearing repercussions or believing the action is necessary.</p>
</AccordionItem>
<AccordionItem>
    <span slot="header">Impersonation</span>
    <p class="mb-2 text-gray-500 dark:text-gray-400">Impersonation involves the attacker pretending to be someone who has authorized access to sensitive data, such as a coworker, vendor, or partner organization representative. This tactic often relies on pre-gathered information to build credibility.</p>
    <b class="text-gray-500 dark:text-gray-400">Example Use Case:</b>
    <p class="mb-2 text-gray-500 dark:text-gray-400">An attacker posing as a trusted IT technician calls an employee and claims to need their login credentials to fix an ongoing network issue. By leveraging their "insider" knowledge, the attacker gains the victim's trust and successfully extracts sensitive data or system access.</p>
</AccordionItem>
<AccordionItem>
    <span slot="header">Quid Pro Quo</span>
    <p class="mb-2 text-gray-500 dark:text-gray-400">Quid pro quo operates on the principle of exchanging something of value for the desired information. The attacker offers a benefit or service, such as resolving a problem, providing a reward, or sharing a secret, to persuade the victim to comply.</p>
    <b class="text-gray-500 dark:text-gray-400">Example Use Case:</b>
    <p class="mb-2 text-gray-500 dark:text-gray-400">An attacker calls a receptionist and offers free software access in exchange for network credentials. The promise of a benefit blinds the victim to the potential security risks and encourages them to comply with the request.</p>
</AccordionItem>
<AccordionItem>
    <span slot="header">Intimidation</span>
    <p class="mb-2 text-gray-500 dark:text-gray-400">Intimidation relies on fear or threats to coerce the target into divulging information or taking action. Attackers may threaten consequences, such as job loss, legal action, or harm to the company, to create panic and force compliance.</p>
    <b class="text-gray-500 dark:text-gray-400">Example Use Case:</b>
    <p class="mb-2 text-gray-500 dark:text-gray-400">An attacker pretending to be from a law enforcement agency contacts an employee and demands access to confidential records, claiming that failure to comply will lead to legal repercussions. The fear of potential consequences can cause the victim to bypass normal procedures and hand over sensitive data.</p>
</AccordionItem>
<AccordionItem>
    <span slot="header">Pretexting</span>
    <p class="mb-2 text-gray-500 dark:text-gray-400">Pretexting is a form of social engineering where the attacker fabricates a convincing scenario or story (pretext) to gain the victim's trust and manipulate them into sharing sensitive information. This technique relies heavily on research and preparation to make the pretext believable.</p>
    <b class="text-gray-500 dark:text-gray-400">Example Use Case:</b>
    <p class="mb-2 text-gray-500 dark:text-gray-400">An attacker calls an employee, claiming to be from the company’s payroll department, and requests confirmation of their Social Security Number and bank account details to "process a payroll issue." By presenting a plausible scenario and appearing helpful, the attacker can trick the victim into disclosing sensitive information.</p>
    <p class="text-gray-500 dark:text-gray-400">
    For more information, check out the helpful links below: 
    </p>
    <ul class="list-disc ps-5 dark:text-gray-400 text-gray-500">
        <li>
            <a href="/sepptic/static" target="_blank" rel="noreferrer" class="text-blue-600 dark:text-blue-500 hover:underline"> What is pretexting?</a>
        </li>
        <li>
            <a href="https://tailwindui.com/" rel="noreferrer" target="_blank" class="text-blue-600 dark:text-blue-500 hover:underline"> How can I protect myself from pretexting attacks?</a>
        </li>
        </ul>
</AccordionItem>
<AccordionItem>
    <span slot="header">Phishing</span>
    <p class="mb-2 text-gray-500 dark:text-gray-400">Phishing is a widespread social engineering technique where attackers use deceptive emails, text messages, or websites to trick victims into providing sensitive data, such as login credentials or financial information. These communications often appear to be from trusted sources, like banks, colleagues, or popular services, and frequently incorporate urgency to drive action.</p>
    <b class="text-gray-500 dark:text-gray-400">Example Use Case:</b>
    <p class="mb-2 text-gray-500 dark:text-gray-400">An attacker sends an email disguised as an alert from the company’s IT department, instructing employees to click a link to "reset their password due to suspicious login activity." The link leads to a fake login page designed to capture their credentials, which the attacker then uses to access the company’s systems.</p>
    <ul class="list-disc ps-5 dark:text-gray-400 text-gray-500">
    <li>
        <a href="https://en.wikipedia.org/wiki/Phishing" target="_blank" rel="noreferrer" class="text-blue-600 dark:text-blue-500 hover:underline"> More phishing information</a>
    </li>
    <li>
        <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ" rel="noreferrer" target="_blank" class="text-blue-600 dark:text-blue-500 hover:underline"> Dangers of phishing</a>
    </li>
    </ul>
</AccordionItem>
<AccordionItem>
    <span slot="header">Baiting</span>
    <p class="mb-2 text-gray-500 dark:text-gray-400">Baiting involves luring a target with a tempting offer or incentive to manipulate them into revealing information or compromising security. The "bait" can take many forms, such as free software, gift cards, or even physical items like USB drives planted in public places.</p>
    <b class="text-gray-500 dark:text-gray-400">Example Use Case:</b>
    <p class="mb-2 text-gray-500 dark:text-gray-400">An attacker leaves a USB drive labeled “Confidential Payroll Data” in a company break room, knowing someone might pick it up and insert it into their computer. The USB drive contains malicious software that, once executed, gives the attacker access to the company’s network. The promise of valuable information piques curiosity and leads the victim to take risky actions.</p>
    <p class="text-gray-500 dark:text-gray-400">
    For more information, check out the helpful links below: 
    </p>
    <ul class="list-disc ps-5 dark:text-gray-400 text-gray-500">
        <li>
            <a href="/sepptic/static" target="_blank" rel="noreferrer" class="text-blue-600 dark:text-blue-500 hover:underline"> What is baiting?</a>
        </li>
        <li>
            <a href="https://tailwindui.com/" rel="noreferrer" target="_blank" class="text-blue-600 dark:text-blue-500 hover:underline"> What kind of bait should I use to catch bass? Trout?</a>
        </li>
        </ul>
</AccordionItem>
</Accordion>