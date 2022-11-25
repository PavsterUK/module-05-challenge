import { special, numeric, lowerCased, upperCased } from "./data.js";

let data = {
  special: special,
  numeric: numeric,
  lowerCased: lowerCased,
  upperCased: upperCased,
};

let passwordOptions = {};

/**
 * Create @passwordOptions object properties and default values.
 */
function initPasswordOptions() {
  (passwordOptions.passwordLength = 0),
    (passwordOptions.lowerCased = false),
    (passwordOptions.upperCased = false),
    (passwordOptions.numeric = false),
    (passwordOptions.special = false),
    (passwordOptions.numSelectedOptions = 0);
}

/**
 * Prompt user to select options for password creation.
 * Collected data saved to @passwordOptions object.
 */
function getPasswordOptions() {
  initPasswordOptions();
  getPasswordLength();
  while (true) {
    alert(
      "Next, you will be asked what types of characters should be used to make your password.\n\n" +
        "At least ONE of the options MUST be selected."
    );
    confirmCharType("lowerCased");
    confirmCharType("upperCased");
    confirmCharType("numeric");
    confirmCharType("special");
    if (passwordOptions.numSelectedOptions > 0) break;
    else alert("You have not selected any character types.");
  }
}

/**
 * Prompt user to select password length.
 * Collected data saved to @passwordOptions object.
 */
function getPasswordLength() {
  while (true) {
    const userInput = prompt(
      "Please enter a desired password length between 10 and 64 (including)"
    );
    const numRegex = /^\d+$/; //Regex to check if string contains only numbers.
    if (
      numRegex.test(userInput) &&
      Number(userInput) >= 10 &&
      Number(userInput) <= 64
    ) {
      return (passwordOptions.passwordLength = Number(userInput));
    }
    alert("Please make sure to enter a number between 10 and 64 (including)");
  }
}

/**
 * Confirm if user wants to include offered character type.
 * Collected data saved to @passwordOptions object.
 * @param {String} charType The character type.
 */
function confirmCharType(charType) {
  const userChoise = confirm(
    `Would you like to include ${charType} characters in your password?`
  );
  if (userChoise) {
    passwordOptions[charType] = true;
    passwordOptions.numSelectedOptions++;
  }
}

/**
 * Get a number of randomly selected elements from an array.
 * @param {Array} charArr The characters array.
 * @param {Number} num Desired number of randomly selected elements.
 * @return {String} Concatenated string of randomly selected characters.
 */
function getRandom(charArr, numOfElem) {
  let result = "";

  while (result.length < numOfElem) {
    const randNum = Math.floor(Math.random() * charArr.length);
    const randElem = charArr[randNum];
    result += randElem;
  }
  return result;
}

/**
 * Generate a password.
 * Each selected character type will get an equal
 * portion of password length, if password length cannot
 * be divided evenly, first selected character type will
 * loose one character to make up total password length.
 * @return {String} The password string.
 */
function generatePassword() {
  let password = "";
  getPasswordOptions();
  const quotient = Math.ceil(
    passwordOptions.passwordLength / passwordOptions.numSelectedOptions
  );
  const remainder =
    quotient * passwordOptions.numSelectedOptions -
    passwordOptions.passwordLength;

  let optionNumber = 0;
  Object.keys(passwordOptions).filter((prop) => {
    if (passwordOptions[prop] === true) {
      optionNumber === 0
        ? (password += getRandom(data[prop], quotient - remainder))
        : (password += getRandom(data[prop], quotient));
      optionNumber++;
    }
  });

  return password;
}

// Get references to the #generate element
var generateBtn = document.querySelector("#generate");

// Write password to the #password input
function writePassword() {
  var password = generatePassword();
  var passwordText = document.querySelector("#password");

  passwordText.value = password;
}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);
