const buttons = document.querySelectorAll("button");
let displayMain = document.querySelector("#display :last-child");
let displaySub = document.querySelector("#display :first-child");
let operatorIsLast = false;
buttons.forEach((e) => {
  e.addEventListener("click", () => {
    if (e.getAttribute("class") === "number") {
      !operatorIsLast
        ? (displayMain.innerText += e.innerText)
        : (displayMain.innerText += ` ${e.innerText}`);
      operatorIsLast = false;
    }
    if (e.getAttribute("class") === "math-operators") {
      if (operatorIsLast || displayMain.innerText === "" || displayMain.innerText.split(" ").length === 3) return;
      displayMain.innerText += ` ${e.innerText}`;
      operatorIsLast = true;
    }
    if (e.getAttribute("id") === "equal-button") {
      const arr = displayMain.innerText.split(" ");
      displaySub.innerText = displayMain.innerText;
      displayMain.innerText = mathOperators[arr[1]](+arr[0], +arr[2]);
    }
    if (e.getAttribute("id") === "all-clear") {
      displayMain.innerText = "";
      displaySub.innerText = "";
      operatorIsLast = false;
    }
    if (e.getAttribute("id") === "clear"){
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

// function mathChecker(){
//   const arr = displayMain.innerText.split(' ');
//   return arr.length === 3 ? 3 : arr.length === 2 ? 2 : 0;
// }
