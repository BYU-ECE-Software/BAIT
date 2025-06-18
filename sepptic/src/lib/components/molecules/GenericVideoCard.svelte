<script lang="ts">
  export let src: string;          // e.g. "/videos/my-video.mp4"
  export let captions: string;     // e.g. "/videos/my-video.en.vtt"
</script>

<div class="w-full aspect-video">
  <video
    class="w-full h-full block rounded-md"
    controls
    preload="metadata"
  >
    <source src={src} type="video/mp4" />

    <!-- This track element satisfies Svelte’s a11y check -->
    <track
      kind="captions"
      src={captions}
      srclang="en"
      label="English captions"
      default
    />

    <!-- Fallback text if <video> isn’t supported -->
    Sorry, your browser doesn’t support embedded videos.
  </video>
</div>