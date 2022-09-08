import { Page } from "puppeteer";

export const handleCookieWindow = async(page: Page, cookieSelector: string, timeout:number = 50000, visible: boolean = true):Promise<void> => {
    const cookieBtn = await page.waitForSelector(cookieSelector, {visible, timeout});
    await page.evaluate((element) => { element?.scrollIntoView(); }, cookieBtn);
    await page.click(cookieSelector);

}