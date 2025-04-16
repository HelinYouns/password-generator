const copyBtn = document.getElementById("copybtn");
const passwordFild = document.getElementById("password");
const strongPass = document.querySelector(".strong-pass");
const memorablePass = document.querySelector(".memorable-pass");
const generatPasswBtn = document.getElementById("generate-passw");
const pinCode = document.querySelector(".pin-code");
const wordCombination = document.querySelector(".word-combination");
const sliderValue = document.querySelector(".slidervalue");
const rangeSlider = document.querySelector(".field input");
const customizPass = document.querySelector(".customize-pass");
const uppercaseToggle = document.getElementById("uppercaseToggle");
const numberToggle = document.getElementById("numberToggle");
const symbolToggle = document.getElementById("symbolToggle");
const userPassword = document.querySelector(".user-pass");
let controlBtn = 1;

document.addEventListener("DOMContentLoaded", () => {
  // Initialize slider value
  sliderValue.textContent = rangeSlider.value;

  // Trigger password generation on slider move
  let debounceTimeout;
  rangeSlider.addEventListener("input", () => {
    sliderValue.textContent = rangeSlider.value;
    clearTimeout(debounceTimeout);
    debounceTimeout = setTimeout(() => {
      passwordFild.value = customizePassword(rangeSlider.value);
    }, 200);
  });

  [uppercaseToggle, numberToggle, symbolToggle].forEach((checkbox) => {
    checkbox.addEventListener("change", () => {
      passwordFild.value = customizePassword(rangeSlider.value);
    });
  });
});

// Copy Password Button
copyBtn.addEventListener("click", () => {
  navigator.clipboard
    .writeText(passwordFild.value)
    .then(() => {
      let msg = document.getElementById("copyMessage");
      msg.style.display = "block";
      setTimeout(() => {
        msg.style.display = "none";
      }, 2000);
    })
    .catch((err) => {
      console.error("Failed to copy text: ", err);
    });
});

//Generate Strong PassWord Event Listiner
strongPass.addEventListener("click", function () {
  controlBtn = 1;
  controlButtons();
  highlightSelected(this);
});

//Generate Memorable Passwrod Event Listiner
memorablePass.addEventListener("click", function () {
  controlBtn = 2;
  controlButtons();
  highlightSelected(this);
});

//Generate PIN Code Event Listiner
pinCode.addEventListener("click", function () {
  controlBtn = 3;
  controlButtons();
  highlightSelected(this);
});

//Generate Passphrase Event Listiner
wordCombination.addEventListener("click", function () {
  controlBtn = 4;
  controlButtons();
  highlightSelected(this);
});
//Customiz password Event Listiner
customizPass.addEventListener("click", function () {
  controlBtn = 5;
  controlButtons();
  highlightSelected(this);
});
// Check Users Password Strongth
userPassword.addEventListener("click", function () {
  controlBtn = 6;
  disableTextField(true);
  highlightSelected(this);
});

// Generate password button
generatPasswBtn.addEventListener("click", async function () {
  controlButtons();
});
async function controlButtons() {
  switch (controlBtn) {
    case 1:
      passwordFild.value = generateStrongPassword(16);
      toggleDisplay(false);
      disableTextField(false);
      strongPass.focus();
      break;
    case 2:
      passwordFild.value = await generateMemorablePassword();
      toggleDisplay(false);
      disableTextField(false);
      break;
    case 3:
      passwordFild.value = generatePinCode(6);
      checkUserPassword(passwordFild.value);
      toggleDisplay(false);
      disableTextField(false);
      break;
    case 4:
      passwordFild.value = await generatePassphrase();
      toggleDisplay(false);
      disableTextField(false);
      break;
    case 5:
      disableTextField(false);
      toggleDisplay(true);
      passwordFild.value = customizePassword(rangeSlider.value);
      break;
    case 6:
      toggleDisplay(false);
      checkUserPassword(passwordFild.value);
      break;
  }
}
// Toggle Display Property of Customize Password
function toggleDisplay(toggleData) {
  if (toggleData) {
    document.querySelector(".customize").style.display = "flex";
  } else {
    document.querySelector(".customize").style.display = "none";
  }
}
// Able & Disable Text Field
function disableTextField(disable) {
  if (!disable) {
    passwordFild.readOnly = true;
    passwordFild.style.cursor = "default";
  } else {
    passwordFild.focus();
    passwordFild.value = "";
    passwordFild.readOnly = false;
    passwordFild.disabled = false;
    passwordFild.style.cursor = "text";
  }
}

