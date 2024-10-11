// src/lib/themes/themeTypes.ts

// Define a type for CSS variables as key-value pairs
export type ThemeVariables = {
    [key: string]: string;
  };
  
  // Define a type for the names of campaigns (this ensures only valid campaigns can be used)
  export type CampaignName = 'default' | 'campaign1' | 'campaign2';
  
  // Define a type for the collection of campaign themes using Record
  export type CampaignThemes = Record<CampaignName, ThemeVariables>;