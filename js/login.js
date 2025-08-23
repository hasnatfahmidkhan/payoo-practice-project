const mobileNum = document.querySelector("#mobile-number");
const pinNum = document.querySelector("#pin-number");
const loginBtn = document.querySelector("#login-btn");
const wrongNum = document.querySelector("#wrong-num");
const wrongPin = document.querySelector("#wrong-pin");
loginBtn.addEventListener("click", (evt) => {
  evt.preventDefault(); // stop form default bahiaviour
  wrongNum.textContent = "";
  wrongPin.textContent = "";

  const numRegex = /^\d+$/;
  const isValidNum = numRegex.test(Number(mobileNum.value));
  const isValidPin = numRegex.test(Number(pinNum.value));
  const userAccountNum = 11111111111;
  const userPin = 1111;

  const convertedMobileNum = Number(mobileNum.value);
  const convertedPinNum = Number(pinNum.value);
  if (convertedMobileNum === userAccountNum && convertedPinNum === userPin) {
    // window.open( "../pages/home.html", "_blank");
    window.location.href = "/pages/home.html";
    document.querySelector("form").reset();
  }

  if (convertedMobileNum !== userAccountNum) {
    wrongNum.textContent = "Enter Wrong Number";
    wrongNum.style.display = "initial";
  }
  if (convertedPinNum !== userPin) {
    wrongPin.textContent = "Enter wrong pin";
    wrongPin.style.display = "initial";
  }
});
