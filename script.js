const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function renderTasks() {
  const taskList = document.getElementById("taskList");
  const filter = document.getElementById("filter").value;
  taskList.innerHTML = "";

  tasks.forEach((task, index) => {
    if (
      (filter === "completed" && !task.completed) ||
      (filter === "pending" && task.completed)
    ) {
      return;
    }

    const li = document.createElement("li");
    li.className = task.completed ? "completed" : "";

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.completed;
    checkbox.setAttribute("aria-label", "Mark task as completed");
    checkbox.onchange = () => toggleCompletion(index);
    li.appendChild(checkbox);

    const span = document.createElement("span");
    span.textContent = task.text;
    span.contentEditable = false;
    span.className = "task-text";
    li.appendChild(span);

    const editBtn = document.createElement("button");
    editBtn.textContent = "Edit";
    editBtn.className = "edit";
    editBtn.setAttribute("aria-label", "Edit task");
    editBtn.onclick = () => editTask(index, span);
    li.appendChild(editBtn);

    const delBtn = document.createElement("button");
    delBtn.textContent = "Delete";
    delBtn.className = "delete";
    delBtn.setAttribute("aria-label", "Delete task");
    delBtn.onclick = () => deleteTask(index);
    li.appendChild(delBtn);

    taskList.appendChild(li);
  });
}

function addTask() {
  const taskInput = document.getElementById("taskInput");
  const taskText = taskInput.value.trim();

  if (!taskText) {
    alert("Task cannot be empty.");
    return;
  }

  tasks.push({ text: taskText, completed: false });
  updateLocalStorage();
  taskInput.value = "";
  renderTasks();
}

function editTask(index, span) {
  if (span.contentEditable === "true") {
    const newText = span.textContent.trim();
    if (newText === "") {
      alert("Task cannot be empty.");
      span.textContent = tasks[index].text;
    } else {
      tasks[index].text = newText;
      updateLocalStorage();
    }
    span.contentEditable = "false";
  } else {
    span.contentEditable = "true";
    span.focus();
  }
}

function deleteTask(index) {
  tasks.splice(index, 1);
  updateLocalStorage();
  renderTasks();
}

function toggleCompletion(index) {
  tasks[index].completed = !tasks[index].completed;
  updateLocalStorage();
  renderTasks();
}

function clearAllTasks() {
  if (confirm("Are you sure you want to clear all tasks?")) {
    tasks.length = 0;
    updateLocalStorage();
    renderTasks();
  }
}

function updateLocalStorage() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function toggleDarkMode() {
  const isDarkMode = document.body.classList.toggle('dark-mode');
  localStorage.setItem('darkMode', isDarkMode);
}

function initializeDarkMode() {
  const darkModeSetting = localStorage.getItem('darkMode');
  if (darkModeSetting === 'true') {
    document.body.classList.add('dark-mode');
    document.getElementById('darkModeToggle').checked = true;
  }
}

function showLoadingScreen() {
  const loadingScreen = document.getElementById('loadingScreen');
  if (loadingScreen) {
    loadingScreen.style.display = 'flex';
  }
}

function hideLoadingScreen() {
  const loadingScreen = document.getElementById('loadingScreen');
  if (loadingScreen) {
    loadingScreen.style.display = 'none';
  }
}

showLoadingScreen();

document.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    renderTasks();
    initializeDarkMode();
    hideLoadingScreen();
  }, 1000);

  const darkModeToggle = document.getElementById('darkModeToggle');
  if (darkModeToggle) {
    darkModeToggle.addEventListener('change', toggleDarkMode);
  }
});
