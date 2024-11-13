<script lang="ts">
    import { Blockquote, Rating } from 'flowbite-svelte';
</script>

<figure class="mx-auto max-w-screen-md text-center">
    <!-- Center the Rating horizontally -->
    <div class="flex justify-center mb-4 text-yellow-950">
        <Rating total={5} rating={4.8} iconFillColor="#b72b2b" iconStrokeColor="#b72b2b"/>
    </div>
    <!-- Blockquote -->
    <Blockquote alignment="center" size="4xl">
        "SEPPTIC is the best choice for all of your black hat hacking endeavors"
    </Blockquote>
    <!-- Figcaption -->
    <figcaption class="flex justify-center items-center mt-6 space-x-3 rtl:space-x-reverse">
        <img class="w-6 h-6 rounded-full" src="/AlbertTay.jpg" alt="Albert Tay profile" />
        <div class="flex items-center divide-x-2 rtl:divide-x-reverse divide-gray-300 dark:divide-gray-700">
            <cite class="pe-3 font-medium text-gray-900 dark:text-white">Albert Tay</cite>
            <cite class="ps-3 text-sm font-light text-gray-500 dark:text-gray-400">Fried chicken connoisseur</cite>
        </div>
    </figcaption>
</figure>
