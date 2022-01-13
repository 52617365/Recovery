const {id, token} = require('./.config.json'); //get token for discord bot
const captchaArgs = {
    provider: {
        id: id,
        token: token
    },
    visualFeedback: true
};

async function SolveCaptcha() {
  try {
    for (const frame of page.mainFrame().childFrames()) {
      await frame.solveRecaptchas();
    }
  } catch (error) {
    console.log("Problem solving captcha");
  }
};
module.exports = {captchaArgs, SolveCaptcha};
