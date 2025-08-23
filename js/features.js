const addMoneyBtn = document.querySelector("#add-money-btn");
const availableBanlace = document.querySelector("#available-balance");
const addMoneyForm = document.querySelector("#add-money-container");
const addMoneyFormBtn = document.querySelector("#add-money-form-btn");
const cashOutFormBtn = document.querySelector("#cashout-form-btn");
const cashOutForm = document.querySelector("#cashout-container");
const logOutBtn = document.querySelector("#logout-btn");
const UserPin = 1111;

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

// logout features
logOutBtn.addEventListener("click", () => {
  window.location.href = "../index.html";
});

//* Add Money Features *//
addMoneyBtn.addEventListener("click", (evt) => {
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
});

// Add Money toogle Features
addMoneyFormBtn.addEventListener("click", () => {
  addMoneyForm.style.display = "initial";
  cashOutForm.style.display = "none";
});

//* Cash Out Features *//
document
  .querySelector("#withdraw-money-btn")
  .addEventListener("click", (evt) => {
    evt.preventDefault(); // stop reload after add money btn click

    const agentNumber = getInputValue("agent-number");
    const withdrawAmount = getInputValue("withdraw-ammount");
    const pin = getInputValue("cashout-pin");
    document.querySelector("#agent-wrong-num").textContent = "";
    document.querySelector("#not-add-withdraw").textContent = "";
    document.querySelector("#wrong-pin-cashout").textContent = "";
    const isValidNumber = validNumber(agentNumber);
    // Valid Account Number
    if (!isValidNumber) {
      document.querySelector("#agent-wrong-num").textContent =
        "Invalid agent number";
      document.querySelector("#agent-wrong-num").style.display = "initial";
      return;
    }

    // Ammount
    if (Number(withdrawAmount.value) < 50) {
      document.querySelector("#not-add-withdraw").textContent = "Minimum 50 Tk";
      document.querySelector("#not-add-withdraw").style.display = "initial";
      return;
    }

    // check pin
    if (Number(pin.value) !== UserPin) {
      document.querySelector("#wrong-pin-cashout").textContent =
        "Wrong Password!";
      document.querySelector("#wrong-pin-cashout").style.display = "initial";
      return;
    }

    // after all valid submit add money
    const cashOutAmount = Number(withdrawAmount.value);
    // check cash out is posibble or not
    if (cashOutAmount > Number(availableBanlace.textContent)) {
      document.querySelector("#not-add-withdraw").textContent =
        "Not Available Money";
      document.querySelector("#not-add-withdraw").style.display = "initial";
      return;
    }
    // New Available Balance 
    const newAvailableBalance =
      Number(availableBanlace.textContent) - cashOutAmount;
    availableBanlace.textContent = newAvailableBalance;

    // reset the form
    document.querySelector("#cashout-form").reset();
    alert("Cash Out Successfully");
  });
// cash out btn click to open the cash out form
cashOutFormBtn.addEventListener("click", () => {
  cashOutForm.style.display = "initial";
  addMoneyForm.style.display = "none";
});
