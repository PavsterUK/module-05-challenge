// Array of special characters to be included in password
var specialCharacters = [
  "@",
  "%",
  "+",
  "\\",
  "/",
  "'",
  "!",
  "#",
  "$",
  "^",
  "?",
  ":",
  ",",
  ")",
  "(",
  "}",
  "{",
  "]",
  "[",
  "~",
  "-",
  "_",
  ".",
];

// Array of numeric characters to be included in password
var numericCharacters = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

// Array of lowercase characters to be included in password
var lowerCasedCharacters = [
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
];

// Array of uppercase characters to be included in password
var upperCasedCharacters = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
];

let passLength = 0;
let includeLowerCase = false;
let includeUpperCase = false;
let includeNumeric = false;
let includeSpecialChar = false;

// Function to prompt user for password options.
function getPasswordOptions() {
  passLength = getPasswordLength();
  includeLowerCase = getCharTypePrompt("lowercase");
  includeUpperCase = getCharTypePrompt("uppercase");
  includeNumeric = getCharTypePrompt("numeric");
  includeSpecialChar = getCharTypePrompt("special characters");
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

function getCharTypePrompt(CharType) {
  return confirm(
    `Would you like to include ${CharType} chaacters in your password?`
  );
}

// Function for getting a random element from an array.
// Takes two arguments: array and desired number of randomly selected elements.
// Returns an array with randomly selected elements.
function getRandom(charArr, numElem) {
  let result = [];
  while (result.length < numElem) {
    const randNum = Math.floor(Math.random() * charArr.length);
    const randElem = charArr[randNum];
    if (!result.includes(randElem)) {
      result.push(randElem);
    }
  }
  return result;
}

// Function to generate password with user input
function generatePassword() {}

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
