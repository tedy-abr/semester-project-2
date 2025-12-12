import "./style.css";
import { Navbar } from "./components/Navbar.js";

function initApp() {
  const header = document.querySelector("#header");

  if (header) {
    // 1. Render Navbar
    header.innerHTML = Navbar();

    // 2. Setup Dropdown Logic (Student Style)
    const menuBtn = document.querySelector("#user-menu-btn");
    const dropdown = document.querySelector("#user-dropdown");

    if (menuBtn && dropdown) {
      // Toggle menu on click
      menuBtn.addEventListener("click", (e) => {
        e.stopPropagation(); // Don't close immediately
        dropdown.classList.toggle("hidden");
      });

      // Close menu when clicking outside
      document.addEventListener("click", (e) => {
        if (!menuBtn.contains(e.target) && !dropdown.contains(e.target)) {
          dropdown.classList.add("hidden");
        }
      });
    }

    // 3. Setup Logout Logic
    const logoutBtn = document.querySelector("#logout-btn");
    if (logoutBtn) {
      logoutBtn.addEventListener("click", () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user_name");
        localStorage.removeItem("user_credits");
        window.location.href = "/login.html";
      });
    }
  }
}

document.addEventListener("DOMContentLoaded", initApp);
