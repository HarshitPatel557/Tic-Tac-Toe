const boxes = document.querySelectorAll(".box");
const resetBtn = document.getElementById("reset-btn");

let turnO = true; // true = O's turn, false = X's turn
let gameOver = false;

// Winning patterns (index-based)
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

// Initialize game (clear preset X/O from HTML)
const initGame = () => {
  turnO = true;
  gameOver = false;
  boxes.forEach((box) => {
    box.innerText = "";
    box.disabled = false;
  });
};

// Check winner
const checkWinner = () => {
  for (let pattern of winPatterns) {
    const [a, b, c] = pattern;
    const val1 = boxes[a].innerText;
    const val2 = boxes[b].innerText;
    const val3 = boxes[c].innerText;

    if (val1 && val1 === val2 && val2 === val3) {
      gameOver = true;
      setTimeout(() => {
        alert(`Player ${val1} wins!`);
      }, 100);
      disableBoxes();
      return;
    }
  }

  // Check draw
  const isDraw = [...boxes].every((box) => box.innerText !== "");
  if (isDraw && !gameOver) {
    gameOver = true;
    setTimeout(() => {
      alert("It's a draw!");
    }, 100);
  }
};

// Disable all boxes
const disableBoxes = () => {
  boxes.forEach((box) => (box.disabled = true));
};

// Box click logic
boxes.forEach((box) => {
  box.addEventListener("click", () => {
    if (gameOver) return;

    if (turnO) {
      box.innerText = "O";
    } else {
      box.innerText = "X";
    }

    box.disabled = true;
    turnO = !turnO;

    checkWinner();
  });
});

// Reset button
resetBtn.addEventListener("click", initGame);

// Start fresh on page load
initGame();
