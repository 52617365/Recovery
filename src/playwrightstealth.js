async function Evasions() {
  const enabledEvasions = [
    "iframe.contentWindow",
    "chrome.runtime",
    "navigator.webdriver",
    "chrome.app",
    "chrome.csi",
  ];

  const evasions = enabledEvasions.map(
    (e) => new require(`puppeteer-extra-plugin-stealth/evasions/${e}`)
  );
  return enabledEvasions;
}

async function Stealth() {
  const stealth = {
    callbacks: [],
    async evaluateOnNewDocument(...args) {
      this.callbacks.push({ cb: args[0], a: args[1] });
    },
  };
  return stealth;
}
module.exports = { Evasions, Stealth };
