export async function get(page, selector, multi) {
    const element = multi
        ? await page.$$(`[data-test-id=${selector}`)
        : await page.$(`[data-test-id=${selector}`);

    if (!(multi && element?.length || element)) {
        throw new Error(`Element with selector ${selector} does not exist`);
    }

    return element;
}

export async function find(page, selector, multi) {
    return multi
        ? await page.$$(`[data-test-id=${selector}`)
        : await page.$(`[data-test-id=${selector}`);
}

export async function input(page, selector, value) {
    await page.click(`[data-test-id=${selector}`, {clickCount: 3});
    await page.type(`[data-test-id=${selector}`, value);
}

export async function click(page, selector) {
    await page.click(`[data-test-id=${selector}`);
}

export async function text(page, selector) {
    return page.$eval(`[data-test-id=${selector}`, (e) => e.innerHTML);
}

export function wait(sec) {
    return new Promise(r => setTimeout(r, 1000 * sec));
}