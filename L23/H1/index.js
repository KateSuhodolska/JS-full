const tasks = [
    { text: "Buy milk", done: false, time: new Date() },
    { text: "Pick up Tom from airport", done: false, time: new Date() },
    { text: "Visit party", done: false, time: new Date() },
    { text: "Visit doctor", done: true, time: new Date() },
    { text: "Buy meat", done: true, time: new Date() },
];

const listElem = document.querySelector(".list");

const updateTasks = (event) => {
    const status = tasks[event.target.dataset.id].done;
    tasks[event.target.dataset.id].done = !status;
    renderTasks(tasks);
};

const renderTasks = (tasksList) => {
    listElem.innerHTML = "";
    const tasksElems = tasksList
        .sort((a, b) => a.done - b.done || a.time - b.time)
        .map(({ text, done }, index) => {
            const listItemElem = document.createElement("li");
            listItemElem.classList.add("list__item");
            const checkbox = document.createElement("input");
            checkbox.setAttribute("type", "checkbox");
            checkbox.checked = done;
            checkbox.dataset.id = index;
            checkbox.classList.add("list__item-checkbox");
            if (done) {
                listItemElem.classList.add("list__item_done");
            }
            listItemElem.append(checkbox, text);
            checkbox.addEventListener("click", updateTasks);

            return listItemElem;
        });

    listElem.append(...tasksElems);
};

renderTasks(tasks);

const taskField = document.querySelector(".task-input");
const createTask = document.querySelector(".create-task-btn");

const newTask = () => {
    const taskName = taskField.value;
    if (taskName === "") {
        return;
    }
    const taskObjEl = { text: taskName, done: false, time: new Date() };
    tasks.push(taskObjEl);
    taskField.value = "";
    renderTasks(tasks);
};
createTask.addEventListener("click", newTask);