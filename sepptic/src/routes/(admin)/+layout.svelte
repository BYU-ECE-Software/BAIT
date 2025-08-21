<script lang="ts">
  import { NavBar } from "$lib";
  import type { LayoutData } from "./$types"; // optional typing
  export let data: LayoutData;                // only if NavBar needs values from load
</script>

<main>
  <NavBar /> 
  <div style="margin-bottom: 1rem;"></div>
  <slot />
</main>

<style>
</style>
