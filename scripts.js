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
let userInput;

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

const populateDisplayCallback = function (e) {
  // Callback function that is called in number buttons event listeners to populate the display
  userInput += e.target.value;
  calcInput.value += e.target.value;
  console.log(userInput);
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
