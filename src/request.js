const { initstealth } = require("./playwrightstealth.js");
const { args } = require("./args.js");
const { chromium } = require("playwright-extra");
const { captcha, SolveCaptcha } = require("./captcha.js");
const RecaptchaPlugin = require("@extra/recaptcha");

chromium.use(RecaptchaPlugin(captcha)),
  async function PreForm(form) {
    const browser = await chromium.launch({
      headless: false,
      args: args,
      //slowMo: 50,
    });

    const page = await browser.newPage();

    // This is responsible of using puppeteer stealth in playwright.
    await init.PlayWrightStealth();

    try {
      await page.goto(
        "https://secure.runescape.com/m=accountappeal/passwordrecovery"
      );
    } catch (error) {
      console.log(`Proxy down. Target: ${form.login} | Proxy: ${args.proxy}`);
      await page.close();
    }
    try {
      SolveCaptcha();
      await page.click("id=email");
      await page.fill("id=email", form.login);
      await page.click("id=passwordRecovery");
      await page.waitForSelector("#main-iframe", { timeout: 3000 });
      await page.waitForSelector("id=main-iframe", { timeout: 3000 });
      SolveCaptcha();
      await page.waitForSelector("id=email", { timeout: 3000 });
      await page.click("id=email");
      await page.fill("id=email", form.login);
      await page.click("id=passwordRecovery");
      SolveCaptcha();
      await page.waitForSelector("#p-account-recovery-identified");
      await page.click("#l-vista__container > small > a");
      await page.waitForSelector("id=p-account-recovery-pre-confirmation");
      SolveCaptcha();
      await page.click("#l-vista__container > p:nth-child(5) > a");
    } catch (error) {
      throw error;
    }
  };

async function FillForm(form) {
  try {
    await page.waitForSelector("#reg_email", { state: "visible" });
    await page.hover("#add-password");
    await page.click("#add-password");
    await page.waitForSelector("#password2", { state: "visible" });
    await page.click("#add-password");
    await page.waitForSelector("#password3", { state: "visible" });
    await page.click("#norecoveries", { timeout: 500 });
    await page.hover("#paymenttype");
    await page.type("#paymenttype", form.paymentMethod);
    await page.waitForSelector("#subslength", { state: "visible" });
    await page.hover("#subslength");
    await page.type("#subslength", form.subLength);
    await page.hover("#earliestsubsmonth");
    await page.type("#earliestsubsmonth", form.creationMonth);
    await page.hover("#earliestsubsyear");
    await page.type("#earliestsubsyear", form.creationYear);
    await page.hover("#creationmonth");
    await page.type("#creationmonth", form.creationMonth);
    await page.hover("#creationyear");
    await page.type("#creationyear", form.creationYear);
    await page.hover("#country_otherinfo");
    await page.type("#country_otherinfo", form.country);
    try {
      await page.waitForSelector("#state_otherinfo", {
        state: "visible",
        timeout: 800,
      });
      await page.hover("#state_otherinfo", { timeout: 200 });
      await page.type("#state_otherinfo", form.state, { timeout: 200 });
    } catch (error) {
      // Just catch, because target is not from usa, we can still continue.
    }
    await page.hover("#reg_email");
    await page.fill("id=reg_email", form.personalMail);
    await page.fill("id=reg_email_conf", form.personalMail);
    await page.fill("id=password1", form.pass1);
    await page.fill("id=password2", form.pass2);
    await page.fill("id=password3", form.pass3);
    await page.fill("id=email", form.paymentmail);
    await page.fill("id=postcode", form.zipcode);
    await page.fill("id=isp", form.isp);
    await page.click("#submit_button");
  } catch (error) {
    throw error;
  }
}

async function AfterForm() {
  SolveCaptcha();
  SolveCaptcha();
  await page.waitForSelector("#l-vista__container > h1", { state: "visible" });
  await page.close();
}

module.exports.Request = async function Request(form) {
  try {
    await PreForm(form);
  } catch (error) {
    console.log(error);
    console.log("Trying again.");
    await PreForm(form);
  }

  try {
    await FillForm(form);
  } catch (error) {
    console.log(error);
    console.log("Trying again.");
    await FillForm(form);
  }

  try {
    await AfterForm();
  } catch (error) {
    console.log(error);
    console.log("Trying again.");
    await AfterForm();
  }
};
