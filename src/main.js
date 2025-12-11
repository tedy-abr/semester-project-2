import "./style.css";
import { Navbar } from "./components/Navbar.js";

function initApp() {
  const header = document.querySelector("#header");

  if (header) {
    header.innerHTML = Navbar();
  }
}

// Wait for the DOM to be fully loaded before running
document.addEventListener("DOMContentLoaded", initApp);
