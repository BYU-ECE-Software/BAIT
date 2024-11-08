import { expect, test } from '@playwright/test';


test('renders CampaignCard component', async ({ page }) => {
	await page.goto('/');
	await expect(page.locator('campaign-card-selector')).toBeVisible(); // Use a unique selector for CampaignCard
});



