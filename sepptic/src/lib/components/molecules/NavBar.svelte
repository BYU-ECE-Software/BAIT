<script lang="ts">
    import { page } from '$app/state';
    import { Navbar, NavBrand, NavLi, NavUl, NavHamburger, Avatar, Dropdown, DropdownHeader, DropdownItem, DropdownDivider, DarkMode} from 'flowbite-svelte';
    $: activeUrl = page.url.pathname;
    $: email = page.data.email ?? "Unknown";
    import { invalidateAll } from '$app/navigation'; // To refresh the session
    import {signOut} from "$lib/auth.svelte";

    async function logOut() {
        try {
            const res = await fetch('/api/auth', { method: 'DELETE', credentials: 'include'});

            if (res.ok) {
                await invalidateAll(); // Refresh session data
                console.log('invalidate session');
                signOut();

            } else {
                console.error("Logout failed");
            }
        } catch (err) {
            console.error("Error signing out:", err);
        }
    }

</script>

<Navbar color="dark">
    <NavBrand href="/">
        <img src="/SEPPTIC.png" class="me-3 h-6 sm:h-9" alt="SEPPTIC logo" />
        <span class="self-center whitespace-nowrap text-xl font-semibold dark:text-seppticRed-600 text-seppticRed-600">
            SEPPTIC
        </span>
    </NavBrand>


    <!-- Right Section: Avatar and Hamburger Menu -->
    <div class="flex items-center md:order-2">
        <NavHamburger />
        <Avatar id="avatar-menu" src="/HackerProfile.png" class="mr-2" /> <!-- Added margin-right -->
        <DarkMode /> <!-- Added margin-left -->
    </div>
    <Dropdown placement="bottom" triggeredBy="#avatar-menu">
        <DropdownHeader>
            <!-- <span class="block text-sm">Script Kiddie</span> -->
            <span class="block truncate text-sm font-medium">{email}</span>
        </DropdownHeader>
        <DropdownItem href="/main/dashboard">Dashboard</DropdownItem>
        <DropdownDivider />
        <DropdownItem on:click={logOut}>Sign out</DropdownItem>
    </Dropdown>

    <!-- Navbar Items -->
    <NavUl {activeUrl} >
        <NavLi href="/main">Home</NavLi>
        <NavLi href="/main/about">About</NavLi>
        <NavLi href="/main/contact">Contact</NavLi>
        <NavLi href="/main/campaigns">Campaigns</NavLi>
        <NavLi href="/main/learn">Learn</NavLi>
    </NavUl>
</Navbar>