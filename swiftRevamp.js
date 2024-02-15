import { browser } from 'k6/experimental/browser'
import { check } from 'k6'
import http from 'k6/http'

export const options = {
  scenarios: {
    browser: {
        executor: 'per-vu-iterations',
        exec: 'browserTest',
        vus: 5,
        maxDuration: '30s',
        options: {
            browser: {
            type: 'chromium'
            }
      }
    }
  }
}

// Fungsi untuk mendapatkan nilai datetime dalam format tertentu
function getCurrentDateTime() {
    const now = new Date();
    const date = now.getDate().toString().padStart(2, '0');
    const month = (now.getMonth() + 1).toString().padStart(2, '0');
    const year = now.getFullYear();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');

    return `${year}-${month}-${date}_${hours}-${minutes}-${seconds}`;
}

export async function browserTest() {
    const page = browser.newPage()

    await page.goto('https://swiftpwa.testingnow.me/ana-running-short')
    page.waitForSelector('//div[contains(@class,"container-review-list-label")]', { state: "visible" });

    check(page, {
        'product name': page => page.locator('//div[contains(@class,"container-review-list-label")]').isVisible() === true
    })

    page.screenshot({ path: `screenshots/browser-${getCurrentDateTime()}.png`});
    page.close()
    }