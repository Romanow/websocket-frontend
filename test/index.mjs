import puppeteer from "puppeteer";
import {hideBin} from "yargs/helpers";
import {wait} from "./helper.mjs"
import chat from "./chat.mjs";
import yargs from "yargs/yargs";

const {argv} = yargs(hideBin(process.argv))
    .options({
        headless: {type: "boolean", default: false},
        url: {type: "string"}
    });

(async () => {
    const browser = await puppeteer.launch({headless: argv.headless});
    const page = await browser.newPage();
    const url = argv.url ?? "http://localhost:3000/"
    await page.goto(url);
    await page.setViewport({width: 1280, height: 1024});

    console.log("Loading app...");
    await page.waitForSelector("[data-test-id='main-page']", {timeout: 5000});
    await wait(1);
    console.log("Application loaded. Running tests...");

    try {
        await chat(page);
        console.log("Tests ends successfully");
        await wait(3)
    } catch (exception) {
        console.error(`Tests failed due ${exception.message}!`);
        throw exception;
    } finally {
        await browser.close();
    }
})();
