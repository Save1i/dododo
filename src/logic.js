import { header } from "./header.js"; // Correct the import statement
import { format, formatDistance, formatRelative, subDays } from "date-fns";

console.log(format(new Date(), "P:"));

class Project {
  _title = "";

  _tasks = [];
  _key = null;

  constructor(container, title = "", key = null) {
    //projectInner в контейнер!!!
    this.projectBtn = document.createElement("button");
    this.projectBtn.classList.add("project__btn");

    this._key = key;
    this.container = container;
    this.title = title;

    container.prepend(this.projectBtn);

    this.projectBtn.addEventListener("click", () => {
      this.previewProject();
    });
  }

  set title(value) {
    this._title = value;
    this.projectBtn.textContent = value;
  }

  get title() {
    return this._title;
  }

  previewProject() {
    this.project = document.createElement("div");
    this.titleText = document.createElement("p");
    this.tasksContainer = document.createElement("div");
    this.button = document.createElement("button");

    this.project.className = "project__inner";
    this.titleText.className = "project__title";
    this.tasksContainer.className = "tasks__list";
    this.button.className = "button__add";
    this.button.id = "button__add-task";

    this.titleText.textContent = this.title;

    this.project.append(this.titleText);
    this.project.append(this.tasksContainer);
    this.project.append(this.button);

    this.button.textContent = "Add Task";

    document.querySelector(".project").append(this.project);

    this.button.addEventListener("click", () => {
      this.addTask();
    });
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

    newTask.id = this.getNewId(); // добавляем id к классу Task и добавляем уникальное значение

    this._tasks.push(newTask);
    console.log(this._tasks);

    this.save();
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
      }
      localStorage.setItem(this._key, JSON.stringify(saveList));
    }
  }

  updateTasks() {
    let startList = [];

    this._tasks = [];
    this.tasksContainer.innerHTML = "";
  }
}
//////////////////////////////////////////////////////////////////////////////////
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

    if (container instanceof Project) {
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

    if (this.container instanceof Project) {
      this.container.remove(this);
    }
  }
}

document.addEventListener("DOMContentLoaded", () => {
  document.querySelector(".button__add").addEventListener("click", () => {
    let newProject = new Project(
      document.querySelector(".projects__inner"),
      prompt("Название группы")
    );
  });
});
