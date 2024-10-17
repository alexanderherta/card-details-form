const inputArea = document.querySelector(".input-area");
const nameError = document.querySelector(".name-error");
const numberError = document.querySelector(".number-error");
const expiryError = document.querySelector(".expiry-error");
const cvcError = document.querySelector(".cvc-error");
const expiryCvcErrors = document.querySelector(".expiry-cvc-errors");
const nameInput = document.querySelector(".name-input");
const numberInput = document.querySelector(".number-input");
const expiryMonthInput = document.querySelector(".expiry-month-input");
const expiryYearInput = document.querySelector(".expiry-year-input");
const cvcInput = document.querySelector(".cvc-input");
const showName = document.querySelector(".card-name");
const showNumber = document.querySelector(".card-number");
const showExpiryMonth = document.querySelector(".card-expiry-month");
const showExpiryYear = document.querySelector(".card-expiry-year");
const showCvc = document.querySelector(".card-cvc");
let nameValid = false;
let numberValid = false;
let expiryMonthValid = false;
let expiryYearValid = false;
let cvcValid = false;

nameInput.addEventListener("input", () => {
  nameInput.value = nameInput.value.toUpperCase();
  if(nameInput.value == "") {
    showName.innerText = "JANE APPLESEED";
  } else {
    showName.innerText = nameInput.value;
  }

  nameInput.style.borderColor = "rgba(0, 0, 0, 0.15)";
  nameError.innerHTML = "";
});

numberInput.addEventListener("input", () => {
  let input = numberInput.value;
  input = input.replace(/\s/g, "");
  
  if(input.length > 15) {
    numberInput.maxLength = 16;
  } else {
    numberInput.maxLength = 19;  
  }

  if(input == "") {
    showNumber.innerText = "0000 0000 0000 0000";
  } else {
    showNumber.innerText = input.match(/.{1,4}/g).join(" ");
  }

  numberInput.style.borderColor = "rgba(0, 0, 0, 0.15)";
  numberError.innerHTML = "";
});

numberInput.addEventListener("focusout", () => {
  let input = numberInput.value;
  input = input.replace(/\s/g, "");
  const inputWithSpace = input.match(/.{1,4}/g);
  numberInput.value = inputWithSpace.join(" ");
});

expiryMonthInput.addEventListener("input", () => {
  if(expiryMonthInput.value == "") {
    showExpiryMonth.innerText = "00";
  } else {
    showExpiryMonth.innerText = expiryMonthInput.value;
  }

  expiryMonthInput.style.borderColor = "rgba(0, 0, 0, 0.15)";
  expiryError.innerHTML = "";
});

expiryMonthInput.addEventListener("focusout", () => {
  let currentMonth = expiryMonthInput.value;
  if(Number(currentMonth) > 0 && Number(currentMonth) < 10) {
    if(currentMonth.length < 2) {
      expiryMonthInput.value = "";
      expiryMonthInput.value = "0" + currentMonth;
      showExpiryMonth.innerText = "0" + currentMonth;
    }
  }
});

expiryYearInput.addEventListener("input", () => {
  if(expiryYearInput.value == "") {
    showExpiryYear.innerText = "00";
  } else {
    showExpiryYear.innerText = expiryYearInput.value;
  }

  expiryYearInput.style.borderColor = "rgba(0, 0, 0, 0.15)";
  expiryError.innerHTML = "";
});

expiryYearInput.addEventListener("focusout", () => {
  let currentYear = expiryYearInput.value;
  if(Number(currentYear) > 0 && Number(currentYear) < 10) {
    if(currentYear.length < 2) {
      expiryYearInput.value = "";
      expiryYearInput.value = "0" + currentYear;
      showExpiryYear.innerText = "0" + currentYear;
    }
  }
});

cvcInput.addEventListener("input", () => {
  if(cvcInput.value == "") {
    showCvc.innerText = "000";
  } else {
    showCvc.innerText = cvcInput.value;
  }

  cvcInput.style.borderColor = "rgba(0, 0, 0, 0.15)";
  cvcError.innerHTML = ``;
});

cvcInput.addEventListener("focusout", () => {
  let currentCvc = cvcInput.value;
  if(Number(currentCvc) > 0 && Number(currentCvc) < 10) {
    if(currentCvc.length < 2) {
      cvcInput.value = "";
      cvcInput.value = "00" + currentCvc;
      showCvc.innerText = "00" + currentCvc;
    }
  } else if(Number(currentCvc) >= 10 && Number(currentCvc) < 100) {
    if(currentCvc.length < 3) {
      cvcInput.value = "";
      cvcInput.value = "0" + currentCvc;
      showCvc.innerText = "0" + currentCvc;
    }
  }
});

function isInputValid() {
  isNameValid();
  isNumberValid();
  isExpiryMonthValid();
  isExpiryYearValid();
  isCvcValid();

  if(nameValid && numberValid && expiryMonthValid && expiryYearValid && cvcValid) {
    displayThankYou();
  } else {
    showIncorrectValues();
    nameValid = false;
    numberValid = false;
    expiryMonthValid = false;
    expiryYearValid = false;
    cvcValid = false;
  }
}

