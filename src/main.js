// Import CSS
import "./style.css";
import header from "./header.js";
import { createSideBar } from "./sideBar.js";
import { addProjectLogic } from "./logic.js";
// import PreviewProject from "./project.js";

function setupMainContainer() {
  const main = document.createElement("main");
  main.classList.add("main");
  const sideBarElements = createSideBar();
  main.appendChild(sideBarElements.sideBar);

  document.body.appendChild(main);

  addProjectLogic(sideBarElements.sideBarButtonAdd);
}

document.addEventListener("DOMContentLoaded", () => {
  setupMainContainer();

  const project = document.createElement("div");
  project.className = "project";
  const sidebar = document.querySelector(".sidebar");

  if (sidebar) {
    sidebar.after(project);
  } else {
    document.body.append(project);
  }
});
