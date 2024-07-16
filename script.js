document.addEventListener('DOMContentLoaded', function() {
  const addButton = document.getElementById('add-task-btn');
  const taskInput = document.getElementById('task-input');
  const taskList = document.getElementById('task-list');

  function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(task => {
      createTaskElement(task);
    });
  }

  function saveTasks(tasks) {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  function createTaskElement(taskText) {
    const li = document.createElement('li');
    li.textContent = taskText;

    const removeButton = document.createElement('button');
    removeButton.textContent = "Remove";
    removeButton.className = 'remove-btn';

    removeButton.onclick = function() {
      const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
      const updatedTasks = tasks.filter(task => task !== taskText);
      saveTasks(updatedTasks);
      taskList.removeChild(li);
    };

    li.appendChild(removeButton);
    taskList.appendChild(li);
  }

  function addTask() {
    const taskText = taskInput.value.trim();

    if (taskText === "") {
      alert("Please enter a task.");
      return;
    }

    createTaskElement(taskText);

    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.push(taskText);
    saveTasks(tasks);

    taskInput.value = '';
  }

  addButton.addEventListener('click', addTask);

  taskInput.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
      addTask();
    }
  });

  loadTasks();
});
