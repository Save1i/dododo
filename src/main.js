// Import CSS
import "./style.css";
import header from "./header.js";
import { createSideBar } from "./sideBar.js";
import "./logic.js";

function setupMainContainer() {
  const main = document.createElement("main");
  main.classList.add("main");
  const sideBarElements = createSideBar();
  main.append(sideBarElements.sideBar);

  document.body.append(main);
}

setupMainContainer();

const project = document.createElement("div");
project.className = "project";
const sidebar = document.querySelector(".sidebar");

if (sidebar) {
  sidebar.after(project);
} else {
  document.body.append(project);
}
