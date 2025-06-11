let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function addTask() {
  const input = document.getElementById("taskInput");
  const taskText = input.value.trim();
  if (taskText === "") return;

  const newTask = {
    text: taskText,
    completed: false
  };

  tasks.push(newTask);
  localStorage.setItem("tasks", JSON.stringify(tasks));
  input.value = "";
  displayTasks();
}

function displayTasks(filteredTasks = null) {
  const list = document.getElementById("taskList");
  list.innerHTML = "";

  const tasksToShow = filteredTasks || tasks;

  tasksToShow.forEach((task, index) => {
    const li = document.createElement("li");
    li.className = "list-group-item todo-item";

    // Checkbox
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.completed;
    checkbox.className = "form-check-input";
    checkbox.onchange = () => toggleComplete(index);

    // Task Text
    const span = document.createElement("span");
    span.className = "todo-text" + (task.completed ? " completed" : "");
    span.contentEditable = true;
    span.textContent = task.text;
    span.onblur = () => editTask(index, span.textContent.trim());

    // Action Icons
    const actions = document.createElement("div");

    const deleteBtn = document.createElement("button");
    deleteBtn.className = "btn-icon";
    deleteBtn.innerHTML = `<i class="bi bi-trash-fill text-danger"></i>`;
    deleteBtn.onclick = () => deleteTask(index);

    actions.appendChild(deleteBtn);

    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(actions);

    list.appendChild(li);
  });
}

function toggleComplete(index) {
  tasks[index].completed = !tasks[index].completed;
  localStorage.setItem("tasks", JSON.stringify(tasks));
  displayTasks();
}

function editTask(index, newText) {
  if (newText === "") {
    deleteTask(index);
    return;
  }
  tasks[index].text = newText;
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function deleteTask(index) {
  tasks.splice(index, 1);
  localStorage.setItem("tasks", JSON.stringify(tasks));
  displayTasks();
}

function searchTasks() {
  const searchValue = document.getElementById("searchInput").value.toLowerCase();
  const filtered = tasks.filter(task => task.text.toLowerCase().includes(searchValue));
  displayTasks(filtered);
}

window.onload = displayTasks;
