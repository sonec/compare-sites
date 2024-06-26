import { defineConfig } from '@playwright/test';

export default defineConfig({
  reporter: './reporter/custom-reporter.js',
  testDir: './tests',
  fullyParallel: true
});