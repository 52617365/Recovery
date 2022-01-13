const {randomizeCreationMonth, randomizeCreationYear, randomizePaymentMethod, randomizeSubLength, shuffle} = require(__dirname + '/random.js');
const fs = require('fs');
const path = require('path');

const directoryPath = path.join(__dirname, '../Targets');

function loadTargets()
{
    console.log("Loading targets.");
    fs.readdir(directoryPath, function (err, files) {
        //handling error
        if (err) {
            return console.log('Unable to scan directory: ' + err);
        }
        console.log(`Loaded ${files.length} targets.`);
        //listing all files using forEach

        let targets = [];
        for (const file of files)
        {
            // Return if file is not a text file.
            if (getExtension(file) != 'txt') {return;}

            const path = `${directoryPath}/${file}`;

            try {
                const data = fs.readFileSync(path, 'utf8')
                // Split data on new line
                const lines = data.split(/\r?\n/);
                const form = initForm(lines);
                targets.push(form);
            } catch (err) {
              console.error(err)
            }
         };
        return targets;
    })
};

function getExtension(file)
{
    return file.substring(file.lastIndexOf('.')+1, file.length) || file;
}

function initForm(form)
{
    const passwords = [form[2], form[3], form[4]];
    const shuffledPasswords = shuffle(passwords);
    const target = {
      login: form[0],
      personalmail: form[1],
      pass1: shuffledPasswords[0],
      pass2: shuffledPasswords[1],
      pass3: shuffledPasswords[2],
      paymentmail: form[5],
      postcode: form[6],
      country: form[7],
      state: form[8],
      isp: form[9],
      proxy: form[10]
    }
    return target;
};
const targets1 = loadTargets();
module.exports = {
    targets1
}




