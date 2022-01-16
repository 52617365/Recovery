const random_ua = require("random-useragent");

const useragent = random_ua.getRandom(function (ua) {
  return (
    (ua.osName === "Windows" &&
      ua.browserName === "Chrome" &&
      ua.browserVersion >= 80) ||
    (ua.osName === "Windows" &&
      ua.browserName === "Firefox" &&
      ua.browserVersion >= 78)
  );
});

const args = [
  //`--proxy-server=socks5://${proxy}`,
  "--disable-features=IsolateOrigins,site-per-process,SitePerProcess",
  `--flag-switches-begin --disable-site-isolation-trials --flag-switches-end`,
  `--user-agent=${useragent}`,
  "--disable-web-security",
];

module.exports = { args };
