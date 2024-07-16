// script.js
// wait until the HTML document is fully loaded 

document.addEventListener('DOMContentLoaded', function() {
	// Select DOM elements
	const addButton = document.getElementById('add-task-btn');
	const taskInput = document.getElementById('task-input');
	const taskList = document.getElementById('task-list');

	// Function to add a new task
	function addTask() {
		// Retrieve and trim the value from the task input field
		const taskText = taskInput.value.trim();

		// Check if taskText is not empty 
		if (taskText === "") {
			alert("Please enter a task.");
			return;
		}

		// Create a new li element and set its textContent to taskText
		const li = document.createElement('li');
		li.textContent = taskText;

		// Create a new button element for removing the task
		const removeButton = document.createElement('button');
		removeButton.textContent = "Remove";
		removeButton.className = 'remove-btn';

		// Assign an onclick event to the remove button to remove the li element 
		removeButton.onclick = function() {
			taskList.removeChild(li);
		};

		// Append the remove button to the li element
		li.appendChild(removeButton);

		// Append the li element to the task list
		taskList.appendChild(li);
	}

	// Attach event listeners
	addButton.addEventListener('click', addTask);

	taskInput.addEventListener('keypress', function(event) {
		if (event.key === 'Enter') {
			addTask();
		};
  });
	// Invoke the addTask fucntion on DOMContentLoaded
	// (Here, it doesnt make sense to call addTask without any user input, so we skip this step)	
});