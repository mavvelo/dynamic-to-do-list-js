document.addEventListener('DOMContentLoaded', function() {
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');
  
    function addTask(taskText, save = true) {
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
  
      if (save) {
        // Retrieve existing tasks from Local Storage
        let storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
  
        // Add the new task to the array
        storedTasks.push(taskText);
  
        // Save the updated tasks array to Local Storage
        localStorage.setItem('tasks', JSON.stringify(storedTasks));
      }
    }
  
    function removeTask(taskText) {
      // Retrieve existing tasks from Local Storage
      let storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
  
      // Remove the task from the array
      storedTasks = storedTasks.filter(task => task !== taskText);
  
      // Save the updated tasks array to Local Storage
      localStorage.setItem('tasks', JSON.stringify(storedTasks));
    }
  
    function loadTasks() {
      const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
      storedTasks.forEach(taskText => addTask(taskText, false)); // Load tasks without saving
    }
  
    addButton.addEventListener('click', addTask);
    taskInput.addEventListener('keypress', (event) => {
      if (event.key === 'Enter') {
        addTask();
      }
    });
  
    loadTasks(); // Load tasks from Local Storage on page load
  });
  