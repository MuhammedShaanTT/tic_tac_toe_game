let board = Array(9).fill("");
let xTurn = true;
let status = document.getElementById("status");

function play(i) {
  if (board[i] !== "") return;

  board[i] = xTurn ? "X" : "O";
  document.querySelectorAll("button")[i].innerText = board[i];

  if (checkWin()) {
    status.innerText = `Player ${board[i]} Wins!`;
    disable();
    return;
  }

  xTurn = !xTurn;
  status.innerText = `Player ${xTurn ? "X" : "O"}'s Turn`;
}

function checkWin() {
  const w = [
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[2,4,6]
  ];
  return w.some(c => c.every(i => board[i] !== "" && board[i] === board[c[0]]));
}

function resetGame() {
  board.fill("");
  document.querySelectorAll("button").forEach(b => b.innerText = "");
  xTurn = true;
  status.innerText = "Player X's Turn";
}

function disable() {
  document.querySelectorAll("button").forEach(b => b.disabled = true);
}
