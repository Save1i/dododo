import { format } from "date-fns"; // Corrected import statement

class Project {
  static _allProjects = [];

  constructor(container, title = "", key = null, id = "") {
    this.projectBtn = document.createElement("button");
    this.projectBtn.classList.add("project__btn");

    this._key = key;
    this.container = container;
    this.title = title;
    this.id = id || this.getNewProjectId(); // Correctly set the ID

    container.prepend(this.projectBtn);

    this.projectBtn.addEventListener("click", () => {
      this.previewProject();
    });

    this._tasks = []; // Initialize tasks array for each project

    // Initialize tasks container here
    this.tasksContainer = document.createElement("div");
    this.tasksContainer.className = "tasks__list";

    // Add the current project instance to the static _allProjects array
    Project._allProjects.push(this);

    this.loadTasks();

    // Project.saveAll(); //
  }

  set title(value) {
    this._title = value;
    this.projectBtn.textContent = value;
  }

  get title() {
    return this._title;
  }

  set id(value) {
    this._id = value;
  }

  get id() {
    return this._id;
  }

  previewProject() {
    // Create elements for project preview
    this.project = document.createElement("div");
    this.titleText = document.createElement("p");
    this.button = document.createElement("button");

    this.project.className = "project__inner";
    this.titleText.className = "project__title";
    this.button.className = "button__add";
    this.button.id = "button__add-task";

    this.deleteProjectBtn = document.createElement("button");
    this.deleteProjectBtn.classList.add("project__del-btn");

    this.titleText.textContent = this.title;

    // Clear tasks container
    this.tasksContainer.innerHTML = "";

    // Add elements to project
    this.project.append(this.titleText);
    this.project.append(this.tasksContainer);
    this.project.append(this.button);
    this.project.append(this.deleteProjectBtn);

    this.button.textContent = "Add Task";
    this.deleteProjectBtn.textContent = "Delete project";

    // Add project to container
    const projectContainer = document.querySelector(".project");
    projectContainer.innerHTML = "";
    projectContainer.append(this.project);

    // Add event listener for "Add Task" button
    this.button.addEventListener("click", () => {
      this.addTask();
    });

    this.deleteProjectBtn.addEventListener("click", () => {
      if (confirm("Вы уверенны?")) {
        this.deleteProject(this);
      }
    });

    this.applyFontBasedOnLanguage(this.title, this.titleText);

    // Load saved tasks if any
    this.loadTasks();
  }

  getNewProjectId() {
    // Find the maximum id among all projects and return a new unique id
    let max = 0;
    for (const project of Project._allProjects) {
      if (project.id > max) {
        max = project.id;
      }
    }
    return max + 1;
  }

  getNewTaskId() {
    // Find the maximum id among tasks in this project and return a new unique id
    let max = 0;
    for (const task of this._tasks) {
      if (task.id > max) {
        max = task.id;
      }
    }
    return max + 1;
  }

  addTask() {
    let taskTitle;

    do {
      taskTitle = prompt("Enter task title:");

      // Если пользователь нажал "Отмена", title будет равно null
      if (taskTitle === null) {
        return; // Выход из функции, если нажата "Отмена"
      }
    } while (taskTitle.trim() === ""); // Продолжать запрашивать, пока не будет введен непустой заголовок

    const taskDate = format(new Date(), "dd/MM/Y");
    const newTask = new Task(this, taskTitle, taskDate);

    this.applyFontBasedOnLanguage(taskTitle, newTask.titleElement);

    newTask.id = this.getNewTaskId(); // Assign a new unique id to the task

    this._tasks.push(newTask); // Add the task to the tasks array

    Project.saveAll(); // Save all projects and their tasks
  }

  deleteProject(value) {
    let id = value.id;

    this.project.innerHTML = "";
    for (let i = 0; i < Project._allProjects.length; i++) {
      if (Project._allProjects[i].id == id) {
        Project._allProjects.splice(i, 1);
      }
    }

    Project.saveAll(); // Save all projects and their tasks
    location.reload();
  }

