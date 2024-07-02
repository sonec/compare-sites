# compare-sites
Tool based on playright which visually compare two sites

# Installation

```
npm install
npx playwright install
```
# Configuration

The configs directory contains three files:
* devices.json - This contains an array of the different devices being used, the device names come from the [official Playwright Devices json file](https://github.com/microsoft/playwright/blob/main/packages/playwright-core/src/server/deviceDescriptorsSource.json)
* domains.json - This contains the domains of the two sites be compared
* paths.json - This contains the paths of all the pages that are to be compared and their user specified names

# Usage for one domains

This will take cross browser screenshots of the first website in domains.json and attach it to each test for review in the html reporter

```
npx playwright test cross_browser.spec.ts --reporter html
npx playwright show-report
```

# Usage for two domains

I've created a custom html reporter based off the existing default html reporter. This reporter only displays the screenshot section when looking at each failed test, it doesn't show where the test failed.

```
npx playwright test css_regression.spec.ts --reporter="./reporter/custom-reporter.js"
```
If there are issues the report will be loaded up in the browser automatically.

Otherwise, you'll need to run the command
```
npx playwright show-report
```
