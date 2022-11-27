import {
  specialCharacters,
  numericCharacters,
  lowerCasedCharacters,
  upperCasedCharacters,
} from "./data.js";

/**
 * Object containing data (Character arrays).
 */
const charTypes = {
  special: specialCharacters,
  numeric: numericCharacters,
  lowerCased: lowerCasedCharacters,
  upperCased: upperCasedCharacters,
};

/**
 * Object to store generated password options.
 */
let passwordOptions = {};

/**
 * Initialize @passwordOptions properties and default values.
 */
function initPasswordOptions() {
  passwordOptions.passwordLength = 0;
  passwordOptions.lowerCased = false;
  passwordOptions.upperCased = false;
  passwordOptions.numeric = false;
  passwordOptions.special = false;
  passwordOptions.numSelectedOptions = 0;
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
      "Please choose character types for your password.\n\n" +
        "At least ONE of the following options MUST be selected."
    );
    for (const charType in charTypes) {
      confirmCharType(charType);
    }
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
      "Please enter a desired password length, between 10 and 64 (Inclusive)"
    );
    const numRegex = /^\d+$/; //Regex to check if string contains only numbers.
    if (
      numRegex.test(userInput) &&
      Number(userInput) >= 10 &&
      Number(userInput) <= 64
    )
      return (passwordOptions.passwordLength = Number(userInput));
    else {
      alert("Selected number must be between 10 and 64 (Inclusive)");
    }
  }
}

/**
 * Confirm if user wants to include offered character type.
 * Collected data saved to @passwordOptions object.
 * @param {String} charType The character type name.
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
function getRandElemStr(charArr, numOfElem) {
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
 * be divided evenly between number of options,
 * first selected character type will get one character
 * less than following character type(s).
 * @return {String} The password string.
 */
function generatePassword() {
  getPasswordOptions();
  const quotient = Math.ceil(
    passwordOptions.passwordLength / passwordOptions.numSelectedOptions
  );
  const remainder =
    quotient * passwordOptions.numSelectedOptions -
    passwordOptions.passwordLength;

  let password = "";
  let optionNumber = 0;
  Object.keys(passwordOptions).filter((prop) => {
    if (passwordOptions[prop] === true) {
      optionNumber === 0
        ? (password += getRandElemStr(charTypes[prop], quotient - remainder))
        : (password += getRandElemStr(charTypes[prop], quotient));
      optionNumber++;
    }
  });

  return password;
}

/**
 * Get references to the #generate element.
 */
var generateBtn = document.querySelector("#generate");

/**
 * Write password to the #password input.
 */
function writePassword() {
  var password = generatePassword();
  var passwordText = document.querySelector("#password");

  //Shuffle password before rendering, just to make it look cooler.
  passwordText.value = password
    .split("")
    .sort(() => 0.5 - Math.random())
    .join("");
}

/**
 * Add event listener to generate button.
 */
generateBtn.addEventListener("click", writePassword);
