const availableBanlace = document.querySelector("#available-balance");
const addMoneyForm = document.querySelector("#add-money-container");
const addMoneyFormBtn = document.querySelector("#add-money-form-btn");
const cashOutFormBtn = document.querySelector("#cashout-form-btn");
const cashOutForm = document.querySelector("#cashout-container");
const transferForm = document.querySelector("#transfer-container");
const transferFormBtn = document.querySelector("#transfer-form-btn");
const bonusForm = document.querySelector("#bonus-container");
const bonusFormBtn = document.querySelector("#get-bonus-btn");
const payBillForm = document.querySelector("#pay-bill-container");
const payBillFormBtn = document.querySelector("#pay-bill-btn");
const transactionsContainer = document.querySelector("#transactions-container");
const transactionbtn = document.querySelector("#transaction-btn");
const logOutBtn = document.querySelector("#logout-btn");
const UserPin = 1111;
// transaction card container
const cardContainer = document.querySelector("#transaction-cards-container");

// Get Element
function getElement(id) {
  return document.querySelector(`#${id}`);
}

// Get Input Field Value
function getInputValue(id) {
  const elem = document.querySelector(`#${id}`);
  return elem.value;
}

// Valid NUmber checker
function validNumber(num) {
  if (num.startsWith("01") && num.length === 11) {
    return true;
  } else {
    return false;
  }
}

// Function For Toggle Features
function hundleToggle(id) {
  const forms = document.querySelectorAll(".forms-btn");
  forms.forEach((form) => {
    form.style.display = "none";
  });
  id.style.display = "initial";
}

