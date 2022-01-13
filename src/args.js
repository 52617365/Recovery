const {random_ua} = require('random-useragent');
const { form } = require('./target.js');
const proxy = form.proxy;

const useragent = random_ua(function (ua) {
  return (ua.osName === 'Windows' && ua.browserName === 'Chrome' && ua.browserVersion >= 80 ||
     ua.osName === 'Windows' && ua.browserName === 'Firefox' && ua.browserVersion >= 78)
});


const args = [
  `--proxy-server=socks5://${proxy}`,
  `--disable-features=IsolateOrigins,site-per-process`,
  '--disable-notifications',
  '--disable-popup-blocking',
  '--disable-gpu',
  `--flag-switches-begin --disable-site-isolation-trials --flag-switches-end`,
  `--disable-web-security`,
  `--disable-features=IsolateOrigins,site-per-process`,
  `--user-agent=${useragent}`,
];


module.exports = {args}
