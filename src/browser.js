const { Evasions, Stealth } = require("./playwrightstealth");
const { chromium } = require("playwright-extra");
const { args } = require("./args.js");

module.exports = async function (proxy) {
  const browser = await chromium.launch({
    headless: false,
    args: args,
    proxy: {
      server: `socks5://${proxy}`,
    },
    //slowMo: 50,
  });
  const page = await browser.newPage({
    extraHTTPHeaders: { referer: "https://support.runescape.com/" },
    locale: "en-US",
  });
  const evasions = await Evasions();
  const stealth = await Stealth();
  evasions.forEach((e) => e().onPageCreated(stealth));
  for (let evasion of stealth.callbacks) {
    await page.addInitScript(evasion.cb, evasion.a);
  }
  return page;
};
