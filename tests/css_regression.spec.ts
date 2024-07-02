import {test, expect, devices} from '@playwright/test';
import fs from 'node:fs';

const domains = JSON.parse(fs.readFileSync('configs/domains.json', 'utf8'));
const paths = JSON.parse(fs.readFileSync('./configs/paths.json', 'utf8'));
const devs = JSON.parse(fs.readFileSync('./configs/devices.json', 'utf8'));

for (let path in paths){
    for (let dev of devs){
        let d = Object.keys(domains);
        test(`comparing screenshot for ${path} on ${devices[dev].viewport.height}x${devices[dev].viewport.width}`, async ({page, browserName}, testInfo) => {
            if(d.length==2){
                let expected_url=`${domains[d[0]]}${paths[path]}`;
                let actual_url=`${domains[d[1]]}${paths[path]}`;
                let screenshot_path = `${testInfo.snapshotDir}/${dev.replace(/\s+/g, '-')}-${path.replace(/\s+/g, '-')}-expected-${browserName}-${process.platform}.png`
                await page.setViewportSize(devices[dev].viewport);
                await page.goto(expected_url);
                await page.screenshot({path: screenshot_path, fullPage: true });
                let expected_filename = `${dev}-${path}-expected.png`;
                await page.goto(actual_url);
                let actual = await page.screenshot({fullPage: true });
                expect(actual).toMatchSnapshot(expected_filename, {threshold: 0});
            }
        });
    }
}
