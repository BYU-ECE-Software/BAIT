<script lang="ts">
  import RootButton from '$lib/components/atoms/rootElements/RootButton.svelte';

  // Define color props for the button
  export let bgColor = 'var(--color-primary)';
  export let textColor = 'var(--color-tertiary)';
  export let hoverBgColor = '#0056b3';
  export let hoverTextColor = '#ffffff';

  // Same props as RootButton
  export let size = 'medium';
  export let borderRadius = '2.75rem';
  export let padding = '0.5rem 1rem';
  export let disabled = false;
  export let border = 'none';
  export let onClick: () => void = () => {};
</script>

<RootButton
        class="color-btn"
        size={size}
        borderRadius={borderRadius}
        padding={padding}
        disabled={disabled}
        border={border}
        onClick={onClick}
>
  <slot>Color Button</slot>
</RootButton>

<style>
  .color-btn {
    --btn-bg-color: var(--color-primary);
    --btn-text-color: var(--color-tertiary);
    --btn-hover-bg-color: #0056b3;
    --btn-hover-text-color: #ffffff;

    background-color: var(--btn-bg-color);
    color: var(--btn-text-color);
    transition: background-color 0.3s ease, color 0.3s ease;
  }

  .color-btn:hover {
    background-color: var(--btn-hover-bg-color);
    color: var(--btn-hover-text-color);
  }
</style>