  remove(value) {
    let id = value.id;

    for (let i = 0; i < this._tasks.length; i++) {
      if (this._tasks[i].id == id) {
        this._tasks.splice(i, 1);
      }
    }

    Project.saveAll(); // Save all projects and their tasks
  }

  static saveAll() {
    let saveList = [];
    for (const project of Project._allProjects) {
      let projectTasks = [];
      for (const task of project._tasks) {
        projectTasks.push({
          title: task.title,
          isComplete: task.isComplete,
          date: task.date,
          id: task.id,
        });
      }
      saveList.push({
        project: { title: project.title, id: project.id },
        tasks: projectTasks,
      });
    }
    localStorage.setItem("allProjects", JSON.stringify(saveList));
    console.log("Saved Projects: ", saveList); // Debugging
  }

  loadTasks() {
    // Clear current task array
    this._tasks = [];

    const data = localStorage.getItem("allProjects");
    if (data) {
      const projects = JSON.parse(data);
      console.log("Loaded Projects: ", projects); // Debugging
      for (const proj of projects) {
        if (proj.project.id === this.id) {
          for (const taskData of proj.tasks) {
            const task = new Task(this, taskData.title, taskData.date, taskData.isComplete);
            task.id = taskData.id;
            this._tasks.push(task);

            this.applyFontBasedOnLanguage(taskData.title, task.titleElement);
          }
        }
      }
    }
  }

  detectLanguage(text) {
    // Простейший способ определения русского языка — проверить наличие кириллических символов
    const cyrillicPattern = /[а-яА-ЯЁё]/;
    return cyrillicPattern.test(text) ? "ru" : "en";
  }

  applyFontBasedOnLanguage(text, container) {
    const language = this.detectLanguage(text);

    if (language === "ru") {
      container.classList.add("russian");
    } else {
      container.classList.remove("russian");
    }
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

    this.checkBox.type = "checkbox";

    this.delBtn.textContent = "X";

    this.task.append(this.checkBox);
    this.task.append(this.titleElement);
    this.task.append(this.dateElement);
    this.task.append(this.delBtn);

    this.container = container;
    this.title = title;
    this.isComplete = isComplete;
    this.date = date;

    // Append the task to the project's tasksContainer
    if (container instanceof Project) {
      container.tasksContainer.append(this.task);
    } else {
      container.append(this.task);
    }

    if (this.isComplete == true) {
      this.titleElement.classList.toggle("done");
      this.dateElement.classList.toggle("done");
      this.checkBox.classList.toggle("done");
    }

    this.checkBox.addEventListener("change", () => {
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
    Project.saveAll();
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
    let title;

    do {
      title = prompt("Enter project title");

      // Если пользователь нажал "Отмена", title будет равно null
      if (title === null) {
        return; // Выход из функции, если нажата "Отмена"
      }
    } while (title.trim() === ""); // Продолжать запрашивать, пока не будет введен непустой заголовок

    let newProject = new Project(document.querySelector(".projects__inner"), title, "Aprojects");

    newProject.applyFontBasedOnLanguage(newProject.title, newProject.projectBtn);
  });
  // Load existing projects
  const existingProjects = JSON.parse(localStorage.getItem("allProjects"));
  if (existingProjects) {
    for (const projData of existingProjects) {
      const project = new Project(
        document.querySelector(".projects__inner"),
        projData.project.title,
        projData.project.id
      );
      project.applyFontBasedOnLanguage(projData.project.title, project.projectBtn);
      project.loadTasks(); // Load tasks for the project
    }
  }

  const openSidebar = document.querySelector(".sidebar__svg");
  const sideBar = document.querySelector(".sidebar");
  const mediaQuery = window.matchMedia("(max-width: 826px)");

  const project = document.querySelector(".project");

  openSidebar.addEventListener("click", () => {
    if (window.innerWidth < 826) {
      sideBar.classList.toggle("open");
      project.classList.toggle("blurred");
    }
  });
  window.addEventListener("resize", () => {
    if (window.innerWidth > 826) {
      project.classList.remove("blurred");
    } else if (window.innerWidth < 826 && sideBar.classList.contains("open")) {
      project.classList.add("blurred");
    }
  });
});
