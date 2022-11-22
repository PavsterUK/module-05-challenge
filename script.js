import {
  specialCharacters,
  numericCharacters,
  lowerCasedCharacters,
  upperCasedCharacters,
} from "./data.js";

let passwordOptions = {
  passwordLegth: 0,
  lowerCased: false,
  upperCased: false,
  numeric: false,
  special: false,
  numSelectedOptions: 0,
};

// Function to prompt user for password options.
function getPasswordOptions() {
  getPasswordLength();
  while (true) {
    alert(
      "Next, you will be asked what types of characters should be used to make your password."
    );
    alert("#NOTE#> At least ONE of the following options MUST be selected");
    getCharTypePrompt("lowerCased");
    getCharTypePrompt("upperCased");
    getCharTypePrompt("numeric");
    getCharTypePrompt("special");
    if (passwordOptions.numSelectedOptions > 0) {
      break;
    }
    alert("NOTE> You have not selected any characters to make your password.");
  }
}

//Prompt user to select password length.
function getPasswordLength() {
  while (true) {
    const userInput = prompt(
      "Please enter a desired password length between 10 and 64 (including)"
    );
    const numRegex = /^\d+$/; //Regex to check if string only contains numbers.
    if (
      numRegex.test(userInput) &&
      Number(userInput) >= 10 &&
      Number(userInput) <= 64
    ) {
      return (passwordOptions.passwordLegth = Number(userInput));
    }
    alert("Please make sure to enter a number between 10 and 64 (including)");
  }
}

//Prompt user whether to include a suggested character type.
//Takes one argument: character type string.
function getCharTypePrompt(charType) {
  const userChoise = confirm(
    `Would you like to include ${charType} characters in your password?`
  );
  if (userChoise) {
    passwordOptions[charType] = true;
    passwordOptions.numSelectedOptions++;
  }
}

// Function for getting a random element from an array.
// Takes two arguments: array and desired number of randomly selected elements.
// Returns an array with randomly selected elements.
function getRandom(charArr, numOfElem) {
  let result = [];
  while (result.length < numOfElem) {
    const randNum = Math.floor(Math.random() * charArr.length);
    const randElem = charArr[randNum];
    result.push(randElem);
  }
  return result;
}

// Function to generate password with user input
function generatePassword() {
  const quotient = Math.floor(
    passwordOptions.passwordLegth / passwordOptions.numSelectedOptions
  );
  const remainder =
    passwordOptions.passwordLegth % passwordOptions.numSelectedOptions;


  
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
generateBtn.addEventListener("click", getPasswordOptions);
