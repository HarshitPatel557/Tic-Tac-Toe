const boxes = document.querySelectorAll(".box");
const resetBtn = document.getElementById("reset-btn");

let turnO = true;
let gameOver = false;

// Create status message dynamically
const statusText = document.createElement("h2");
statusText.classList.add("status");
document.querySelector("main").appendChild(statusText);

const winPatterns = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const initGame = () => {
  turnO = true;
  gameOver = false;
  statusText.innerText = "Player O's turn";
  boxes.forEach((box) => {
    box.innerText = "";
    box.disabled = false;
    box.classList.remove("win");
  });
};

const disableBoxes = () => {
  boxes.forEach((box) => (box.disabled = true));
};

const checkWinner = () => {
  for (let pattern of winPatterns) {
    const [a, b, c] = pattern;
    const val1 = boxes[a].innerText;
    const val2 = boxes[b].innerText;
    const val3 = boxes[c].innerText;

    if (val1 && val1 === val2 && val2 === val3) {
      gameOver = true;
      statusText.innerText = `🎉 Player ${val1} Wins!`;
      boxes[a].classList.add("win");
      boxes[b].classList.add("win");
      boxes[c].classList.add("win");
      disableBoxes();
      return;
    }
  }

  const isDraw = [...boxes].every((box) => box.innerText !== "");
  if (isDraw) {
    gameOver = true;
    statusText.innerText = "🤝 It's a Draw!";
  }
};

boxes.forEach((box) => {
  box.addEventListener("click", () => {
    if (gameOver) return;

    if (turnO) {
      box.innerText = "O";
      box.classList.add("o");
      statusText.innerText = "Player X's turn";
    } else {
      box.innerText = "X";
      box.classList.add("x");
      statusText.innerText = "Player O's turn";
    }

    box.disabled = true;
    turnO = !turnO;
    checkWinner();
  });
});

resetBtn.addEventListener("click", initGame);
initGame();
