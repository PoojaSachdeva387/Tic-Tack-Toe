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
