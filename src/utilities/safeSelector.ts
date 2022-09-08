import { Page } from "puppeteer"

export const safeSelector = async (
  page: Page,
  selector: string,
  click: boolean = false,
  timeout: number = 50000,
  visible: boolean = true
): Promise<void> => {
    await page.waitForSelector(selector, {visible, timeout});

    

    if(click) await page.click(selector)
};
