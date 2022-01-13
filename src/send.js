const {targets} = require('./target.js');
const {args} = require('./args.js');
const {chromium} = require('playwright-extra')
const RecaptchaPlugin = require('@extra/recaptcha')

function SendRequests()
{
    for(var i = 0; i < targets.length; i++)
    {

        console.log(targets[i].login);

    }
};

SendRequests();







