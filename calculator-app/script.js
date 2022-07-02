"use strict";

const ballToMove = document.querySelector(".ball");
const ball = document.querySelector(".contain-ball");

// grabbing all th elements
const body = document.body;
const textDisplay = document.querySelector(".text-display");
const spanText = document.querySelector(".inner-text");
const keysBg = document.querySelector(".nums-and-symbols");
const delBtn = document.querySelector(".delete");
const resetBtn = document.querySelector(".reset");
const equalBtn = document.querySelector(".equal");
const allNumbers = document.querySelectorAll(".val");
const resDel = document.querySelectorAll(".diff");
const desTexts = document.querySelectorAll(".color-change");

//retrieving all the styles set on the the root scope of the html document
let rootStyles = getComputedStyle(document.querySelector(":root"));

//this is a function to move the ball

//thought process

function changeTheme(x) {
  //body, screen, keypad background
  body.style.backgroundColor = rootStyles.getPropertyValue(
    `--main-backround-${x}`
  );
  textDisplay.style.backgroundColor = rootStyles.getPropertyValue(
    `--screen-backround-${x}`
  );
  keysBg.style.backgroundColor = rootStyles.getPropertyValue(
    `--toggle-or-key-background-${x}`
  );
  //styling the keys
  allNumbers.forEach((btn) => {
    btn.style.backgroundColor = rootStyles.getPropertyValue(`--nums-syms-${x}`);
    const col = rootStyles.getPropertyValue(`--nums-syms-shadow-${x}`);
    btn.style.boxShadow = `0px 3px 0px 0px ${col}`;

    btn.style.color = rootStyles.getPropertyValue(`--text-${x}`);
  });
  //styling the reset and delete button
  resDel.forEach((btn) => {
    btn.style.backgroundColor = rootStyles.getPropertyValue(`--reset-${x}`);
    const col = rootStyles.getPropertyValue(`--reset-shadow-${x}`);
    btn.style.boxShadow = `0px 3px 0px 0px ${col}`;
  });
  //for the equal button
  equalBtn.style.backgroundColor = rootStyles.getPropertyValue(`--equal-${x}`);
  const col = rootStyles.getPropertyValue(`--equal-shadow-${x}`);
  equalBtn.style.boxShadow = `0px 3px 0px 0px ${col}`;

  //for the ball
  ballToMove.style.backgroundColor = rootStyles.getPropertyValue(
    `--ballbg-Color-${x}`
  );

  //behind the ball
  ball.style.backgroundColor = rootStyles.getPropertyValue(
    `--behindballbg-color-${x}`
  );

  //text displayed on screen
  textDisplay.style.color = rootStyles.getPropertyValue(`--text-display-${x}`);

  //descriptive text
  desTexts.forEach((el) => {
    el.style.color = rootStyles.getPropertyValue(`--desTexts-${x}`);
  });
}

//const y = "0 3px 0 0 rootStyles.getPropertyValue(--reset-shadow-${1})";

//this function animates the moving of the theme ball and changes the theme accordingly
function myMove(initialLeft, initialLeft2 = 0, y, id = null, z) {
  let pos = initialLeft;
  clearInterval(id);
  id = setInterval(frame, 30);
  function frame() {
    let x;
    initialLeft2 ? (x = initialLeft2) : (x = initialLeft);
    if (pos === x + y) {
      clearInterval(id);
    } else {
      if (z === 1) {
        pos++;
      } else {
        pos--;
      }
      ballToMove.style.left = pos + "px";
    }
  }
}

ball.addEventListener("click", function (e) {
  //this gets the position of the ball
  const initialLeft = ballToMove.offsetLeft;
  //this gets the cordinates of the the whole div
  const final = e.target.getBoundingClientRect();
  //this calculates the x position of the point clicked
  const x = Number(e.clientX - final.left);
  if (
    x <= 13 &&
    e.target !==
      ballToMove /*this ball to move prevents the fact that everytime we click the ball it produces a cordinate smaller than 13, causing the ball to move back*/
  ) {
    if (initialLeft <= 12) {
      return;
    } else {
      let z = -1;
      let initialLeft2 = 1;
      let y = 0;
      myMove(initialLeft, 1, y, z);
      //setting all the styles manually
      changeTheme(1);
      localStorage.setItem("theme", "theme-1");
    }
  } else if (14 <= x && x <= 26) {
    if (initialLeft === 13) {
      return;
    } else {
      if (initialLeft === 1) {
        let y;
        initialLeft === 14 ? (y = 1) : (y = 13);
        //let y = 13;
        myMove(initialLeft, y, null, y, 1);
        changeTheme(2);
        localStorage.setItem("theme", "theme-2");
      } else {
        let z = -1;
        let initialLeft2 = 14;
        let y = 0;
        myMove(initialLeft, initialLeft2, y, z);
        textDisplay.style.backgroundColor =
          rootStyles.getPropertyValue("--background-2a");
        localStorage.setItem(
          "textDisplay.style.backgroundColor",
          "rootStyles.getPropertyValue('--background-2a')"
        );
        changeTheme(2);
        localStorage.setItem("theme", "theme-2");
      }
    } //Guard Clause
  } else if (27 <= x && x <= 39) {
    if (initialLeft === 27) {
      return;
    }
    let y;
    initialLeft === 14 ? (y = 13) : (y = 26);
    myMove(initialLeft, y, null, 0, 1);
    changeTheme(3);
    localStorage.setItem("theme", "theme-3");
  } else {
  }
});

//implementing the mathematical logic and printing to the screen
allNumbers.forEach((el) => {
  //getting the text content of the  clicked button
  el.addEventListener("mousedown", (e) => {
    e.preventDefault();
    let num = textDisplay.textContent + el.textContent;
    textDisplay.textContent = `${num}`;
  });
});

//this returns the evaluated mathematics on the screen
equalBtn.addEventListener("click", (e) => {
  textDisplay.innerHTML = `<span>${eval(textDisplay.textContent)}</span>`;
});

//this does the deletion per character on the screen
delBtn.addEventListener("click", (e) => {
  let abc = textDisplay.textContent.slice(0, -1);
  textDisplay.innerHTML = `<span>${abc}</span>`;
});

//clears the sscreen
resetBtn.addEventListener("click", (e) => {
  textDisplay.textContent = "";
});

// when the page is reloaded, I retrieve the them set set in local storage and apply the funnction that renders the right theme
let theme = localStorage.getItem("theme");
let themeNumber;
if (theme) {
  themeNumber = theme.slice(-1);
  changeTheme(themeNumber);
}
