import {
  specialCharacters,
  numericCharacters,
  lowerCasedCharacters,
  upperCasedCharacters,
} from "./data.js";

let passLength = 0; 
let includeLowerCase = false;
let includeUpperCase = false;
let includeNumeric = false;
let includeSpecialChar = false;

// Function to prompt user for password options.
function getPasswordOptions() {
  passLength = getPasswordLength();
  while (true) {
    alert(
      "Next, you will be asked what character should your password be made from."
    );
    alert("NOTE> At least ONE of the following options MUST be selected");
    includeLowerCase = getCharTypePrompt("lowercased");
    includeUpperCase = getCharTypePrompt("uppercased");
    includeNumeric = getCharTypePrompt("numeric");
    includeSpecialChar = getCharTypePrompt("special characters");
    if (
      includeLowerCase ||
      includeUpperCase ||
      includeNumeric ||
      includeSpecialChar
    ) {
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
    const numRegex = /^\d+$/; //Regex to check for number only string.
    if (
      numRegex.test(userInput) &&
      Number(userInput) >= 10 &&
      Number(userInput) <= 64
    ) {
      return userInput;
    }
    alert("Please make sure to enter a number between 10 and 64 (including)");
  }
}

//Prompt user whether to include a suggested character type.
//Takes one argument: character type string.
function getCharTypePrompt(charType) {
  return confirm(
    `Would you like to include ${charType} characters in your password?`
  );
}

// Function for getting a random element from an array.
// Takes two arguments: array and desired number of randomly selected elements.
// Returns an array with randomly selected elements.
function getRandom(charArr, numOfElem) {
  let result = [];
  while (result.length < numOfElem) {
    const randNum = Math.floor(Math.random() * charArr.length);
    const randElem = charArr[randNum];
    if (!result.includes(randElem)) {
      result.push(randElem);
    }
  }
  return result;
}

// Function to generate password with user input
function generatePassword() {
  let numOfLower

  password = [];
  if (includeLowerCase) {
    let lowerChars = 
    password.push()
  }
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
