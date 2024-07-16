document.addEventListener('DOMContentLoaded', function() {
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');
    let tasks = JSON.parse(localStorage.getItem('tasks')) || []; // Initialize tasks from Local Storage
  
    function addTask(taskText, save = true) {
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
  
      if (save) {
        tasks.push(taskText);
        saveTasks();
      }
    }
  
    function removeTask(taskText) {
      const index = tasks.indexOf(taskText);
      if (index !== -1) {
        tasks.splice(index, 1);
        saveTasks();
      }
    }
  
    function saveTasks() {
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }
  
    function loadTasks() {
      tasks.forEach(taskText => addTask(taskText, false));
    }
  
    addButton.addEventListener('click', addTask);
    taskInput.addEventListener('keypress', (event) => {
      if (event.key === 'Enter') {
        addTask();
      }
    });
  
    loadTasks(); // Load tasks from Local Storage on page load
  });
  