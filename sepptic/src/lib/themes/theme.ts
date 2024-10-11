// src/lib/themes/theme.ts
import type { CampaignThemes, CampaignName, ThemeVariables } from './themeTypes';

// Define the themes object with strict types for the campaigns
export const themes: CampaignThemes = {
  default: {
    '--color-primary': '#007bff',
    '--color-secondary': '#ffffff',
    '--color-tertiary': '#ffffff',
    '--color-four': '#ffffff',
    '--color-five': '#ffffff',
    '--color-six': '#ffffff',
    '--background-color': '#ffffff',
    '--text-color-one': '#ffffff',
    '--text-color-two': '#ffffff',
  },
  campaign1: {
    '--color-primary': '#007bff',
    '--color-secondary': '#6c757d',
    '--color-tertiary': '#000000',
    '--color-four': '#ffffff',
    '--color-five': '#ffffff',
    '--color-six': '#ffffff',
    '--background-color': '#ffffff',
    '--text-color-one': '#ffffff',
    '--text-color-two': '#ffffff',
  },
  campaign2: {
    '--color-primary': '#007bff',
    '--color-secondary': '#6c757d',
    '--color-tertiary': '#000000',
    '--color-four': '#ffffff',
    '--color-five': '#ffffff',
    '--color-six': '#ffffff',
    '--background-color': '#ffffff',
    '--text-color-one': '#ffffff',
    '--text-color-two': '#ffffff',
  },
};

// Apply the selected theme based on the campaign name
export function applyTheme(campaign: CampaignName): void {
  const theme: ThemeVariables = themes[campaign]; // Type is inferred correctly
  Object.keys(theme).forEach((variable) => {
    document.documentElement.style.setProperty(variable, theme[variable]);
  });
}

  