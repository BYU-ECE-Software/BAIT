<script lang="ts">
    import { page } from '$app/stores';
    import { Navbar, NavBrand, NavLi, NavUl, NavHamburger, Avatar, Dropdown, DropdownHeader, DropdownItem,  DarkMode} from 'flowbite-svelte';
    $: activeUrl = $page.url.pathname;
    $: email = $page.data.email ?? "Unknown";
    import { invalidateAll } from '$app/navigation'; // To refresh the session
    import {signOut} from "$lib/auth.svelte";

    async function logOut() {
        try {
            const res = await fetch('/api/auth', { method: 'DELETE', credentials: 'include'});

            if (res.ok) {
                await invalidateAll(); // Refresh session data
                // console.log('invalidate session');
                signOut();

            } else {
                console.error("Logout failed");
            }
        } catch (err) {
            console.error("Error signing out:", err);
        }
    }

</script>

<nav class="w-full flex justify-between items-center bg-gray-50 pl-4 pr-2 py-3 text-black">
    <NavBrand href="/">
            <!-- Light mode logo -->
            <!-- <img src="/BAIT.png" class="me-3 h-6 sm:h-9 rounded-md dark:hidden" alt="SEPPTIC logo light" /> -->
            <!-- Dark mode logo -->
            <!-- <img src="/BAIT-modified.png" class="me-3 h-6 sm:h-9 rounded-md hidden dark:block" alt="SEPPTIC logo dark" /> -->
        <span class="self-center whitespace-nowrap text-xl font-semibold dark:text-seppticRed-600 text-seppticRed-600">
            BAIT
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
        <DropdownItem on:click={logOut}>Sign out</DropdownItem>
    </Dropdown>

    <!-- Navbar Items -->
    <NavUl {activeUrl} >
        <NavLi href="/main">Home</NavLi>
        <NavLi href="/main/learn">Learn</NavLi>
        <NavLi href="/main/campaigns">Campaigns</NavLi>
        <NavLi href="/main/about">About</NavLi>
    </NavUl>
</nav>