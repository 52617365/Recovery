const { targets } = require("./target.js");
const { Request } = require("./request.js");

async () => {
  await Promise.all(
    targets.map(async (target) => {
      await DoRequest(target);
    })
  );
};
