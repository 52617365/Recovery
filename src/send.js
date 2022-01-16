const { targets } = require("./target.js");
const { Request } = require("./request.js");
const loadBrowser = require("./browser.js");

(async () => {
  await Promise.all(
    targets.map(async (target) => {
      const page = await loadBrowser(target.proxy);
      const send = new Request(page, target);
      await send.SendRequest();
    })
  );
})();
