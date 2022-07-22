///// DOM Nodes
const calcInput1 = document.querySelector(".calc-input-1");
const calcInput2 = document.querySelector(".calc-input-2");
const clearBtn = document.querySelector(".clear");
const eraseBtn = document.querySelector(".erase");
const equalsBtn = document.querySelector(".equals");
const numberBtns = document.querySelectorAll("[data-number");
const operandBtns = document.querySelectorAll("[data-operand");

///// Global Variables
// let userInputs = [];
let previousUserInput = "",
  currentUserInput = "",
  operator,
  results;
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
      return;
  }
};

/*
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
  const separatedInputsArr = correctUserInput.split(" ");
  return separatedInputsArr;
};

const performArithmeticOperation = (operator, values) => {
  if (values.length < 2) return;
  const operationOutput = operate(operator, +values[0], +values[1]);
  console.log(operationOutput);
  // Check if output is a whole number or not
  return operationOutput % 1 !== 0
    ? operationOutput.toFixed(4)
    : operationOutput;
};

const arithmeticOperationResults = (userInputs, operator) => {
  // const values = extractInputValues(userInput);
  // console.log(values);
  return performArithmeticOperation(operator, userInputs);
};

const getAndStoreUserInput = (userInput) => {
  const valueObtained = getAccurateUserInput(userInput);
  userInputs.push(valueObtained);
};

const populateDisplayCallback = function (e) {
  // Callback function that is called in number buttons event listeners to populate the display
  const capturedValue = e.target.value;

  if (capturedValue === "." && userInput.includes(".")) return;

  if (operatorsSymbols.includes(capturedValue)) {
    operator = capturedValue;
    getAndStoreUserInput(userInput);
    userInput = "";
  } else if (userInputs.length === 2) {
    console.log(userInput);
    getAndStoreUserInput(userInput);
    results = arithmeticOperationResults(userInputs, operator);
    calcInput1.value = results;
    calcInput2.value = "";
    console.log(results, userInputs);
  } else {
    userInput += capturedValue;
  }

  calcInput2.value += capturedValue;
};
*/

const checkNumberDecimalPlaces = (number) => {
  if (number.toString().split(".")[1].length > 4) {
    return true;
  } else {
    return false;
  }
};

const performArithmeticOperation = () => {
  if (isNaN(+previousUserInput) || isNaN(+currentUserInput)) return; //check if values are numbers

  if (operator === "/" && currentUserInput == 0) {
    currentUserInput = "Not possible";

    setTimeout(() => {
      clearDisplay();
    }, 400);

    return;
  }

  const operationOutput = operate(
    operator,
    +previousUserInput,
    +currentUserInput
  );

  // Check if output is a whole number or not
  const finalResult =
    operationOutput % 1 !== 0 && checkNumberDecimalPlaces(operationOutput)
      ? operationOutput.toFixed(4)
      : operationOutput;

  currentUserInput = finalResult;
  operator = undefined;
  previousUserInput = "";
};

function populateDisplay() {
  calcInput2.value = currentUserInput;

  if (operator != null) {
    calcInput1.value = `${previousUserInput} ${operator}`;
  } else {
    calcInput1.value = "";
  }
}

const clearDisplay = function () {
  calcInput1.value = "";
  calcInput2.value = "";
  previousUserInput = "";
  currentUserInput = "";
  results = undefined;
  operator = undefined;
};

const eraseCharacter = () => {
  currentUserInput = currentUserInput.slice(0, -1);
};

const chooseNumber = (capturedValue) => {
  if (capturedValue === "%") return;
  if (capturedValue === "." && currentUserInput.includes(".")) return;
  currentUserInput += capturedValue;
};

const chooseOperand = (capturedValue) => {
  if (currentUserInput === "") return;

  if (previousUserInput !== "") {
    performArithmeticOperation();
  }

  operator = capturedValue;
  previousUserInput = currentUserInput;
  currentUserInput = "";
};

const numberBtnsListenerCallBack = (e) => {
  chooseNumber(e.target.value);
  populateDisplay();
};

const operandBtnsListenerCallBack = (e) => {
  chooseOperand(e.target.value);
  populateDisplay();
};

///// Event Listeners
numberBtns.forEach((button) =>
  button.addEventListener("click", numberBtnsListenerCallBack)
);

operandBtns.forEach((button) =>
  button.addEventListener("click", operandBtnsListenerCallBack)
);

equalsBtn.addEventListener("click", function () {
  performArithmeticOperation();
  populateDisplay();
});

clearBtn.addEventListener("click", function () {
  clearDisplay();
});

eraseBtn.addEventListener("click", function () {
  eraseCharacter();
  populateDisplay();
});

// Keyboard Support
document.onkeyup = (e) => {
  if ((!isNaN(e.key) && +e.key > -1 && +e.key < 10) || e.key === ".") {
    chooseNumber(e.key);
    populateDisplay();
  } else if (operatorsSymbols.includes(e.key)) {
    chooseOperand(e.key);
    populateDisplay();
  } else if (e.key === "=") {
    performArithmeticOperation();
    populateDisplay();
  }
};
