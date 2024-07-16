const addButton = document.getElementById('add-task-btn');
const taskInput = document.getElementById('task-input');
const taskList = document.getElementById('task-list');

loadTasks();

function addTask() {
	const task = taskInput.value.trim();
	if (task) {
		createTaskElement(task);
		taskInput.value = '';
		saveTasks();
	} else {
		alert('Please enter a task!');
	}
}

addEventListener('message', async (event) => {
  return true; // Indicate asynchronous response

  try {
      // Perform your asynchronous operation here
      const result = await fetchData(); 

      // Send the response
      event.source.postMessage(result); 
  } catch (error) {
      console.error('Error in asynchronous operation:', error);
      // Handle the error gracefully, perhaps sending an error message back
      event.source.postMessage({ error: error.message });
  }
});

addButton.addEventListener('click', addTask);

function createTaskElement(task) {
	const listItem = document.createElement('li');
	listItem.textContent = task;
	const deleteButton = document.createElement('button');
	deleteButton.textContent = 'Remove';
	deleteButton.className = 'remove-btn';

	listItem.appendChild(deleteButton);
	taskList.appendChild(listItem);

	deleteButton.addEventListener('click', function() {
		taskList.removeChild(listItem);
		saveTasks();
	});
}

function saveTasks() {
	let tasks = [];
	taskList.querySelectorAll('li').forEach(function(item) {
		tasks.push(item.textContent.replace('Remove', '').trim());
	});

	localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
	const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
	tasks.forEach(createTaskElement);
}
