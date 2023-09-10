const buttons = document.querySelectorAll("button");
let displayMain = document.querySelector("#display :last-child");
let displaySub = document.querySelector("#display :first-child");
let switcher = false;
buttons.forEach(e => {
  e.addEventListener("click", () => {
    if(e.getAttribute("class") === "number"){
      !switcher ? displayMain.innerText += e.innerText : displayMain.innerText += ` ${e.innerText}`;
      switcher = false;
    }
    if(e.getAttribute("class") === "math-operators"){
      if (switcher || displayMain.innerText === "") return;
      displayMain.innerText +=` ${e.innerText} `;
      switcher = true;
    }
  })
});

let mathOperators = {
  "+": (a, b) => a + b,
  "-": (a, b) => a - b,
  "*": (a, b) => a * b,
  "/": (a, b) => a / b
}

// function mathChecker(){
//   const arr = displayMain.innerText.split(' ');
//   return arr.length === 3 ? 3 : arr.length === 2 ? 2 : 0;
// }