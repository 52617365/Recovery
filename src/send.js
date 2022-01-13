const { targets } = require("./target.js");
const { Request } = require("./request.js");

async function SendRequests() {
  await Promise.all(
    targets.map(async (target) => {
      await Request(target);
    })
  );
}

SendRequests();
