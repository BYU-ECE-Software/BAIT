<script>
    // Define props to customize the button
    export let text = 'Campaign';            // Default button text
    export let color = '#CEDCE0';            // Default button background color
    export let hoverColor = '#335C67';       // Button color on hover
    export let clickColor = '#540B0E';       // Button color on click
    export let textColor = '#000000';        // Default text color
    export let hoverTextColor = '#FFFFFF';   // Text color on hover
    export let clickTextColor = '#FFFFFF';   // Text color on click
    export let size = 'medium';              // Button size (small, medium, large)
    export let borderRadius = '2.75rem';     // Border radius
    export let padding = '0.5rem 1rem';      // Button padding
    export let disabled = false;             // Disable button functionality
    export let border = 'none';
  
    let bgColor = color;                     // Background color state
    let currentTextColor = textColor;        // Text color state
  </script>
  
  <style>
    .btn {
      display: flex;
      width: 11.375rem;
      height: 5.75rem;
      padding: 1.5625rem;
      justify-content: center;
      align-items: center;
      gap: 1.5625rem;
      flex-shrink: 0;
      cursor: pointer;
      transition: background-color 0.2s ease-in-out, color 0.2s ease-in-out;
    }
  
    .btn:active {
      transition: background-color 0.1s ease-in-out, color 0.1s ease-in-out;
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
    on:mouseover={() => {
      bgColor = hoverColor;
      currentTextColor = hoverTextColor;
    }}
    on:mouseout={() => {
      bgColor = color;
      currentTextColor = textColor;
    }}
    on:focus={() => {
      bgColor = hoverColor;
      currentTextColor = hoverTextColor;
    }}
    on:blur={() => {
      bgColor = hoverColor;
      currentTextColor = hoverTextColor;
    }}
    on:mousedown={() => {
      bgColor = clickColor;
      currentTextColor = clickTextColor;
    }}
    on:mouseup={() => {
      bgColor = hoverColor;           // Reset to hover background color
      currentTextColor = hoverTextColor;  // Reset to hover text color
    }}
    style="
      background-color: {bgColor};
      color: {currentTextColor};
      border-radius: {borderRadius};
      padding: {padding};
      border: {border};
    "
    disabled={disabled}
  >
    {text}
  </button>
  