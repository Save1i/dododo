import { header } from "./header.js"; // Correct the import statement
import { format, formatDistance, formatRelative, subDays } from "date-fns";

console.log(format(new Date(), "P:"));

class PreviewProject {
  _title = "";
  _tasks = [];
  _key = null;

  constructor(container, title = "", key = null) {
    this.project = document.createElement("div");
    this.titleText = document.createElement("p");
    this.tasksContainer = document.createElement("div");
    this.button = document.createElement("button");

    this.project.className = "project__inner";
    this.titleText.className = "project__title";
    this.tasksContainer.className = "tasks__list";
    this.button.className = "button__add";
    this.button.id = "button__add-task";

    this.project.append(this.titleText);
    this.project.append(this.tasksContainer);
    this.project.append(this.button);

    this.button.textContent = "Add Task";

    this._key = key;
    this.container = container;
    this.title = title;

    container.append(this.project);

    this.button.addEventListener("click", () => {
      this.addTask();
    });
  }

  set title(value) {
    this._title = value;
    this.titleText.textContent = value;
  }

  get title() {
    return this._title;
  }

  getNewId() {
    let max = 0;

    for (const task of this._tasks) {
      if (task.id > max) {
        max = task.id;
      }
    }
    return max + 1;
  }

  addTask() {
    const taskTitle = prompt("Enter task title:");
    const taskDate = format(new Date(), "P:");
    const newTask = new Task(this, taskTitle, taskDate);

    newTask.id = this.getNewId(); // добавляем id к классу Task и добавляем уникальное значиенияЫ

    this._tasks.push(newTask);
    console.log(this._tasks);

    this.save();

    return id;
  }

  remove(value) {
    let id = value;

    if (value instanceof Task) {
      id = value.id;
    }

    for (let i = 0; i < this._tasks.length; i++) {
      if (this._tasks[i].id == id) {
        this._tasks.splice(i, 1);
      }
    }

    this.save();
  }

  save() {
    if (this._key) {
      let saveList = [];
      for (const task of this._tasks) {
        saveList.push({
          title: task.title,
          isComplete: task.isComplete,
          date: task.date,
          id: task.id,
        });

        localStorage.setItem(this._key, JSON.stringify(saveList));
      }
    }
  }

  updateTasks() {
    let startList = [];

    this._tasks = [];
    this.tasksContainer.innerHTML = "";
  }
}

class Task {
  _title = "";
  _isComplete = false;
  _date = "";

  constructor(container, title = "", date = "", isComplete = false) {
    this.task = document.createElement("div");
    this.checkBox = document.createElement("input");
    this.titleElement = document.createElement("p");
    this.dateElement = document.createElement("p");
    this.delBtn = document.createElement("button");

    this.task.className = "task";
    this.checkBox.type = "checkbox";
    this.checkBox.className = "task__check";
    this.titleElement.className = "task__title";
    this.dateElement.className = "task__date";
    this.delBtn.className = "task__delete";

    this.delBtn.textContent = "X";

    this.task.append(this.checkBox);
    this.task.append(this.titleElement);
    this.task.append(this.dateElement);
    this.task.append(this.delBtn);

    this.container = container;
    this.title = title;
    this.isComplete = isComplete;
    this.date = date;

    if (container instanceof PreviewProject) {
      container.tasksContainer.append(this.task);
    } else {
      container.append(this.task);
    }

    this.checkBox.addEventListener("change", () => {
      console.log("work");
      this.done();
    });

    this.delBtn.addEventListener("click", () => {
      this.delete();
    });
  }

  set title(value) {
    this._title = value;
    this.titleElement.textContent = value;
  }

  get title() {
    return this._title;
  }

  set isComplete(value) {
    this._isComplete = value;
    this.checkBox.checked = value;
  }

  get isComplete() {
    return this._isComplete;
  }

  set date(value) {
    this._date = value;
    this.dateElement.textContent = value;
  }

  get date() {
    return this._date;
  }

  done() {
    this._isComplete = !this.isComplete;
    this.titleElement.classList.toggle("done");
    this.dateElement.classList.toggle("done");
    this.checkBox.classList.toggle("done");
    console.log(this._isComplete);
  }

  delete() {
    this.task.remove();

    if (this.container instanceof PreviewProject) {
      this.container.remove(this);
    }
  }
}

export function addProjectLogic(button) {
  button.addEventListener("click", () => {
    formForName(button);
    button.classList.add("active");
  });
}

function formForName(buttontriger) {
  const form = document.createElement("form");
  form.className = "form";

  const input = document.createElement("input");
  input.className = "form__input";
  input.type = "text";
  input.placeholder = "Введите текст";

  const yesButton = document.createElement("button");
  yesButton.className = "form__button form__button_yes";
  yesButton.type = "submit";
  yesButton.textContent = "Добавить";

  const noButton = document.createElement("button");
  noButton.className = "form__button form__button_no";
  noButton.type = "button";
  noButton.textContent = "Отменить";

  // Добавление элементов в форму
  form.appendChild(input);
  form.appendChild(yesButton);
  form.appendChild(noButton);

  // Добавление формы в контейнер
  document.querySelector(".projects__inner").appendChild(form);

  form.addEventListener("submit", function (event) {
    const container = document.querySelector(".project");
    console.log(container); // Add this line to debug
    event.preventDefault();
    const name = input.value;

    let newProject = new creareProject(container, name);
    // createButton(name); // заменить на класссс
    form.remove();
    buttontriger.classList.remove("active");
  });

  noButton.addEventListener("click", () => {
    form.remove();
    buttontriger.classList.remove("active");
  });
}

class creareProject {
  _name = "";
  constructor(container, name = "") {
    this.projectBtn = document.createElement("button");
    this.projectBtn.className = "project__button";

    this.container = container;
    this.name = name;

    document.querySelector(".projects__inner").prepend(this.projectBtn);

    this.projectBtn.addEventListener("click", () => {
      this.createProjectBtn();
    });
  }

  set name(value) {
    this._name = value;
    this.projectBtn.textContent = value;
  }

  get name() {}

  createProjectBtn() {
    document.querySelector(".project").innerHTML = "";

    let project = new PreviewProject(this.container, this._name, "Tasks");
  }
}

function createButton(name) {
  const button = document.createElement("button");
  button.className = "project__button";
  button.textContent = name;
  document.querySelector(".projects__inner").prepend(button);

  button.addEventListener("click", () => {
    document.querySelector(".project").innerHTML = "";

    console.log("Hola mather fucker!");

    let project = new PreviewProject(document.querySelector(".project"), name, "Tasks");
  });
}

// function createProjectPage() {
//   console.log("Creating project page");
//   const projectPage = document.createElement("div");
//   projectPage.classList.add("project");

//   const projectTitle = document.createElement("h3");
//   projectTitle.classList.add("project__title");
//   projectTitle.textContent = "Prod1";

//   const projectBtn = document.createElement("button");
//   projectBtn.classList.add("project__btn");
//   projectBtn.textContent = "Add Task";

//   projectPage.appendChild(projectTitle);
//   projectPage.appendChild(projectBtn);

//   return projectPage;
// }
