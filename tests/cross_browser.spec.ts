import {test, expect, devices} from '@playwright/test';
import fs from 'node:fs';

const domains = JSON.parse(fs.readFileSync('configs/domains.json', 'utf8'));
const paths = JSON.parse(fs.readFileSync('./configs/paths.json', 'utf8'));
const devs = JSON.parse(fs.readFileSync('./configs/devices.json', 'utf8'));

for (let path in paths){
    for (let dev of devs){
        let d = Object.keys(domains);
        test(`cross browser screenshot for ${path} from ${d[0]} on ${devices[dev].viewport.height}x${devices[dev].viewport.width}`, async ({page}, testInfo) => {
            if(d.length>=1){
                let url=`${domains[d[0]]}${paths[path]}`
                await page.setViewportSize(devices[dev].viewport);
                await page.goto(url);
                let screenshot = await page.screenshot({fullPage: true });
                await testInfo.attach('screenshot', { body: screenshot, contentType: 'image/png' });
            }
        });
    }
}
