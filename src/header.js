import logo from "./Group 1.svg";
import "./style.css";

export function header() {
  const headerBg = document.createElement("div");
  const logoCont = document.createElement("div");
  const logoText = document.createElement("p");
  const logoSvg = new Image();

  headerBg.classList.add("header");
  logoCont.classList.add("logo");
  logoText.classList.add("logo__text");
  logoSvg.classList.add("logo__svg");

  logoText.textContent = "ToDo";
  logoSvg.src = logo;

  logoCont.appendChild(logoSvg);
  logoCont.appendChild(logoText);
  headerBg.appendChild(logoCont);

  return headerBg;
}

function createHeader() {
  const headerElement = header();
  document.body.appendChild(headerElement);
}

// Call createHeader to add the header to the document
createHeader();
