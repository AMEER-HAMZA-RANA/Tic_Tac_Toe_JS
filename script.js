const cellElements = [...document.querySelectorAll("[data-cell]")];
const winningModal = document.querySelector("#winningMessage");
const decisionText = document.querySelector("[data-winning-message-text]");
const restartBtn = document.querySelector("#restartButton");
const board = document.querySelector("#board");

let currentTurnBool;
let currentTurn;

const X_CLASS = "x";
const CIRCLE_CLASS = "o";

function restartGame() {
  board.classList.remove(X_CLASS);
  board.classList.remove(CIRCLE_CLASS);
  board.classList.add(X_CLASS);

  cellElements.forEach((cell) => {
    cell.addEventListener("click", handleClick, { once: true });
  });

  decisionText.innerText = "";
  winningModal.classList.remove("show");

  resetCells();

  currentTurnBool = false;
}

restartGame();

const WIN_COMBINATIONS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function handleClick(e) {
  const cell = e.target;
  board.classList.remove(X_CLASS);
  board.classList.remove(CIRCLE_CLASS);
  if (!currentTurnBool) {
    board.classList.add(CIRCLE_CLASS);
  } else {
    board.classList.add(currentTurn);
  }
  currentTurn = currentTurnBool ? CIRCLE_CLASS : X_CLASS;
  markCell(cell, currentTurn);
  result(checkForWin());

  swapTurns();
}

function markCell(cell, currentTurn) {
  cell.classList.add(currentTurn);
}

function swapTurns() {
  currentTurnBool = !currentTurnBool;
}

function resetCells() {
  cellElements.forEach((cell) => {
    cell.classList.remove(X_CLASS);
    cell.classList.remove(CIRCLE_CLASS);
  });
}

function checkForWin() {
  return WIN_COMBINATIONS.some((cellLine) =>
    cellLine.every((cell) =>
      currentTurn === X_CLASS
        ? cellElements[cell].classList.contains(X_CLASS)
        : cellElements[cell].classList.contains(CIRCLE_CLASS)
    )
  );

  // return WIN_COMBINATIONS.some(Line => {
  //     return Line.every(cell => {
  //         if(currentTurn == 'x') {
  //             return cellElements[cell].classList.contains('x')
  //         } else if(currentTurn == 'o') {
  //             return cellElements[cell].classList.contains('o')
  //         }
  //     })
  // })
}

function result(checkForWin) {
  let xCells = [...board.querySelectorAll(".x")];
  let oCells = [...board.querySelectorAll(".o")];
  if (checkForWin === true && (xCells.length >= 3 || oCells.length >= 3)) {
    decisionText.innerText = `${currentTurn} wins`;
    winningModal.classList.add("show");
    restartBtn.addEventListener("click", restartGame);
  } else if (
    checkForWin === false &&
    (xCells.length == 5 || oCells.length == 5)
  ) {
    decisionText.innerText = "Draw";
    winningModal.classList.add("show");
    restartBtn.addEventListener("click", restartGame);
  }
}
