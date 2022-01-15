const { id, token } = require("./.config.json"); //get token for discord bot
const captchaArgs = {
  provider: {
    id: id,
    token: token,
  },
  throwOnError: true,
  visualFeedback: false,
  solveInactiveChallenges: true,
};

// recursive function
async function SolveCaptcha(page) {
  try {
    for (const frame of page.mainFrame().childFrames()) {
      const response = await frame.solveRecaptchas();
    }
  } catch (error) {
    console.log(`Captcha error (trying again): ${error}`);
    SolveCaptcha();
  }
}
module.exports = { captchaArgs, SolveCaptcha };
