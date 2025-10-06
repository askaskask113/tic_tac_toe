const gameBoard = Array(9).fill("");
let currentPlayer = "X";
let gameActive = true;
const statusDisplay = document.getElementById('status');
const gameContainer = document.getElementById('game');

function renderBoard() {
  gameContainer.innerHTML = "";
  gameBoard.forEach((cell, idx) => {
    const cellDiv = document.createElement('div');
    cellDiv.classList.add('cell');
    cellDiv.textContent = cell;
    cellDiv.addEventListener('click', () => handleCellClick(idx));
    gameContainer.appendChild(cellDiv);
  });
}

function handleCellClick(index) {
  if (!gameActive || gameBoard[index]) return;
  gameBoard[index] = currentPlayer;
  renderBoard();
  if (checkWin()) {
    statusDisplay.textContent =` Player ${currentPlayer} wins!`;
    gameActive = false;
  } else if (gameBoard.every(cell => cell)) {
    statusDisplay.textContent = "It's a draw!";
    gameActive = false;
  } else {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusDisplay.textContent = `Player ${currentPlayer}'s turn`;
  }
}

function checkWin() {
  const winPatterns = [
    [0,1,2],[3,4,5],[6,7,8], // rows
    [0,3,6],[1,4,7],[2,5,8], // columns
    [0,4,8],[2,4,6]          // diagonals
  ];
  return winPatterns.some(pattern =>
    pattern.every(idx => gameBoard[idx] === currentPlayer)
  );
}

function resetGame() {
  for (let i = 0; i < 9; i++) gameBoard[i] = "";
  currentPlayer = "X";
  gameActive = true;
  statusDisplay.textContent = `Player X's turn`;
  renderBoard();
}

// Initialize game
resetGame();
//completed
