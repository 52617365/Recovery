const {id, token} = require('./.config.json'); //get token for discord bot
const captchaArgs = {
    provider: {
        id: id,
        token: token
    },
    visualFeedback: true
};

module.exports = {captchaArgs};