function isNameValid() {
  let currentName = nameInput.value;
  currentName = currentName.replace(/\s/g, "");
  const checkValidity = str => /^[A-Z]+$/i.test(str);
  const checkIfSpaces = str => /\s/.test(str);
  if(checkValidity(currentName) && checkIfSpaces(nameInput.value)) {
    let removeSpaces = nameInput.value.replace(/\s+/g, " ");
    removeSpaces = removeSpaces.trim();
    let checkSpacesAmount = (removeSpaces.split(" ").length - 1);
    if(checkSpacesAmount < 3) {
      nameValid = true;
    }
  }
}

function isNumberValid() {
  let currentNumber = numberInput.value;
  currentNumber = Number(currentNumber.replace(/\s/g, ""));
  if(Number.isInteger(currentNumber) && currentNumber.toString().length == 16) {
    numberValid = true;
  }
}

function isExpiryMonthValid() {
  let currentMonth = expiryMonthInput.value;
  expiryMonthInput.value = currentMonth.replace(/\s/g, "");
  currentMonth = currentMonth.replace(/\s/g, "");

  if(currentMonth.startsWith("0")) {
    if(Number(currentMonth.slice(-1)) > 0 && Number(currentMonth.slice(-1)) < 10) {
      expiryMonthValid = true;
    }
  } else if(Number(currentMonth) > 0 && Number(currentMonth) < 13) {
    expiryMonthValid = true;
  }
}

function isExpiryYearValid() {
  let currentYear = expiryYearInput.value;
  expiryYearInput.value = currentYear.replace(/\s/g, "");
  currentYear = currentYear.replace(/\s/g, "");

  if(currentYear.startsWith("0")) {
    if(Number(currentYear.slice(-1)) < 10) {
      expiryYearValid = true;
    }
  } else if(Number(currentYear) < 100 && Number(currentYear) > 0) {
    expiryYearValid = true;
  }
}

function isCvcValid() {
  let currentCvc = cvcInput.value;
  cvcInput.value = currentCvc.replace(/\s/g, "");
  currentCvc = currentCvc.replace(/\s/g, "");

  if(currentCvc.startsWith("0")) {
    if(Number(currentCvc.slice(-2)) < 100) {
      cvcValid = true;
    }
  } else if(Number(currentCvc) > 99 && Number(currentCvc) < 1000) {
    cvcValid = true;
  }
}

function showIncorrectValues() {
  nameInput.style.borderColor = "rgba(0, 0, 0, 0.15)";
  numberInput.style.borderColor = "rgba(0, 0, 0, 0.15)";
  expiryMonthInput.style.borderColor = "rgba(0, 0, 0, 0.15)";
  expiryYearInput.style.borderColor = "rgba(0, 0, 0, 0.15)";
  cvcInput.style.borderColor = "rgba(0, 0, 0, 0.15)";

  nameError.innerHTML = "";
  numberError.innerHTML = "";
  expiryError.innerHTML = "";
  cvcError.innerHTML = "";
  
  if(!nameValid) {
    nameError.innerHTML = `<p class="error-messages">Name must only contain letters. 2-3 names allowed.</p>`;
    nameInput.style.borderColor = "red";
  }
  if(!numberValid) {
    numberError.innerHTML = `<p class="error-messages">Numbers only, 16 characters.</p>`;
    numberInput.style.borderColor = "red";
  }
  if(!expiryMonthValid) {
    expiryError.innerHTML = `<p class="error-messages">Must be a valid date.</p>`;
    expiryMonthInput.style.borderColor = "red";
  }
  if(!expiryYearValid) {
    expiryError.innerHTML = `<p class="error-messages">Must be a valid date.</p>`;
    expiryYearInput.style.borderColor = "red";
  }
  if(!cvcValid) {
    cvcError.innerHTML = `<p class="error-messages">Must be a number.</p>`;
    cvcInput.style.borderColor = "red";
  }
}

function displayThankYou() {
  inputArea.innerHTML = "";
  inputArea.innerHTML = `<svg width="80" height="80" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="40" cy="40" r="40" fill="url(#a)"/><path d="M28 39.92 36.08 48l16-16" stroke="#fff" stroke-width="3"/><defs><linearGradient id="a" x1="-23.014" y1="11.507" x2="0" y2="91.507" gradientUnits="userSpaceOnUse"><stop stop-color="#6348FE"/><stop offset="1" stop-color="#610595"/></linearGradient></defs></svg>`;
  inputArea.innerHTML += `
  <div>
    <h1 class="thank-you">THANK YOU!</h1>
    <p class="thank-you-details">We've added your card details</p>
  </div>
  `;
  inputArea.innerHTML += `<button class="continue-button" onclick="location.reload()">Continue</button>`;
  inputArea.style.alignItems = "center";
  inputArea.style.gap = "40px";
  inputArea.style.textAlign = "center";
}

