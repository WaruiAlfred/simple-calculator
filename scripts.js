///// DOM Nodes
const calcInput1 = document.querySelector(".calc-input-1");
const calcInput2 = document.querySelector(".calc-input-2");
const clearBtn = document.querySelector(".clear");
const eraseBtn = document.querySelector(".erase");
const equalsBtn = document.querySelector(".equals");
const numberBtns = document.querySelectorAll("[data-number");
const operandBtns = document.querySelectorAll("[data-operand");

///// Global Variables
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
  } else if (e.key === "Backspace") {
    eraseCharacter();
    populateDisplay();
  } else if (e.key === "Delete") {
    clearDisplay();
  }
};
