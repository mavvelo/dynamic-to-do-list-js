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
  
    }
  
    addButton.addEventListener('click', addTask);
    taskInput.addEventListener('keypress', (event) => {
      if (event.key === 'Enter') {
        addTask();
      }

      taskList.addEventListener("click", function (event) {
        if (event.target.classList.contains("deleteButton")) {
            const taskElement = event.target.parentElement;
            const taskText = taskElement.querySelector("span").innerText;
            taskElement.remove();
            removeTaskFromStorage(taskText);
        }
    });

    function createTaskElement(taskText) {
        const listItem = document.createElement("li");
        listItem.innerHTML = `
            <input type="checkbox" class="checkmark">
            <span>${taskText}</span>
            <button class="deleteButton">Delete</button>
        `;
        taskList.appendChild(listItem);
        saveTaskToStorage(taskText);
    }

    function renderTasks(tasks) {
        tasks.forEach(task => {
            createTaskElement(task);
        });
    }

    function saveTaskToStorage(taskText) {
        const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
        storedTasks.push(taskText);
        localStorage.setItem("tasks", JSON.stringify(storedTasks));
    }

    function removeTaskFromStorage(taskText) {
        const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
        const updatedTasks = storedTasks.filter(task => task !== taskText);
        localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    }
    });

  });
  