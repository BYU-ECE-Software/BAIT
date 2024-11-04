<script lang="ts">
  import RootButton from '$lib/components/atoms/rootElements/RootButton.svelte';

  export let bgColor = 'var(--color-primary)';
  export let textColor = 'var(--color-tertiary)';
  export let hoverBgColor = '#0056b3';
  export let hoverTextColor = '#ffffff';

  export let size = 'large';
  export let borderRadius = '2.75rem';
  export let padding = '0.5rem 1rem';
  export let disabled = false;
  export let border = 'none';
  export let onClick: () => void = () => {};
</script>

<RootButton
        size={size}
        borderRadius={borderRadius}
        padding={padding}
        disabled={disabled}
        border={border}
        textColor={textColor}
        backgroundColor={bgColor}
        hoverTextColor={hoverTextColor}
        hoverBackgroundColor={hoverBgColor}
        onClick={onClick}
>
  <slot>Color Button</slot>
</RootButton>
