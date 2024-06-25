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

# Usage

```
npx playwright test --reporter html
```
