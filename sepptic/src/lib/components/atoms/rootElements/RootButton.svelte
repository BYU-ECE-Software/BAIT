<script lang="ts">
  // Define props for common styles and behaviors
  export let size = 'medium';                 // Size variant (small, medium, large)
  export let borderRadius = '2.75rem';        // Border radius
  export let padding = '0.5rem 1rem';         // Default padding for buttons
  export let disabled = false;                // Disable button functionality
  export let border = 'none';                 // Button border style

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

  /* Size variants */
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
  style="border-radius: {borderRadius}; padding: {padding}; border: {border};"
  on:click={onClick}
  disabled={disabled}
  {...$$restProps}
>
  <slot>Default Button</slot> <!-- Slot to allow children to inject content -->
</button>
