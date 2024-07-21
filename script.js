function loadTasks() {
  const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
  storedTasks.forEach(taskText => addTask(taskText, false)); // 'false' indicates not to save again to Local Storage
}

// Adjusted `addTask` to optionally save tasks to avoid duplication
function addTask(taskText, save = true) {
  const taskItem = document.createElement('li');
  taskItem.textContent = taskText;

  const removeButton = document.createElement('button');
  removeButton.textContent = 'Remove';
  removeButton.classList.add('remove-btn');

  removeButton.onclick = function() {
    taskList.removeChild(taskItem);
    // Update local storage if task was added (not loaded)
    if (save) {
      const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
      const taskIndex = storedTasks.indexOf(taskText);
      if (taskIndex > -1) {
        storedTasks.splice(taskIndex, 1); // Remove task from local storage
      }
      localStorage.setItem('tasks', JSON.stringify(storedTasks));
    }
  };

  taskItem.append(removeButton);
  taskList.appendChild(taskItem);

  if (save) {
    const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    storedTasks.push(taskText);
    localStorage.setItem('tasks', JSON.stringify(storedTasks));
  }

  taskInput.value = "";
}

const addButton = document.getElementById('add-task-btn');
const taskInput = document.getElementById('task-input');
const taskList = document.getElementById('task-list');

addButton.addEventListener('click', () => {
  const taskText = taskInput.value.trim();

  if (taskText === "") {
    alert('Please enter a task');
    return;
  } else {
    addTask(taskText);
  }
});

taskInput.addEventListener('keypress', (event) => {
  if (event.key === 'Enter') {
    addTask(taskInput.value.trim());
  }
});

document.addEventListener('DOMContentLoaded', () => {
  loadTasks();
});