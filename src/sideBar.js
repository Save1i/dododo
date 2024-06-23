import "./style.css";

export function createSideBar() {
  const sideBar = document.createElement("div");
  const sideBarInner = document.createElement("div");
  const sideBarTitle = document.createElement("h2");
  const projectsInner = document.createElement("div");
  const sideBarButtonAdd = document.createElement("button");

  sideBar.classList.add("sidebar");
  sideBarInner.classList.add("sidebar__inner");
  sideBarTitle.classList.add("sidebar__title");
  sideBarButtonAdd.classList.add("button__add");
  sideBarButtonAdd.id = "button__add-project";
  projectsInner.classList.add("projects__inner");

  sideBarTitle.textContent = "Projects";
  sideBarButtonAdd.textContent = "Add Project";

  sideBarInner.appendChild(sideBarTitle);
  sideBarInner.appendChild(projectsInner);
  sideBar.appendChild(sideBarInner);
  projectsInner.after(sideBarButtonAdd);

  return {
    sideBar,
    sideBarInner,
    sideBarTitle,
    projectsInner,
    sideBarButtonAdd,
  };
}
