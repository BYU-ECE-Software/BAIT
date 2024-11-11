<script lang="ts">
    import { Navbar, NavBrand, NavLi, NavUl, NavHamburger, Avatar, Button, Input } from 'flowbite-svelte';
    import { SearchOutline } from 'flowbite-svelte-icons';
</script>

<Navbar>
    <NavBrand href="/">
        <img src="/SEPPTIC.png" class="me-3 h-6 sm:h-9" alt="SEPPTIC logo" />
        <span class="self-center whitespace-nowrap text-xl font-semibold dark:text-white">SEPPTIC</span>
    </NavBrand>

    <!-- Right Section: Avatar and Hamburger Menu -->
    <div class="flex items-center md:order-2">
        <div class="hidden relative md:block me-4">
            <div class="flex absolute inset-y-0 start-0 items-center ps-3 pointer-events-none">
                <SearchOutline class="w-4 h-4" />
            </div>
            <Input id="search-navbar" class="ps-10" placeholder="Search..." />
        </div>
        <Avatar id="avatar-menu" src="/HackerProfile.png" class="me-2" />
        <Button color="none" data-collapse-toggle="mobile-menu-3" aria-controls="mobile-menu-3" aria-expanded="false" class="md:hidden text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-2.5 me-1">
            <SearchOutline class="w-5 h-5" />
        </Button>
        <NavHamburger />
    </div>

    <!-- Navbar Items with Search Bar as the First Item -->
    <NavUl class="md:order-1">
        <NavLi>
            <div class="relative md:hidden">
                <div class="flex absolute inset-y-0 start-0 items-center ps-3 pointer-events-none">
                    <SearchOutline class="w-4 h-4" />
                </div>
                <Input id="search-navbar-mobile" class="ps-10" placeholder="Search..." />
            </div>
        </NavLi>
        <NavLi href="/" >Home</NavLi>
        <NavLi href="/about">About</NavLi>
        <NavLi href="/contact">Contact</NavLi>
    </NavUl>
</Navbar>
