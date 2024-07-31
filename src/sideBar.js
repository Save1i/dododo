import "./style.css";

export function createSideBar() {
  const sideBar = document.createElement("div");
  const sideBarInner = document.createElement("div");
  const sideBarTitle = document.createElement("h2");
  const projectsInner = document.createElement("div");
  const sideBarButtonAdd = document.createElement("button");

  // Create SVG element
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
  svg.setAttribute("width", "24");
  svg.setAttribute("height", "24");
  svg.setAttribute("fill", "none");
  svg.setAttribute("viewBox", "0 0 24 24");

  const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
  path.setAttribute("fill", "currentColor");
  path.setAttribute("fill-rule", "evenodd");
  path.setAttribute(
    "d",
    "M19 4.001H5a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-12a2 2 0 0 0-2-2Zm-15 2a1 1 0 0 1 1-1h4v14H5a1 1 0 0 1-1-1v-12Zm6 13h9a1 1 0 0 0 1-1v-12a1 1 0 0 0-1-1h-9v14Z"
  );
  path.setAttribute("clip-rule", "evenodd");

  // Change the stroke color and width using JavaScript
  path.setAttribute("stroke", "#ef4444"); // Change this color to whatever you want
  path.setAttribute("stroke-width", "1"); // Set the stroke width

  svg.appendChild(path);

  const sideBarOpenBtn = document.createElement("button");

  sideBarOpenBtn.innerHTML = "";

  sideBar.classList.add("sidebar");
  sideBarInner.classList.add("sidebar__inner");
  sideBarTitle.classList.add("sidebar__title");
  sideBarButtonAdd.classList.add("button__add");
  sideBarButtonAdd.id = "button__add-project";
  projectsInner.classList.add("projects__inner");

  svg.classList.add("sidebar__svg");

  sideBarTitle.textContent = "Projects";
  sideBarButtonAdd.textContent = "Add Project";

  sideBarInner.appendChild(sideBarTitle);
  sideBarInner.appendChild(projectsInner);
  sideBar.appendChild(sideBarInner);
  sideBar.appendChild(svg); // Add SVG to the sidebar
  projectsInner.after(sideBarButtonAdd);

  // Add styles through classes and CSS file
  sideBar.classList.add("sidebar");

  // Insert sideBar into some container in the DOM (e.g., body)
  const container = document.body;
  container.appendChild(sideBar);

  return {
    sideBar,
    sideBarInner,
    sideBarTitle,
    projectsInner,
    sideBarButtonAdd,
  };
}
