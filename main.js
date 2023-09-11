const buttons = document.querySelectorAll("button");
const displayMain = document.querySelector("#display :last-child");
const displaySub = document.querySelector("#display :first-child");
buttons.forEach((e) => {
  e.addEventListener("click", () => {
    if (e.getAttribute("class") === "number") {
      displayMain.innerText.split(" ").length < 2
        ? (displayMain.innerText += e.innerText)
        : displayMain.innerText.split(" ").length === 2
        ? (displayMain.innerText += ` ${e.innerText}`)
        : (displayMain.innerText += e.innerText);
    }
    if (e.getAttribute("id") === "dote-button") {
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
        displayMain.innerText.split(" ").length >= 2
      )
        return;
      displayMain.innerText += ` ${e.innerText}`;
    }
    if (e.getAttribute("id") === "equal-button") {
      const operators = ["/", "*", "+", "-"];
      const arr = displayMain.innerText.split(" ");
      for (i = 0; i < operators.length; i++) {
        while (arr.includes(operators[i])) {
          let operator = arr.findIndex((item) => item === operators[i]);
          let result = mathOperators[arr[operator]](
            +arr[operator - 1],
            +arr[operator + 1]
          );
          arr.splice(operator - 1, 3, result);
        }
      }
      displaySub.innerText = displayMain.innerText;
      displayMain.innerText = arr;
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
  });
});

let mathOperators = {
  "+": (a, b) => a + b,
  "-": (a, b) => a - b,
  "*": (a, b) => a * b,
  "/": (a, b) => a / b,
};
