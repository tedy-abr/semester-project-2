import "./style.css";
import { Navbar } from "./components/Navbar.js";

function initApp() {
  const header = document.querySelector("#header");

  if (header) {
    header.innerHTML = Navbar();

    const logoutBtn = document.querySelector("#logout-btn");

    if (logoutBtn) {
      logoutBtn.addEventListener("click", () => {
        // Clear user data
        localStorage.removeItem("token");
        localStorage.removeItem("user_name");
        localStorage.removeItem("user_credits");

        // Redirect to login page
        window.location.href = "/login.html";
      });
    }
  }
}

// Wait for the DOM to be fully loaded before running
document.addEventListener("DOMContentLoaded", initApp);
