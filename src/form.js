const {
  /*randomizeCreationMonth, randomizeCreationYear, randomizePaymentMethod, randomizeSubLength,*/ shuffle,
} = require(__dirname + "/random.js");
const fs = require("fs");
const path = require("path");

const directoryPath = path.join(__dirname, "../Targets");

function loadTargets() {
  // Reading all the files inside target directory and randomizing order.
  const files = shuffle(fs.readdirSync(directoryPath));

  let targetlist = [];
  for (const file of files) {
    // Continue rest of loop if file is not a text file.
    if (getExtension(file) != "txt") {
      continue;
    }

    const path = `${directoryPath}/${file}`;

    try {
      const data = fs.readFileSync(path, "utf8");
      // Split data on new line
      const lines = data.split(/\r?\n/);
      const form = initForm(lines);
      targetlist.push(form);
    } catch (err) {
      console.error(err);
    }
  }
  console.log(`Loaded ${targetlist.length} targets.`);
  return targetlist;
}

function getExtension(file) {
  return file.substring(file.lastIndexOf(".") + 1, file.length) || file;
}

function initForm(form) {
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
    proxy: form[10],
  };
  return target;
}
const targets = loadTargets();
module.exports = { targets };