// Check Users Password Strongth
function checkUserPassword(UPassword) {
  UPassword = String(UPassword);
  const strengthLabel = document.getElementById("strengthLabel");
  const regexUppercase = /[A-Z]/;
  const regexNumber = /\d/;
  const regexSymbol = /[!@#$%^&*()]/;

  let rate = 0;

  if (regexUppercase.test(UPassword)) rate += 25;
  if (regexNumber.test(UPassword)) rate += 25;
  if (regexSymbol.test(UPassword)) rate += 25;
  if (UPassword.length >= 12) rate += 25;

  const bars = [
    document.getElementById("div1"),
    document.getElementById("div2"),
    document.getElementById("div3"),
    document.getElementById("div4"),
  ];
  bars.forEach((bar) => (bar.style.backgroundColor = "#ccc")); // or any base color

  if (rate <= 25) {
    bars[0].style.backgroundColor = "rgb(235, 61, 55)";
    strengthLabel.textContent = "Weak";
  } // Weak
  if (rate === 50) {
    bars.slice(0, 2).forEach((bar) => {
      bar.style.backgroundColor = "rgb(235, 157, 55)";
    });
    strengthLabel.textContent = "Medium";
  } // Medium
  if (rate === 75) {
    bars.slice(0, 3).forEach((bar) => {
      bar.style.backgroundColor = "rgb(223, 235, 55)";
    });
    strengthLabel.textContent = "Good";
  }
  if (rate === 100) {
    bars.forEach((item) => (item.style.backgroundColor = "rgb(61, 243, 25)"));
    strengthLabel.textContent = "Very Strong";
  } // Strong
}

// Customize password Function
function customizePassword(length) {
  const uppercaseSwitch = uppercaseToggle.checked;
  const numberSwitch = numberToggle.checked;
  const symbolSwitch = symbolToggle.checked;

  let password = "";
  let notAllowedCharacter = [
    32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50,
    51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69,
    70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88,
    89, 90, 91, 92, 93, 94, 95, 96, 123, 125,
  ];

  let controlLoop = true;
  let pattern = "^";
  pattern += "(?=.*[a-z])";
  if (uppercaseSwitch) {
    const addAllowed = [
      65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82,
      83, 84, 85, 86, 87, 88, 89, 90,
    ];
    notAllowedCharacter = notAllowedCharacter.filter(
      (num) => !addAllowed.includes(num)
    );
    pattern += "(?=.*[A-Z])";
  }
  if (numberSwitch) {
    const addAllowed = [48, 49, 50, 51, 52, 53, 54, 55, 56, 57];
    notAllowedCharacter = notAllowedCharacter.filter(
      (num) => !addAllowed.includes(num)
    );
    pattern += "(?=.*\\d)";
  }
  if (symbolSwitch) {
    const addAllowed = [
      32, 33, 35, 36, 37, 38, 40, 41, 42, 43, 44, 45, 47, 64, 94,
    ];
    notAllowedCharacter = notAllowedCharacter.filter(
      (num) => !addAllowed.includes(num)
    );
    pattern += "(?=.*[!@#$%^&*()])";
  }
  pattern += ".+$";
  const regex = new RegExp(pattern);

  while (controlLoop) {
    password = "";
    for (let i = 1; i <= length; i++) {
      let charCode = Math.floor(Math.random() * (125 - 33 + 1)) + 33;

      if (!notAllowedCharacter.includes(charCode)) {
        password += String.fromCharCode(charCode);
      } else {
        i--;
      }
    }

    if (regex.test(password)) {
      controlLoop = false;
    } else {
      password = "";
    }
  }
  checkUserPassword(password);
  return password;
}

// Generate Passphrase Function
async function generatePassphrase() {
  const word1 = await returnRandomWord();
  const word2 = await returnRandomWord();
  const word3 = await returnRandomWord();

  const num = Math.floor(Math.random() * 1000);
  let phrase = word1 + "-" + word2 + "-" + word3 + "-" + num;
  checkUserPassword(phrase);
  return phrase;
}
//Generate Strong PassWord
function generateStrongPassword(length) {
  let password = "";
  let notAllowedCharacter = [
    34, 39, 44, 46, 59, 61, 63, 91, 92, 93, 95, 96, 125, 123,
  ];
  let preDefinedPass;
  let controlLoop = true;
  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()]).+$/;

  while (controlLoop) {
    for (let i = 1; i <= length; i++) {
      preDefinedPass = Math.floor(Math.random() * (125 - 33 + 1)) + 33;
      if (!notAllowedCharacter.includes(preDefinedPass)) {
        password += String.fromCharCode(preDefinedPass);
      } else {
        i--;
      }
    }
    if (regex.test(password)) {
      controlLoop = false;
    } else {
      password = "";
    }
  }
  checkUserPassword(password);
  return password;
}

// Generate Memorable Password
async function generateMemorablePassword() {
  let password = "";
  let controlLoop = true;
  while (controlLoop) {
    const word1 = await returnRandomWord();
    const word2 = await returnRandomWord();
    const num = Math.floor(Math.random() * (999 - 100 + 1)) + 100;
    if (word1 !== word2) {
      password = word1 + word2 + num;
      controlLoop = false;
    }
  }
  checkUserPassword(password);
  return password;
}

async function returnRandomWord() {
  try {
    const response = await fetch(
      "https://api.wordnik.com/v4/words.json/randomWord?hasDictionaryDef=true&maxCorpusCount=-1&minDictionaryCount=1&maxDictionaryCount=-1&minLength=5&maxLength=-1&api_key=tc0sted9lt6ty1msb2zxp33hagc83l312onh4ypi9l6wb4r38"
    );

    const data = await response.json();
    return data.word;
  } catch (error) {
    console.log("Error: ", error);
    return null;
  }
}
// Generate PIN Code
function generatePinCode(pinLength) {
  let pinCode = "";
  for (let i = 0; i < pinLength; i++) {
    pinCode += Math.floor(Math.random() * 10);
  }
  return pinCode;
}

function highlightSelected(button) {
  const allButtons = [
    strongPass,
    memorablePass,
    pinCode,
    wordCombination,
    customizPass,
    userPassword,
  ];

  allButtons.forEach((btn) => btn.classList.remove("selected"));
  button.classList.add("selected");
}
