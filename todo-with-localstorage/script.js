    // Load tasks from local storage when the page is loaded
    loadTasks();

    let taskInput = document.getElementById('taskInput');
    let taskList = document.getElementById('taskList');

    function addTask() {
        console.log('addTask called');
        let taskText = taskInput.value.trim();

        if (taskText !== '') {
            // Create a new task object
            let newTask = {
                text: taskText,
                id: Date.now(),
            };

            // Add the task to the task list
            appendTaskToList(newTask);

            // Save tasks to local storage
            saveTasks();

            // Clear the input field
            taskInput.value = '';
        }
    }

    

    function removeTask(button) {
        // Get the parent task and remove it
        let task = button.parentNode;
        task.parentNode.removeChild(task);

        // Get the task ID
        let taskId = parseInt(task.getAttribute('data-id'));

        // Remove the task from local storage
        removeTaskFromLocalStorage(taskId);
    }

    function appendTaskToList(task) {
        // Create a new list item
        let newTask = document.createElement('li');
        newTask.textContent = task.text;
        newTask.setAttribute('data-id', task.id);

        // Add a delete button to each task
        let deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        
        // add tailwindcss class to delete button
        deleteButton.className = 'bg-red-500 hover:bg-red-700 text-white font-medium text-md py-2 px-4 rounded';
        deleteButton.onclick = function () {
            removeTask(this);
        };

        // Append the delete button to the task
        newTask.appendChild(deleteButton);

        // Append the task to the task list
        taskList.appendChild(newTask);
    }

    function saveTasks() {
        // Get all tasks from the task list
        let tasks = Array.from(taskList.children).map(task => {
            return {
                text: task.textContent,
                id: parseInt(task.getAttribute('data-id')),
            };
        });

        // Save tasks to local storage
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    function loadTasks() {
        // Get tasks from local storage
        let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

        // Append each task to the task list
        tasks.forEach(task => {
            appendTaskToList(task);
        });
    }

    function removeTaskFromLocalStorage(taskId) {
        // Get tasks from local storage
        let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

        // Remove the task with the specified ID
        tasks = tasks.filter(task => task.id !== taskId);

        // Save updated tasks to local storage
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }
