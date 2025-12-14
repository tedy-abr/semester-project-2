import "./style.css";
import { Navbar } from "./components/Navbar.js";

function initApp() {
  const header = document.querySelector("#header");

  if (header) {
    // Render Navbar
    header.innerHTML = Navbar();

    const menuBtn = document.querySelector("#user-menu-btn");
    const dropdown = document.querySelector("#user-dropdown");

    if (menuBtn && dropdown) {
      menuBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        dropdown.classList.toggle("hidden");
      });

      document.addEventListener("click", (e) => {
        if (!menuBtn.contains(e.target) && !dropdown.contains(e.target)) {
          dropdown.classList.add("hidden");
        }
      });
    }

    const mobileMenuBtn = document.querySelector("#mobile-menu-btn");
    const mobileMenu = document.querySelector("#mobile-menu");
    const mobileMenuIcon = document.querySelector("#mobile-menu-icon");

    if (mobileMenuBtn && mobileMenu) {
      mobileMenuBtn.addEventListener("click", () => {
        mobileMenu.classList.toggle("hidden");

        const isHidden = mobileMenu.classList.contains("hidden");
        mobileMenuIcon.textContent = isHidden ? "menu" : "close";
      });
    }

    const handleLogout = () => {
      localStorage.removeItem("token");
      localStorage.removeItem("user_name");
      localStorage.removeItem("user_credits");
      window.location.href = "/login.html";
    };

    const logoutBtn = document.querySelector("#logout-btn");
    const mobileLogoutBtn = document.querySelector("#mobile-logout-btn");

    if (logoutBtn) logoutBtn.addEventListener("click", handleLogout);
    if (mobileLogoutBtn)
      mobileLogoutBtn.addEventListener("click", handleLogout);
  }
}

document.addEventListener("DOMContentLoaded", initApp);
