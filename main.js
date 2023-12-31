const buttons = document.querySelectorAll("button");
const displayMain = document.querySelector("#display :last-child");
const displaySub = document.querySelector("#display :first-child");

let mathOperators = {
  "+": (a, b) => a + b,
  "-": (a, b) => a - b,
  "*": (a, b) => a * b,
  "/": (a, b) => a / b,
};

function evaluate() {
  const operators = ["/", "*", "+", "-"];
  const arr = displayMain.innerText.split(" ");
  if (arr.length < 3) return;
  for (i = 0; i < operators.length; i++) {
    while (arr.includes(operators[i])) {
      let operator = arr.findIndex((item) => item === operators[i]);
      let result = mathOperators[arr[operator]](
        +arr[operator - 1],
        +arr[operator + 1]
      );
      arr.splice(operator - 1, 3, Math.round(result * 1000) / 1000);
    }
  }
  displaySub.innerText = displayMain.innerText;
  displayMain.innerText = arr;
}

function conditionChecker(e) {
  if (e === null) return;
  if (e.getAttribute("class") === "number") {
    displayMain.innerText.split(" ").length < 2
      ? (displayMain.innerText += e.innerText)
      : displayMain.innerText.split(" ").length === 2
      ? (displayMain.innerText += ` ${e.innerText}`)
      : (displayMain.innerText += e.innerText);
  }
  if (e.getAttribute("id") === "dot-button") {
    const arr = displayMain.innerText.split(" ");
    if (
      (arr.length < 2 && arr[0].split("").some((item) => item === ".")) ||
      (arr.length > 2 && arr[2].split("").some((item) => item === ".")) ||
      arr.length === 2
    ) {
      return;
    } else displayMain.innerText += e.innerText;
  }
  if (e.getAttribute("class") === "math-operators") {
    if (
      displayMain.innerText === "" ||
      displayMain.innerText.split(" ").length === 2
    )
      return;
    if (displayMain.innerText.split(" ").length > 2) evaluate();
    displayMain.innerText += ` ${e.innerText}`;
  }
  if (e.getAttribute("id") === "equal-button") {
    evaluate();
  }
  if (e.getAttribute("id") === "all-clear") {
    displayMain.innerText = "";
    displaySub.innerText = "";
  }
  if (e.getAttribute("id") === "clear") {
    let arr = displayMain.innerText.split("");
    arr.pop();
    displayMain.innerText = arr.join("");
  }
}

buttons.forEach((e) => {
  e.addEventListener("click", () => {
    conditionChecker(e);
  });
});

window.addEventListener("keydown", (e) => {
  let data = document.querySelector(`button[data-key="${e.key}"]`);
  conditionChecker(data);
});
