import puppeteer from "puppeteer-extra";
import AdblockerPlugin from "puppeteer-extra-plugin-adblocker";
// @ts-ignore
import { VideoParam } from "../../models/videoParamSchema.ts";
// @ts-ignore
import { safeSelector } from "../../utilities/safeSelector.ts";
// @ts-ignore
import { parseSlug } from "../../utilities/parseSlug.ts";
// @ts-ignore
import { cookieAcceptAll, searchInput, searchBtn, videoLinkEl, videoContainer } from "../../utilities/selectors.ts";
// @ts-ignore
import { handleCookieWindow } from "../../utilities/handleCookieWindow.ts";
// @ts-ignore
import { uploadImage } from "../storage/cloudinary.ts";


const userAgent =
"Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/60.0.3112.50 Safari/537.36";




//PUPPETEER ADBLOCKER CONFIG
const adblocker = AdblockerPlugin({
    blockTrackers: true // default: false
  })

puppeteer.use(adblocker)



export const getVideoInfo =  async(slug: VideoParam) => {

    try {

    const param = parseSlug(slug);
        
    const browser = await puppeteer.launch({headless: true, slowMo: 100, args: ['--no-sandbox']});
        const page = await browser.newPage();
        await page.setUserAgent(userAgent);
        await page.goto('https://youtube.com', {waitUntil: 'domcontentloaded'});

        await handleCookieWindow(page, cookieAcceptAll);

        
        await safeSelector(page, searchInput);
        await page.type(searchInput, param);
        await safeSelector(page, searchBtn, true);


        await safeSelector(page, videoLinkEl);

        const videos = await page.$$(videoLinkEl);
        
        await videos[0].click();


        await safeSelector(page, videoContainer);
       
        await page.waitForTimeout(3000);

     
        const videoTitle = await page.$eval('h1.title.style-scope.ytd-video-primary-info-renderer yt-formatted-string', (el: any) => el.innerText);
       
       
        
        let image = await page.screenshot({
            encoding: "binary",
        });


        const image_url =  await uploadImage(image)

        const result = {
            title: videoTitle,
         
            image: image_url
        }


        await browser.close();


       return {success: true, result: result, error: false}
    
    } catch (err) {
    
        return {success: false, result: null, error: err}
    }

};