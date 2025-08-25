const mobileNum = document.querySelector("#mobile-number");
const pinNum = document.querySelector("#pin-number");
const loginBtn = document.querySelector("#login-btn");
const wrongNum = document.querySelector("#wrong-num");
const wrongPin = document.querySelector("#wrong-pin");

// Valid NUmber checker
function validNumber(num) {
  if (num.startsWith("01") && num.length === 11) {
    return true;
  } else {
    return false;
  }
}

loginBtn.addEventListener("click", (evt) => {
  evt.preventDefault(); // stop form default bahiaviour

  wrongNum.textContent = "";
  wrongPin.textContent = "";
  const userPin = "1111";
  const userNumber = "01922333444";
  // Valid Account Number
  const isValidNumber = validNumber(mobileNum.value);
  if (!isValidNumber || userNumber !== mobileNum.value) {
    wrongNum.textContent = "Invalid account number";
    wrongNum.style.display = "initial";
    return;
  }

  if (pinNum.value !== userPin) {
    wrongPin.textContent = "Enter wrong pin";
    wrongPin.style.display = "initial";
  }

  if (userNumber === mobileNum.value && pinNum.value === userPin) {
    window.open("pages/home.html", "_blank");
    document.querySelector("form").reset();
  }
});
