document.addEventListener('DOMContentLoaded', () => {
  const addButton = document.getElementById('add-task-btn');
  const taskInput = document.getElementById('task-input');
  const taskList = document.getElementById('task-list');

  // Load tasks from Local Storage
  loadTasks();

  function addTask(taskText) {
    const taskText = taskInput.value.trim();

    if (taskText === "") {
      alert("Please enter a task.");
      return;
    }

    const listItem = document.createElement('li');
    listItem.textContent = taskText;

    const removeButton = document.createElement('button');
    removeButton.textContent = "Remove";
    removeButton.classList.add('remove-btn');
    removeButton.onclick = function() {
      taskList.removeChild(listItem);
      removeTask(taskText);
    };

    listItem.appendChild(removeButton);
    taskList.appendChild(listItem);

    taskInput.value = '';

    saveTasks();
  }

  function removeTask(taskText) {
    const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    const updatedTasks = storedTasks.filter(task => task !== taskText);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
  }

  function saveTasks() {
    const tasks = Array.from(taskList.querySelectorAll('li')).map(li => li.textContent);
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  function loadTasks() {
    const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    storedTasks.forEach(taskText => {
      const listItem = document.createElement('li');
      listItem.textContent = taskText;

      const removeButton = document.createElement('button');
      removeButton.textContent = "Remove";
      removeButton.classList.add('remove-btn');
      removeButton.onclick = function() {
        taskList.removeChild(listItem);
        removeTask(taskText);
      };

      listItem.appendChild(removeButton);
      taskList.appendChild(listItem);
    });
  }

  addButton.addEventListener('click', addTask);
  taskInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
      addTask();
    }
  });
});
