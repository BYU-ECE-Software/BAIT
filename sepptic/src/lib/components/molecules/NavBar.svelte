<script>
    import { Navbar, NavBrand, NavLi, NavUl, NavHamburger } from 'flowbite-svelte';
</script>

<Navbar>
    <NavBrand href="/">
        <img src="/SEPPTIC.png" class="me-3 h-6 sm:h-9" alt="SEPPTIC Logo" />
        <span class="self-center whitespace-nowrap text-xl font-semibold dark:text-white">SEPPTIC</span>
    </NavBrand>
    <NavHamburger />
    <NavUl >
        <NavLi href="/">Home</NavLi>
        <NavLi href="/about">About</NavLi>
        <NavLi href="/pricing">Pricing</NavLi>
        <NavLi href="/contact">Contact</NavLi>
        <NavLi href="/Profile">Profile</NavLi>
    </NavUl>
</Navbar>