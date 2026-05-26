let items = [
  "Сделать проектную работу",
  "Полить цветы",
  "Пройти туториал по Реакту",
  "Сделать фронт для своего проекта",
  "Прогуляться по улице в солнечный день",
  "Помыть посуду",
];

const listElement = document.querySelector(".to-do__list");
const formElement = document.querySelector(".to-do__form");
const inputElement = document.querySelector(".to-do__input");

function loadTasks() {
  const saved = localStorage.getItem('todoTasks');
  return saved ? JSON.parse(saved) : items;
}

function createItem(itemText) {
  const template = document.getElementById("to-do__item-template");
  const clone = template.content.querySelector(".to-do__item").cloneNode(true);
  const textElement = clone.querySelector(".to-do__item-text");
  const deleteButton = clone.querySelector(".to-do__item-button_type_delete");
  const duplicateButton = clone.querySelector(".to-do__item-button_type_duplicate");
  const editButton = clone.querySelector(".to-do__item-button_type_edit");

  textElement.textContent = itemText;

  deleteButton.addEventListener('click', () => {
    clone.remove();
    const tasks = getTasksFromDOM();
    saveTasks(tasks);
  });

  duplicateButton.addEventListener('click', () => {
    const newItem = createItem(textElement.textContent);
    listElement.prepend(newItem);
    const tasks = getTasksFromDOM();
    saveTasks(tasks);
  });

  editButton.addEventListener('click', () => {
    textElement.setAttribute('contenteditable', 'true');
    textElement.focus();
  });
  textElement.addEventListener('blur', () => {
    textElement.setAttribute('contenteditable', 'false');
    const tasks = getTasksFromDOM();
    saveTasks(tasks);
  });

  return clone;
}

function getTasksFromDOM() {
  const textElements = document.querySelectorAll('.to-do__item-text');
  const tasks = [];
  textElements.forEach(el => tasks.push(el.textContent));
  return tasks;
}

function saveTasks(tasks) {
  localStorage.setItem('todoTasks', JSON.stringify(tasks));
}

// --- Запуск приложения ---
const currentTasks = loadTasks();
currentTasks.forEach(taskText => {
  listElement.append(createItem(taskText));
});

formElement.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const newTaskText = inputElement.value.trim();
  if (!newTaskText) return;

  const newTaskElement = createItem(newTaskText);
  listElement.prepend(newTaskElement);

  const tasks = getTasksFromDOM();
  saveTasks(tasks);

  inputElement.value = '';
});
