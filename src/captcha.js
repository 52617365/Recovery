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
  for (const frame of page.mainFrame().childFrames()) {
    // Checking if site contains a recaptcha.
    try {
      await page.waitForSelector('iframe[src*="recaptcha/"]', {
        timeout: 3000,
      });
      // If site contains a recaptcha, solve it, otherwise return.
      try {
        await frame.solveRecaptchas();
        //        await frame.waitForNavigation();
      } catch (error) {
        console.log(`Captcha error (trying again): ${error}`);
        SolveCaptcha(page);
      }
    } catch (error) {
      console.log("No captcha.");
      return;
    }
  }
}
module.exports = { captchaArgs, SolveCaptcha };
