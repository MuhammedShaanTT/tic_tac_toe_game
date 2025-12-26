let board = Array(9).fill("");
let xTurn = true;
let gameOver = false;

let xWins = 0;
let oWins = 0;
let draws = 0;

let status = document.getElementById("status");
let score = document.getElementById("score");

function play(i) {
  if (board[i] !== "" || gameOver) return;

  board[i] = xTurn ? "X" : "O";
  document.querySelectorAll(".board button")[i].innerText = board[i];

  if (checkWin()) {
    if (board[i] === "X") xWins++;
    else oWins++;

    updateScore();
    status.innerText = `Player ${board[i]} Wins!`;
    gameOver = true;
    disable();
    return;
  }

  if (board.every(cell => cell !== "")) {
    draws++;
    updateScore();
    status.innerText = "It's a Draw!";
    gameOver = true;
    disable();
    return;
  }

  xTurn = !xTurn;
  status.innerText = `Player ${xTurn ? "X" : "O"}'s Turn`;
}

function checkWin() {
  const wins = [
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[2,4,6]
  ];
  return wins.some(c =>
    c.every(i => board[i] !== "" && board[i] === board[c[0]])
  );
}

function updateScore() {
  score.innerText = `X: ${xWins} | O: ${oWins} | Draws: ${draws}`;
}

function resetGame() {
  board.fill("");
  document.querySelectorAll(".board button").forEach(b => {
    b.innerText = "";
    b.disabled = false;
  });
  xTurn = true;
  gameOver = false;
  status.innerText = "Player X's Turn";
}

function disable() {
  document.querySelectorAll(".board button")
    .forEach(b => b.disabled = true);
}
