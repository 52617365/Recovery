const { forms } = require("./form.js");
const { Request } = require("./request.js");
const loadBrowser = require("./browser.js");

(async () => {
  await Promise.all(
    forms.map(async (form) => {
      const page = await loadBrowser(form.proxy);
      const send = new Request(page, form);
      await send.SendRequest();
    })
  );
})();