// Function for get coupon Bonus
function getbonus(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// logout features
logOutBtn.addEventListener("click", () => {
  window.location.href = "../index.html";
});

// Add Money toogle Features
addMoneyFormBtn.addEventListener("click", () => {
  hundleToggle(addMoneyForm);
});

// cash out toggle Features
cashOutFormBtn.addEventListener("click", () => {
  hundleToggle(cashOutForm);
});

// transfer toggle Features
transferFormBtn.addEventListener("click", () => {
  hundleToggle(transferForm);
});

// Get Bonus toggle Features
bonusFormBtn.addEventListener("click", () => {
  hundleToggle(bonusForm);
});

// Pay Bill toggle Features
payBillFormBtn.addEventListener("click", () => {
  hundleToggle(payBillForm);
});

// Transactions toggle Features
transactionbtn.addEventListener("click", () => {
  hundleToggle(transactionsContainer);
});

//? Function to Get real Time and Date
function getCurrentDateTime() {
  const now = new Date();

  // Format month name short (Aug, Sep, etc.)
  const options = { month: "short", day: "numeric" };
  const datePart = now.toLocaleDateString("en-US", options);

  // Format time (12-hour with AM/PM)
  let hours = now.getHours();
  const minutes = now.getMinutes().toString().padStart(2, "0");
  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12 || 12; // 0 -> 12

  return `${datePart} ${hours}:${minutes} ${ampm}`;
}

//? Utility: create element with optional classes & content
function createElement(tag, classes = [], content = "") {
  const elem = document.createElement(tag);
  if (classes.length) elem.classList.add(...classes);
  if (content) elem.innerHTML = content;
  return elem;
}

//? Function to create a transaction card
function createCard({
  billName,
  time = "Today <span>01:44 AM</span>",
  imgSrc = "../assets/wallet1.png",
  iconClass = "fa-solid fa-ellipsis-vertical text-2xl",
}) {
  const cardDiv = createElement("div", [
    "bg-white",
    "px-4",
    "py-3",
    "cursor-pointer",
    "border",
    "border-[#0808081e]",
    "rounded-xl",
    "flex",
    "justify-between",
    "items-center",
  ]);

  // Left section (image + content)
  const leftDiv = createElement("div", ["flex", "items-center", "gap-4"]);

  const imgDiv = createElement("div", [
    "bg-[#f4f5f7]",
    "p-3",
    "inline-flex",
    "items-center",
    "justify-center",
    "rounded-full",
  ]);
  const imgElem = createElement("img");
  imgElem.setAttribute("src", imgSrc);
  imgDiv.appendChild(imgElem);

  const contentDiv = createElement("div", [
    "flex",
    "flex-col",
    "justify-center",
  ]);
  const h3 = createElement("h3", ["font-semibold"], billName);
  const small = createElement(
    "small",
    ["text-[14px]", "font-medium", "text-[#08080880]"],
    time
  );

  contentDiv.append(h3, small);
  leftDiv.append(imgDiv, contentDiv);

  // Right section (icon)
  const rightDiv = createElement("div");
  const icon = createElement("i", iconClass.split(" "));
  rightDiv.appendChild(icon);

  // Combine everything
  cardDiv.append(leftDiv, rightDiv);

  return cardDiv; // return card so caller decides where to append
}

//* Add Money Features *//
document.querySelector("#add-money-btn").addEventListener("click", (evt) => {
  evt.preventDefault(); // stop reload after add money btn click
  // Every click time empty the input field value
  const accountNotSelected = getElement("not-select-bank");
  accountNotSelected.textContent = "";
  const acountNumError = getElement("account-num");
  acountNumError.textContent = "";
  const wrongPin = getElement("wrong-pin");
  wrongPin.textContent = "";
  const amountNotAdd = getElement("amount-not-add");
  amountNotAdd.textContent = "";

  // Select Bank
  const selectBanks = getInputValue("select-banks");
  if (selectBanks === "") {
    document.querySelector("#not-select-bank").textContent =
      "Please Select A Bank";
    document.querySelector("#not-select-bank").style.display = "initial";
    return;
  }

  // Valid Account Number
  const BankAccountNumber = getInputValue("bank-account-number");
  if (BankAccountNumber.length < 16) {
    acountNumError.textContent = "Invalid Account Number";
    acountNumError.style.display = "initial";
    return;
  }

  // Ammount
  const amountAdd = getInputValue("add-amount");
  if (Number(amountAdd) < 5) {
    amountNotAdd.textContent = "Add Money";
    amountNotAdd.style.display = "initial";
    return;
  }

  // check pin
  const pinNumber = getInputValue("pin-number");
  if (Number(pinNumber) !== UserPin) {
    wrongPin.textContent = "Wrong Password!";
    wrongPin.style.display = "initial";
    return;
  }

  // after all valid submit add money
  const newAvailableBalance =
    Number(amountAdd) + Number(availableBanlace.textContent);
  availableBanlace.textContent = newAvailableBalance;

  // reset the form
  document.querySelector("#add-money-form").reset();
  alert("Add Amount Successfully");
  const getDateTime = getCurrentDateTime();
  // create transaction card
  const addMoneyCard = createCard({
    billName: `Bank Deposit From ${selectBanks}`,
    time: `Today <span>${getDateTime}</span>`,
  });

  // Add transaction to transaction section
  cardContainer.appendChild(addMoneyCard);
});

//* Cash Out Features *//
document
  .querySelector("#withdraw-money-btn")
  .addEventListener("click", (evt) => {
    evt.preventDefault(); // stop reload after add money btn click

    document.querySelector("#agent-wrong-num").textContent = "";
    document.querySelector("#not-add-withdraw").textContent = "";
    document.querySelector("#wrong-pin-cashout").textContent = "";

    // Valid Account Number
    const agentNumber = getInputValue("agent-number");
    const isValidNumber = validNumber(agentNumber);
    if (!isValidNumber) {
      document.querySelector("#agent-wrong-num").textContent =
        "Invalid agent number";
      document.querySelector("#agent-wrong-num").style.display = "initial";
      return;
    }

    // Ammount
    const cashOutAmount = Number(getInputValue("withdraw-ammount"));

    if (cashOutAmount < 50) {
      document.querySelector("#not-add-withdraw").textContent = "Minimum 50 Tk";
      document.querySelector("#not-add-withdraw").style.display = "initial";
      return;
    }

    // check pin
    const pinNumber = Number(getInputValue("cashout-pin"));
    if (pinNumber !== UserPin) {
      document.querySelector("#wrong-pin-cashout").textContent =
        "Wrong Password!";
      document.querySelector("#wrong-pin-cashout").style.display = "initial";
      return;
    }

    // check cash out balance is less than avialable balance or not
    if (cashOutAmount > Number(availableBanlace.textContent)) {
      document.querySelector("#not-add-withdraw").textContent =
        "Not Available Money";
      document.querySelector("#not-add-withdraw").style.display = "initial";
      return;
    }
    // after all valid submit add money
    // New Available Balance
    const newAvailableBalance =
      Number(availableBanlace.textContent) - cashOutAmount;
    availableBanlace.textContent = newAvailableBalance;

    // reset the form
    document.querySelector("#cashout-form").reset();
    alert("Cash Out Successfully");
  });

//* Transfer Balance Features *//
document
  .querySelector("#transfer-money-btn")
  .addEventListener("click", (evt) => {
    evt.preventDefault(); // stop reload after add money btn click

    document.querySelector("#user-wrong-num").textContent = "";
    document.querySelector("#not-add-transfer").textContent = "";
    document.querySelector("#wrong-pin-transfer").textContent = "";

    // Valid Account Number
    const userNumber = getInputValue("user-account-number");

    const isValidNumber = validNumber(userNumber);

    if (!isValidNumber) {
      document.querySelector("#user-wrong-num").textContent =
        "Invalid user number";
      document.querySelector("#user-wrong-num").style.display = "initial";
      return;
    }

    // Ammount
    const transferAmount = Number(getInputValue("transfer-ammount"));

    if (transferAmount < 50) {
      document.querySelector("#not-add-transfer").textContent = "Minimum 50 Tk";
      document.querySelector("#not-add-transfer").style.display = "initial";
      return;
    }

    // check pin
    const pinNumber = Number(getInputValue("transfer-pin"));
    if (pinNumber !== UserPin) {
      document.querySelector("#wrong-pin-transfer").textContent =
        "Wrong Password!";
      document.querySelector("#wrong-pin-transfer").style.display = "initial";
      return;
    }

    // check transfer balance is less than avialable balance or not
    if (transferAmount > Number(availableBanlace.textContent)) {
      document.querySelector("#not-add-transfer").textContent =
        "Not Available Money";
      document.querySelector("#not-add-transfer").style.display = "initial";
      return;
    }
    // after all valid submit add money
    // New Available Balance
    const newAvailableBalance =
      Number(availableBanlace.textContent) - transferAmount;
    availableBanlace.textContent = newAvailableBalance;

    // reset the form
    document.querySelector("#transfer-amount-form").reset();
    alert("Transfer Successfully!");
  });

//* Get Bonus Features *//
document.querySelector("#bonus-btn").addEventListener("click", (evt) => {
  evt.preventDefault(); // stop reload after add money btn click

  document.querySelector("#coupon-wrong-num").textContent = "";

  // Valid Account Number
  const couponNum = getInputValue("coupon-number");

  if (couponNum.length < 6) {
    document.querySelector("#coupon-wrong-num").textContent =
      "Invalid coupon number";
    document.querySelector("#coupon-wrong-num").style.display = "initial";
    return;
  }

  // New Available Balance
  const bonusMoney = getbonus(300, 1000);
  const newAvailableBalance = Number(availableBanlace.textContent) + bonusMoney;
  availableBanlace.textContent = newAvailableBalance;

  // reset the form
  document.querySelector("#bonus-form").reset();
  alert("Add Bonus Successfully!");
});

//* Pay Bill Features *//
document.querySelector("#pay-money-btn").addEventListener("click", (evt) => {
  evt.preventDefault(); // stop reload after add money btn click

  // Every click time empty the input field value
  const billSelected = getElement("not-select-bill");
  billSelected.textContent = "";
  const billNumWrong = getElement("bill-wrong-num");
  billNumWrong.textContent = "";
  const amountNotAdd = getElement("not-add-pay");
  amountNotAdd.textContent = "";
  const wrongPin = getElement("wrong-pin-pay");
  wrongPin.textContent = "";

  // Select to Pay
  const selectBills = getInputValue("select-pay-bills");
  if (selectBills === "") {
    billSelected.textContent = "Please Select A Bank";
    billSelected.style.display = "initial";
    return;
  }

  // Valid Account Number
  const billNumber = getInputValue("bill-account-number");
  const isValidNumber = validNumber(billNumber);
  if (!isValidNumber) {
    billNumWrong.textContent = "Invalid agent number";
    billNumWrong.style.display = "initial";
    return;
  }

  // Ammount
  const payAmount = Number(getInputValue("pay-ammount"));
  if (payAmount <= 0) {
    amountNotAdd.textContent = "Enter amount to pay";
    amountNotAdd.style.display = "initial";
    return;
  }

  // check pin
  const pinNumber = Number(getInputValue("pay-pin"));
  if (pinNumber !== UserPin) {
    wrongPin.textContent = "Wrong Password!";
    wrongPin.style.display = "initial";
    return;
  }

  // check pay bill balance is less than avialable balance or not
  if (payAmount > Number(availableBanlace.textContent)) {
    amountNotAdd.textContent = "Not Available Money";
    amountNotAdd.style.display = "initial";
    return;
  }

  // after all valid submit add money
  // New Available Balance
  const newAvailableBalance = Number(availableBanlace.textContent) - payAmount;
  availableBanlace.textContent = newAvailableBalance;

  // reset the form
  document.querySelector("#pay-bill-form").reset();
  alert("Payment Successfull!");
});

createCard("Bank Deposit");
createCard("Internet Bill");
createCard("Cash Out");
createCard("Mobile Recharge");
