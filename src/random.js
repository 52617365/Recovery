function randomizeCreationMonth() {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const randomNumber = Math.floor(Math.random() * months.length);
  return months[randomNumber];
}

function randomizeCreationYear(login) {
  const usernameYears = [
    "2001",
    "2002",
    "2003",
    "2004",
    "2005",
    "2006",
    "2007",
    "2008",
    "2009",
    "2010",
  ];
  const emailLoginYears = [
    "2011",
    "2012",
    "2013",
    "2014",
    "2015",
    "2016",
    "2017",
    "2018",
    "2019",
    "2020",
    "2021",
  ];
  const randomNumberEmail = Math.floor(Math.random() * emailLoginYears.length);
  const randomNumberUsername = Math.floor(Math.random() * usernameYears.length);

  if (login.includes("@")) {
    return emailLoginYears[randomNumberEmail];
  } else {
    return usernameYears[randomNumberUsername];
  }
}

function randomizePaymentMethod(creationYear) {
  const ogMethods = ["paypal", "credit card", "ideal"];
  const paymentMethods = ["bonds", "paypal", "credit card", "ideal"];
  const randomNumber = Math.floor(Math.random() * paymentMethods.length);
  const randomNumberOG = Math.floor(Math.random() * ogMethods.length);
  const randomizedPaymentMethod = paymentMethods[randomNumber];
  const randomizedOGpaymentMethod = ogMethods[randomNumberOG];

  if (creationYear < 2014) {
    return randomizedOGpaymentMethod;
  } else {
    return randomizedPaymentMethod;
  }
}

function randomizeSubLength(method) {
  const bondsMethod = ["2", "1"];
  const otherMethod = ["1", "22", "3"];
  const randomBondsNumber = Math.floor(Math.random() * bondsMethod.length);
  const randomOtherMethods = Math.floor(Math.random() * otherMethod.length);
  if (paymentMethod === "bonds") {
    return bondsMethod[randomBondsNumber];
  } else {
    return otherMethod[randomOtherMethods];
  }
}

function shuffle(a) {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

module.exports = {
  randomizeCreationMonth,
  randomizeCreationYear,
  randomizePaymentMethod,
  randomizeSubLength,
  shuffle,
};
