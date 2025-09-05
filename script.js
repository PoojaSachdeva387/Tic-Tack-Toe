const board = document.getElementById('board');
const statusText = document.getElementById('status');
const scoreX = document.getElementById('scoreX');
const scoreO = document.getElementById('scoreO');
const winLine = document.getElementById('winLine');
const winMessage = document.getElementById('winMessage'); // ✅ new
const leftMessage = document.getElementById('leftMessage');
const rightMessage = document.getElementById('rightMessage');

let currentPlayer = 'X';
let gameActive = true;
let gameState = Array(9).fill('');
let scores = { X: 0, O: 0 };

const winPatterns = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],
  [0, 3, 6], [1, 4, 7], [2, 5, 8],
  [0, 4, 8], [2, 4, 6]
];

function handleClick(index) {
  if (!gameActive || gameState[index]) return;

  gameState[index] = currentPlayer;
  const cell = board.children[index + 1]; // +1 to skip winLine
  cell.textContent = currentPlayer;
  cell.classList.add(currentPlayer.toLowerCase());

  const winner = getWinner();
  if (winner) {
    statusText.textContent = `${currentPlayer} Wins!`;
    gameActive = false;
    scores[currentPlayer]++;
    updateScore();
    showWinLine(winner.pattern);
    showSideMessage(currentPlayer);
  } else if (!gameState.includes('')) {
    statusText.textContent = `It's a Tie!`;
    gameActive = false;
  } else {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    statusText.textContent = `Current Turn: ${currentPlayer}`;
  }
}

function getWinner() {
  for (let pattern of winPatterns) {
    const [a, b, c] = pattern;
    if (gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
      return { player: gameState[a], pattern };
    }
  }
  return null;
}

function updateScore() {
  scoreX.textContent = scores['X'];
  scoreO.textContent = scores['O'];
}

function showWinLine(pattern) {
  const positions = {
    '0,1,2': { top: 55, left: 20, width: 280, rotate: 0 },
    '3,4,5': { top: 160, left: 20, width: 280, rotate: 0 },
    '6,7,8': { top: 275, left: 20, width: 280, rotate: 0 },
    '0,3,6': { top: 160, left: -90, width: 280, rotate: 90 },
    '1,4,7': { top: 160, left: 25, width: 280, rotate: 90 },
    '2,5,8': { top: 160, left: 130, width: 280, rotate: 90 },
    '0,4,8': { top: 160, left: -35, width: 400, rotate: 47 },
    '2,4,6': { top: 160, left: -35, width: 400, rotate: -50 }
  };

  const key = pattern.join(',');
  const pos = positions[key];
  if (pos) {
    winLine.style.width = `${pos.width}px`;
    winLine.style.top = `${pos.top}px`;
    winLine.style.left = `${pos.left}px`;
    winLine.style.transform = `rotate(${pos.rotate}deg) scaleX(1)`;
  }
}

function showSideMessage(player) {
  if (player === 'X') {
    leftMessage.textContent = "X Wins!";
    rightMessage.textContent = "";
  } else {
    rightMessage.textContent = "O Wins!";
    leftMessage.textContent = "";
  }
}


function resetGame() {
  gameState = Array(9).fill('');
  currentPlayer = 'X';
  gameActive = true;
  statusText.textContent = `Current Turn: ${currentPlayer}`;
  winLine.style.transform = 'scaleX(0)';
  leftMessage.textContent = '';
  rightMessage.textContent = '';
  Array.from(board.children).forEach((cell, index) => {
    if (index === 0) return;
    cell.textContent = '';
    cell.className = 'cell';
  });
}


function createBoard() {
  board.innerHTML = '';
  board.appendChild(winLine);
  for (let i = 0; i < 9; i++) {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    cell.addEventListener('click', () => handleClick(i));
    board.appendChild(cell);
  }
}

createBoard();
