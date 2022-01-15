const { targets } = require("./target.js");
const { SendRequest } = require("./request.js");
const loadBrowser = require("./browser.js");

(async () => {
  await Promise.all(
    targets.map(async (target) => {
      const page = await loadBrowser(target.proxy);
      await SendRequest(page, target);
    })
  );
})();
