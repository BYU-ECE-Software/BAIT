<script lang="ts">
  export let size = 'medium';
  export let borderRadius = '2.75rem';
  export let padding = '0.5rem 1rem';
  export let disabled = false;
  export let border = 'none';
  export let onClick: () => void = () => {};

  export let textColor = 'var(--text-color-two)';
  export let backgroundColor = 'var(--background-color)';
  export let hoverTextColor = 'var(--text-color-one)';
  export let hoverBackgroundColor = 'var(--color-primary)';

  let isHoveredOrFocused = false;

  // Reactive colors based on state
  $: currentTextColor = isHoveredOrFocused ? hoverTextColor : textColor;
  $: currentBackgroundColor = isHoveredOrFocused ? hoverBackgroundColor : backgroundColor;
</script>

<style>
  .btn {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1rem;
    cursor: pointer;
    user-select: none;
    transition: background-color 0.3s ease, color 0.3s ease, border 0.3s ease;
  }

  .disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }
</style>

<button
        class="btn {size} {disabled ? 'disabled' : ''}"
        disabled={disabled}
        on:click={onClick}
        on:mouseover={() => (isHoveredOrFocused = true)}
        on:mouseout={() => (isHoveredOrFocused = false)}
        on:focus={() => (isHoveredOrFocused = true)}
        on:blur={() => (isHoveredOrFocused = false)}
        style="
    border-radius: {borderRadius};
    padding: {padding};
    border: {border};
    color: {currentTextColor};
    background-color: {currentBackgroundColor};
  "
>
  <slot>Default Button</slot>
</button>
