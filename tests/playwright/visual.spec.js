const { test, expect } = require('@playwright/test');
const AxeBuilder = require('@axe-core/playwright').default;

test.describe('Visual + A11y checks for core tokens', () => {
  test('BTN-GLOW story should be accessible and render', async ({ page }) => {
    await page.goto('http://127.0.0.1:6006/iframe.html?id=btn-glow--default');
    const snapshot = await page.screenshot();
    expect(snapshot).toBeTruthy();
    const accessibilityScan = await new AxeBuilder({ page }).analyze();
    expect(accessibilityScan.violations.length).toBe(0);
  });

  test('CRD-TIER1 story should be accessible and render', async ({ page }) => {
    await page.goto('http://127.0.0.1:6006/iframe.html?id=crd-tier1--default');
    const snapshot = await page.screenshot();
    expect(snapshot).toBeTruthy();
    const accessibilityScan = await new AxeBuilder({ page }).analyze();
    expect(accessibilityScan.violations.length).toBe(0);
  });
});
