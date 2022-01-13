module.exports.initstealth = async function () {
  const enabledEvasions = [
    "chrome.runtime",
    "iframe.contentWindow",
    "navigator.webdriver",
    "chrome.app",
    "chrome.csi",
  ];
  const evasions = enabledEvasions.map(
    (e) => new require(`puppeteer-extra-plugin-stealth/evasions/${e}`)
  );
  const stealth = {
    callbacks: [],
    async evaluateOnNewDocument(...args) {
      this.callbacks.push({ cb: args[0], a: args[1] });
    },
  };
  evasions.forEach((e) => e().onPageCreated(stealth));
  for (let evasion of stealth.callbacks) {
    await page.addInitScript(evasion.cb, evasion.a);
  }
};
