<<<<<<< HEAD
const form = document.getElementById('todoForm');
const todoList = document.getElementById('todoList');
const todoInput = document.getElementById('todoInput');
const tagInput = document.getElementById('tagInput');
const prioritySelect = document.getElementById('prioritySelect');
let todos = JSON.parse(localStorage.getItem('todos')) || [];
function renderTodos() {
  todoList.innerHTML = '';
  todos.forEach((todo, index) => {
    const li = document.createElement('li');
    li.className = 'todo-item';
    const leftSection = document.createElement('div');
    leftSection.className = 'todo-left';
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = todo.completed || false;
    checkbox.onchange = () => {
      todos[index].completed = checkbox.checked;
      saveTodos();
    };
    const text = document.createElement('span');
    text.className = 'todo-text';
    if (todo.completed) text.classList.add('completed');
    text.textContent = todo.text;
    leftSection.appendChild(checkbox);
    leftSection.appendChild(text);
    if (todo.tag) {
      const tag = document.createElement('span');
      tag.className = 'todo-tag';
      tag.textContent = todo.tag;
      leftSection.appendChild(tag);
    }
    const priority = document.createElement('span');
    priority.className = `priority-label ${todo.priority.toLowerCase()}`;
    priority.textContent = todo.priority;
    const actions = document.createElement('div');
    actions.className = 'todo-actions';
    const editBtn = document.createElement('button');
    editBtn.textContent = 'Edit';
    editBtn.className = 'edit-button';
    editBtn.onclick = () => editTodo(index);

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.className = 'delete-button';
    deleteBtn.onclick = () => {
      todos.splice(index, 1);
      saveTodos();
    };
    actions.appendChild(editBtn);
    actions.appendChild(deleteBtn);
    li.appendChild(leftSection);
    li.appendChild(priority);
    li.appendChild(actions);
    todoList.appendChild(li);
  });
}
function saveTodos() {
  localStorage.setItem('todos', JSON.stringify(todos));
  renderTodos();
}
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const text = todoInput.value.trim();
  if (!text) return alert('Task cannot be empty!');
  todos.push({
    text,
    tag: tagInput.value.trim(),
    priority: prioritySelect.value,
    completed: false
  });
  todoInput.value = '';
  tagInput.value = '';
  prioritySelect.value = 'Medium';
  saveTodos();
});
function editTodo(index) {
  const updated = prompt('Edit task:', todos[index].text);
  if (updated !== null && updated.trim()) {
    todos[index].text = updated.trim();
    saveTodos();
  }
}
renderTodos();
=======
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
>>>>>>> 14d3f4fd8dd2e8937a2b8dfb0cdd9db101da3348
