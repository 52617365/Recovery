const random_ua = require("random-useragent");

const useragent = random_ua.getRandom(function (ua) {
  const browsers = [
    ua.osName === "Windows" &&
      ua.browserName === "Chrome" &&
      ua.browserVersion >= 80,
    ua.osName === "Windows" &&
      ua.browserName === "Firefox" &&
      ua.browserVersion >= 78,
    ua.osName === "Windows" &&
      ua.browserName === "Opera" &&
      ua.browserVersion >= 50,
    ua.osName === "Ubuntu" &&
      ua.browserName === "Chrome" &&
      ua.browserVersion >= 80,
    ua.osName === "Ubuntu" &&
      ua.browserName === "Firefox" &&
      ua.browserVersion >= 78,
    ua.osName === "Ubuntu" &&
      ua.browserName === "Opera" &&
      ua.browserVersion >= 50,
    ua.osName === "Linux" &&
      ua.browserName === "Chrome" &&
      ua.browserVersion >= 80,
    ua.osName === "Linux" &&
      ua.browserName === "Firefox" &&
      ua.browserVersion >= 78,
    ua.osName === "Linux" &&
      ua.browserName === "Opera" &&
      ua.browserVersion >= 50,
  ];
  const randomNumber = Math.floor(Math.random() * browsers.length);
  return browsers[randomNumber];
});

const args = [
  "--disable-features=IsolateOrigins,site-per-process,SitePerProcess",
  `--flag-switches-begin --disable-site-isolation-trials --flag-switches-end`,
  "--disable-web-security",
];

module.exports = { args, useragent };
