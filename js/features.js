const selectBanks = document.querySelector("#select-banks");
const BankAccountNumber = document.querySelector("#bank-account-number");
const amountAdd = document.querySelector("#add-amount");
const pinNumber = document.querySelector("#pin-number");
const addMoneyBtn = document.querySelector("#add-money-btn");
const availableBanlace = document.querySelector("#available-balance");
const addMoneyForm = document.querySelector("#add-money-container");
const addMoneyFormBtn = document.querySelector("#add-money-form-btn");
const cashOutFormBtn = document.querySelector("#cashout-form-btn");
const cashOutForm = document.querySelector("#cashout-container");
const logOutBtn = document.querySelector("#logout-btn");
const UserPin = 1111;

// logout features
logOutBtn.addEventListener("click", () => {
  window.location.href = "./pages/home.html";
});

// add Money btn click to open the add money form
addMoneyFormBtn.addEventListener("click", () => {
  addMoneyForm.style.display = "initial";
  cashOutForm.style.display = "none";
});

// cash out btn click to open the cash out form
cashOutFormBtn.addEventListener("click", () => {
  cashOutForm.style.display = "initial";
  addMoneyForm.style.display = "none";
});

// Add Money Features
addMoneyBtn.addEventListener("click", (evt) => {
  evt.preventDefault(); // stop reload after add money btn click

  document.querySelector("#not-select-bank").textContent = "";
  document.querySelector("#account-num").textContent = "";
  document.querySelector("#wrong-pin").textContent = "";
  document.querySelector("#amount-not-add").textContent = "";
  // Select Bank
  if (selectBanks.value === "") {
    document.querySelector("#not-select-bank").textContent =
      "Please Select A Bank";
    document.querySelector("#not-select-bank").style.display = "initial";
    return;
  }
  // Valid Account Number
  if (BankAccountNumber.value.length < 16) {
    document.querySelector("#account-num").textContent =
      "Invalid Account Number";
    document.querySelector("#account-num").style.display = "initial";
    return;
  }

  // Ammount
  if (Number(amountAdd.value) < 5) {
    document.querySelector("#amount-not-add").textContent = "Add Money";
    document.querySelector("#amount-not-add").style.display = "initial";
    return;
  }
  // check pin
  if (Number(pinNumber.value) !== UserPin) {
    document.querySelector("#wrong-pin").textContent = "Wrong Password!";
    document.querySelector("#wrong-pin").style.display = "initial";
    return;
  }
  // after all valid submit add money
  const addAmount = Number(amountAdd.value);
  const newAvailableBalance = addAmount + Number(availableBanlace.textContent);
  availableBanlace.textContent = newAvailableBalance;
  // reset the form
  document.querySelector("#add-money-form").reset();
  alert("Add Amount Successfully");
});

// Cash Out Features
document
  .querySelector("#withdraw-money-btn")
  .addEventListener("click", (evt) => {
    evt.preventDefault(); // stop reload after add money btn click

    const agentNumber = document.querySelector("#agent-number");
    const withdrawAmount = document.querySelector("#withdraw-ammount");
    const pin = document.querySelector("#cashout-pin");
    document.querySelector("#agent-wrong-num").textContent = "";
    document.querySelector("#not-add-withdraw").textContent = "";
    document.querySelector("#wrong-pin-cashout").textContent = "";

    // Valid Account Number
    if (agentNumber.value.length < 11) {
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
    console.log(cashOutAmount);
    if (cashOutAmount > Number(availableBanlace.textContent)) {
      document.querySelector("#not-add-withdraw").textContent =
        "Not Available Money";
      document.querySelector("#not-add-withdraw").style.display = "initial";
      return;
    }
    const newAvailableBalance =
      Number(availableBanlace.textContent) - cashOutAmount;
    availableBanlace.textContent = newAvailableBalance;

    // reset the form
    document.querySelector("#cashout-form").reset();
    alert("Cash Out Successfully");
  });
