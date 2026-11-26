import {chromium} from 'playwright-core';
const browser=await chromium.launch({channel:'chrome'});
for(const width of [1366,390]){
 const page=await browser.newPage({viewport:{width,height:900},reducedMotion:'reduce'});
 const errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.goto('http://127.0.0.1:4175/compare',{waitUntil:'domcontentloaded'});
 await page.getByRole('button',{name:'With Stageshow',exact:true}).click();
 await page.waitForTimeout(1200);
 await page.screenshot({path:`.cache/comparison-${width}.png`});
 console.log(JSON.stringify({width,errors,stage:await page.locator('.ss-stage').count(),overflow:await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth)}));
 await page.getByRole('button',{name:'Original',exact:true}).click();
 console.log('Restored image:',await page.locator('.project-vector-media img').count());
 await page.close();
}
await browser.close();
