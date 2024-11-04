// src/lib/themes/theme.ts
import type { CampaignThemes, CampaignName, ThemeVariables } from './themeTypes';


export const themes: CampaignThemes = {
  default: {
    '--color-primary': '#4CAF50',
    '--color-secondary': '#FFFFFF',
    '--color-tertiary': '#333333',
    '--color-four': '#F1F1F1',
    '--color-five': '#F44336',
    '--color-six': '#FFC107',
    '--background-color': '#FAFAFA',
    '--text-color-one': '#333333',
    '--text-color-two': '#555555',
  },
  campaign1: {
    '--color-primary': '#FF5722',
    '--color-secondary': '#37474F',
    '--color-tertiary': '#FAFAFA',
    '--color-four': '#212121',
    '--color-five': '#2196F3',
    '--color-six': '#03A9F4',
    '--background-color': '#ECEFF1',
    '--text-color-one': '#FAFAFA',
    '--text-color-two': '#B0BEC5',
  },
  campaign2: {
    '--color-primary': '#673AB7',
    '--color-secondary': '#EDE7F6',
    '--color-tertiary': '#FFFFFF',
    '--color-four': '#512DA8',
    '--color-five': '#FFEB3B',
    '--color-six': '#CDDC39',
    '--background-color': '#F3E5F5',
    '--text-color-one': '#212121',
    '--text-color-two': '#757575',
  },
};

export function applyTheme(campaign: CampaignName): void {
  const theme: ThemeVariables = themes[campaign];

  if (!theme) {
    console.error(`Campaign ${campaign} does not exist. Falling back to default theme.`);
    return applyTheme('default'); // Apply default theme as a fallback
  }
  console.log(`Applying theme: ${campaign}`); // Check if this is logged
  Object.keys(theme).forEach((variable) => {
    const value = theme[variable as keyof ThemeVariables]; // Explicit typing
    if (value) {
      document.documentElement.style.setProperty(variable, value);
    } else {
      console.warn(`Variable ${variable} is not defined for ${campaign}.`);
    }
  });
}
