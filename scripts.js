///// DOM Nodes
const calcInput = document.querySelector(".calc-input");
const clearBtn = document.querySelector(".clear");
const divideBtn = document.querySelector(".divide");
const multiplyBtn = document.querySelector(".multiply");
const eraseBtn = document.querySelector(".erase");
const zeroBtn = document.querySelector(".zero");
const oneBtn = document.querySelector(".one");
const twoBtn = document.querySelector(".two");
const threeBtn = document.querySelector(".three");
const fourBtn = document.querySelector(".four");
const fiveBtn = document.querySelector(".five");
const sixBtn = document.querySelector(".six");
const sevenBtn = document.querySelector(".seven");
const eightBtn = document.querySelector(".eight");
const nineBtn = document.querySelector(".nine");
const percentBtn = document.querySelector(".percent");
const periodBtn = document.querySelector(".period");
const subtractBtn = document.querySelector(".subtract");
const addBtn = document.querySelector(".add");
const equalsBtn = document.querySelector(".equals");

///// Global Variables
let userInput, operator, results;
const operatorsSymbols = ["+", "-", "/", "*"];

///// Functions
const add = function (num1, num2) {
  return num1 + num2;
};

const subtract = function (num1, num2) {
  return num1 - num2;
};

const multiply = function (num1, num2) {
  return num1 * num2;
};

const divide = function (num1, num2) {
  return num1 / num2;
};

const operate = function (operator, num1, num2) {
  switch (operator) {
    case "+":
      return add(num1, num2);
    case "-":
      return subtract(num1, num2);
    case "*":
      return multiply(num1, num2);
    case "/":
      return divide(num1, num2);
    default:
      return "Something is missing:Either operator or one of the two required number inputs";
  }
};

const getAccurateUserInput = (userInput) => {
  const stringPartToRemove = /undefined/;
  if (stringPartToRemove.test(userInput)) {
    return userInput.replace("undefined", "").trim();
  } else {
    return userInput;
  }
};

const extractInputValues = (userInput) => {
  const correctUserInput = getAccurateUserInput(userInput);
  const separatedInputsArr = correctUserInput.split(/[+-/*]/);
  return separatedInputsArr;
};

const performArithmeticOperation = (operator, values) => {
  if (values.length < 2) return;
  const operationOutput = operate(operator, +values[0], +values[1]);
  // Check if output is a whole number or not
  return operationOutput % 1 !== 0
    ? operationOutput.toFixed(4)
    : operationOutput;
};

const arithmeticOperationResults = (userInput, operator) => {
  const values = extractInputValues(userInput);
  return performArithmeticOperation(operator, values);
};

const populateDisplayCallback = function (e) {
  // Callback function that is called in number buttons event listeners to populate the display
  const capturedValue = e.target.value;
  userInput += capturedValue;
  calcInput.value += capturedValue;

  //check if an operator has been selected
  if (operatorsSymbols.includes(capturedValue)) {
    operator = capturedValue;
  }

  results = arithmeticOperationResults(userInput, operator);
};

///// Event Listeners
// Values
zeroBtn.addEventListener("click", populateDisplayCallback);
oneBtn.addEventListener("click", populateDisplayCallback);
twoBtn.addEventListener("click", populateDisplayCallback);
threeBtn.addEventListener("click", populateDisplayCallback);
fourBtn.addEventListener("click", populateDisplayCallback);
fiveBtn.addEventListener("click", populateDisplayCallback);
sixBtn.addEventListener("click", populateDisplayCallback);
sevenBtn.addEventListener("click", populateDisplayCallback);
eightBtn.addEventListener("click", populateDisplayCallback);
nineBtn.addEventListener("click", populateDisplayCallback);

// Operators
addBtn.addEventListener("click", populateDisplayCallback);
subtractBtn.addEventListener("click", populateDisplayCallback);
multiplyBtn.addEventListener("click", populateDisplayCallback);
divideBtn.addEventListener("click", populateDisplayCallback);

equalsBtn.addEventListener("click", function () {
  if (results) {
    calcInput.value = results;
  }
});

clearBtn.addEventListener("click", function () {
  calcInput.value = "";
  results = 0;
  userInput = "";
  operator = "";
});
