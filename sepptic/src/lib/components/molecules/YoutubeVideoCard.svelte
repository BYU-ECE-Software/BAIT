<script lang="ts">
  export let src: string;
</script>

<div class="w-full aspect-video">
  <iframe
    class="w-full h-full block rounded-md"
    src={src}
    title="Briefing Video"
    frameborder="0"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    referrerpolicy="strict-origin-when-cross-origin"
    allowfullscreen
  ></iframe>
</div>
