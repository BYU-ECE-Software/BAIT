import { config as dotenvConfig } from 'dotenv';
import type { PlaywrightTestConfig } from '@playwright/test';

dotenvConfig();

const config: PlaywrightTestConfig = {
	webServer: {
		command: 'npm run build && npm run preview',
		port: 4173,
		env: {
			OPENAI_API_KEY: process.env.OPENAI_API_KEY,  // Ensures it's available in the web server environment
		},
	},
	testDir: 'tests',
	testMatch: /(.+\.)?(test|spec)\.[jt]s/,
};

export default config;
