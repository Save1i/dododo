// import ProjectList from "./projectList.js";
import { header } from "./header"; // Correct the import statement

// export class PreviewProject {
//   _title = "";

//   constructor(container, title = "") {
//     this.project = document.createElement("div");
//     this.titleText = document.createElement("p");
//     this.tasksContainer = document.createElement("div");
//     this.button = document.createElement("button");

//     this.project.className = "project__inner";
//     this.titleText.className = "project__title";
//     this.tasksContainer.className = "tasks__list";
//     this.button.className = "button__add";
//     this.button.id = "button__add-task";

//     this.project.append(this.titleText);
//     this.project.append(this.tasksContainer);
//     this.project.append(this.button);

//     this.container = container;
//     this.title = title;

//     container.after(this.project);
//   }

//   set title(value) {
//     this._title = value;
//     this.titleText.textContent = value;
//   }

//   get title() {}
// }

// function addProjectLogic(button) {
//   button.addEventListener("click", () => {
//     formForName(button);
//     button.classList.add("active");
//   });
// }

// function formForName(buttontriger) {
//   const form = document.createElement("form");
//   form.className = "form";

//   const input = document.createElement("input");
//   input.className = "form__input";
//   input.type = "text";
//   input.placeholder = "Введите текст";

//   const yesButton = document.createElement("button");
//   yesButton.className = "form__button form__button_yes";
//   yesButton.type = "submit";
//   yesButton.textContent = "Добавить";

//   const noButton = document.createElement("button");
//   noButton.className = "form__button form__button_no";
//   noButton.type = "button";
//   noButton.textContent = "Отменить";

//   // Добавление элементов в форму
//   form.appendChild(input);
//   form.appendChild(yesButton);
//   form.appendChild(noButton);

//   // Добавление формы в контейнер
//   document.querySelector(".projects__inner").appendChild(form);
// }

// form.addEventListener("submit", function (event) {
//   const container = document.querySelector(".project");
//   console.log(container); // Add this line to debug
//   event.preventDefault();
//   const name = input.value;
//   createButton(name); // Make sure createButton is defined
//   form.remove();
//   buttontriger.classList.remove("active");
// });

// noButton.addEventListener("click", () => {
//   form.remove();
//   buttontriger.classList.remove("active");
// });

// function createButton(name) {
//   const button = document.createElement("button");
//   button.className = "project__button";
//   button.textContent = name;
//   document.querySelector(".projects__inner").prepend(button);

//   button.addEventListener("click", () => {
//     console.log("Hola mather fucker!");
//   });

//   let body = document.body;

//   let project = new PreviewProject(body, "fdfd");
// }

console.log("Creating project page");
const projectPage = document.createElement("div");
projectPage.classList.add("project");

const projectTitle = document.createElement("h3");
projectTitle.classList.add("project__title");
projectTitle.textContent = "Prod1";

const projectBtn = document.createElement("button");
projectBtn.classList.add("project__btn");
projectBtn.textContent = "Add Task";

projectPage.appendChild(projectTitle);
projectPage.appendChild(projectBtn);

const project1 = new PreviewProject("do this", "first task");
console.log(project1);
