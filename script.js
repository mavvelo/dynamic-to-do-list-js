// script.js
// Wait until the HTML document is fully loaded
document.addEventListener('DOMContentLoaded', function() {
  // Select DOM elements
  const addButton = document.getElementById('add-task-btn');
  const taskInput = document.getElementById('task-input');
  const taskList = document.getElementById('task-list');

  // Check if essential DOM elements exist
  if (!addButton || !taskInput || !taskList) {
      console.error("Essential DOM elements are missing or not properly defined.");
      return;
  }

  // Load tasks from Local Storage
  function loadTasks() {
      const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
      tasks.forEach(task => {
          createTaskElement(task);
      });
  }

  // Save tasks to Local Storage
  function saveTasks(tasks) {
      localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  // Function to create and append a task element
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

  // Function to add a new task
  function addTask() {
      // Retrieve and trim the value from the task input field
      const taskText = taskInput.value.trim();

      // Check if taskText is not empty
      if (taskText === "") {
          alert("Please enter a task.");
          return;
      }

      // Add the task to the task list and local storage
      const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
      tasks.push(taskText);
      saveTasks(tasks);

      // Create and append the task element
      createTaskElement(taskText);

      // Clear the task input field
      taskInput.value = '';
  }

  // Attach event listeners
  addButton.addEventListener('click', addTask);

  taskInput.addEventListener('keypress', function(event) {
      if (event.key === 'Enter') {
          addTask();
      }
  });

  // Load existing tasks from Local Storage on DOMContentLoaded
  loadTasks();
});
