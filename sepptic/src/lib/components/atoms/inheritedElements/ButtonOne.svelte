<script lang="ts">
    import {RootButton} from '$lib'; // Import the base component
  
    // Define props for custom text and colors
    export let text = 'Primary Button';           // Button text
    export let bgColor = '--color-primary';               // Background color
    export let textColor = '--color-tertiary';             // Text color
    export let hoverBgColor = '#0056b3';          // Background color on hover
    export let hoverTextColor = '#ffffff';        // Text color on hover
  
    // Internal states for hover effects
    let currentBgColor = bgColor;
    let currentTextColor = textColor;
  </script>
  
  <RootButton
    style="background-color: {currentBgColor}; color: {currentTextColor};"
    on:mouseover={() => {
      currentBgColor = hoverBgColor;
      currentTextColor = hoverTextColor;
    }}
    on:mouseout={() => {
      currentBgColor = bgColor;
      currentTextColor = textColor;
    }}
  >
    {text} <!-- Inject custom text -->
  </RootButton>
  