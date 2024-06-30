const header = document.querySelector(".header");
const dialog = document.querySelector("#dialog");
const firstDialog = document.querySelector("#first-dialog");
firstDialog.addEventListener("click", () => {
  dialog.showModal();
});
const createBlock = () => {
  const block = document.createElement("div");
  block.classList.add("block");
  return block;
};
const fillRow = (row) => {
  for (let i = 1; i < 10; i++) {
    const block = createBlock();
    block.id = i;
    row.append(block);
  }
};
const rows = document.querySelectorAll(".row");
let curIndex = 0;

rows.forEach((row) => {
  fillRow(row);
});

const form = document.querySelector(".input-container");
const input = document.querySelector("#wordle-input");
const answer = "reservoir";
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const curRow = rows[curIndex];
  const children = curRow.querySelectorAll("div");
  let lettersRemaining = answer.split("");
  const guess = input.value.toLowerCase();
  for (let i = 0; i < 9; i++) {
    if (!guess[i]) {
      continue;
    }
    children[i].innerText = guess[i];
    if (guess[i] === answer[i]) {
      children[i].style.backgroundColor = "green";
      delete lettersRemaining[i];
      console.log(lettersRemaining);
    }
  }

  for (let i = 0; i < guess.length; i++) {
    if (lettersRemaining.includes(guess[i])) {
      if (lettersRemaining[i]) {
        children[i].style.backgroundColor = "yellow";
      }
    }
  }
  input.value = "";
  curIndex += 1;
  if (curIndex > 2) {
    header.hidden = false;
  }
  if (lettersRemaining.every((letter) => letter === undefined)) {
    firstDialog.showModal();
    console.log("help");
  }
});
