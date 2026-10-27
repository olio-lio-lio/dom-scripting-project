
// JavaScript for My Daily Tasks
const taskInput = document.getElementById("task-input");
const taskForm = document.getElementById("task-form");
let tasks = [];

// Load previously saved tasks from the browser's local storage
const savedTasks = localStorage.getItem("tasks");
tasks = savedTasks ? JSON.parse(savedTasks) : [];

taskForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const taskText = taskInput.value.trim();

    document.getElementById("error-message").textContent = "";
    taskInput.classList.remove("invalid");

    // Check that the user has entered a task
    if (taskText === "") {
        document.getElementById("error-message").textContent = "Please enter a task.";
        taskInput.classList.add("invalid");
        return;
    }

    // Check that the task contains at least 3 characters
    if (taskText.length < 3) {
        document.getElementById("error-message").textContent = "Please enter at least 3 characters.";
        taskInput.classList.add("invalid");
        return;
    }

    // Create a new list item for the task
    const listItem = document.createElement("li");
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";

    deleteButton.addEventListener("click", function(event) {
        event.stopPropagation();

        // Remove the task from the page
        listItem.remove();

        tasks = tasks.filter(function(task) {
            return task !== taskText;
        });

        localStorage.setItem("tasks", JSON.stringify(tasks));
    });

    listItem.textContent = taskText;
    listItem.appendChild(deleteButton);

    listItem.addEventListener("click", function() {
        // Toggle the completed style when the task is clicked
        listItem.classList.toggle("completed");
    });

    tasks.push(taskText);

    // Save the updated task list to the browser's local storage
    localStorage.setItem("tasks", JSON.stringify(tasks));

    document.getElementById("task-list").appendChild(listItem);
    taskInput.value = "";
});

tasks.forEach(function(taskText) {
    const listItem = document.createElement("li");
    listItem.textContent = taskText;

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";

    deleteButton.addEventListener("click", function(event) {
        event.stopPropagation();
        listItem.remove();

        tasks = tasks.filter(function(task) {
            return task !== taskText;
        });

        localStorage.setItem("tasks", JSON.stringify(tasks));
    });

    listItem.appendChild(deleteButton);

    listItem.addEventListener("click", function() {
        // Toggle the completed style when the task is clicked
        listItem.classList.toggle("completed");
    });

    document.getElementById("task-list").appendChild(listItem);
});
