const inputBox = document.getElementById('input-box');
const listContainer = document.getElementById('list-container');

function saveTasks() {
  const tasks = [];
  listContainer.querySelectorAll('li').forEach(item => {
    tasks.push({
      text: item.textContent,
      checked: item.classList.contains('checked')
    });
  });
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks.forEach(task => {
    const listItem = document.createElement('li');
    listItem.textContent = task.text;
    if (task.checked) {
      listItem.classList.add('checked');
    }

    const deleteButton = document.createElement('img');
    deleteButton.src='./assets/delete.png';
    deleteButton.alt='del';
    deleteButton.classList.add('delete-button');

    listItem.appendChild(deleteButton);
    listContainer.appendChild(listItem);
  });
}

function addTask() {
  const task = inputBox.value;
  if (task) {
    const listItem = document.createElement('li');
    listItem.textContent = task;

    const deleteButton = document.createElement('img');
    deleteButton.src='./assets/delete.png';
    deleteButton.alt='del';
    deleteButton.classList.add('delete-button');

    listItem.appendChild(deleteButton);
    listContainer.appendChild(listItem);
    inputBox.value = '';
    saveTasks();
  }
}

document.getElementById('add-button').addEventListener('click', addTask);

listContainer.addEventListener('click', function(e) {
  if (e.target.classList.contains('delete-button')) {
    e.target.parentElement.remove();
    saveTasks();
  } else if (e.target.tagName === 'LI') {
    e.target.classList.toggle('checked');
    saveTasks();
  }
});

window.addEventListener('load', loadTasks);