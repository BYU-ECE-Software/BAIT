<script lang="ts">

  export let size = 'medium';
  export let borderRadius = '2.75rem';
  export let padding = '0.5rem 1rem';
  export let disabled = false;
  export let border = 'none';
  export let textColor = 'white';
  export let backgroundColor = '#9E2A2B'
  export let hoverColor = '#E09F3E'

  // Pass-through style and class properties using $$restProps
  export let onClick: () => void = () => {};  // Default click handler
</script>

<style>
  .btn {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1rem;
    cursor: pointer;
    flex-shrink: 0;
    user-select: none;
    transition: background-color 0.3s ease, color 0.3s ease, border 0.3s ease;

  }

  .btn.disabled,
  .btn[disabled] {
    cursor: not-allowed;
    opacity: 0.6;
  }


  .small {
    font-size: 0.8rem;
    padding: 0.25rem 0.5rem;
  }

  .medium {
    font-size: 1rem;
    padding: 0.5rem 1rem;
  }

  .large {
    font-size: 1.25rem;
    padding: 0.75rem 1.5rem;
  }

</style>

<button

  class={`btn ${size} ${disabled ? 'disabled' : ''}`}
  style="border-radius: {borderRadius}; padding: {padding}; border: {border}; color: {textColor}; background-color: {backgroundColor};"
  on:click={onClick}
  disabled={disabled}
  {...$$restProps}
>
  <slot>Default Button</slot>
</button>
