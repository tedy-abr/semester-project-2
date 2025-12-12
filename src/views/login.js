import { login } from "../api/auth/login.js";

async function handleLogin(event) {
  event.preventDefault();

  const form = event.target;
  const formData = new FormData(form);
  const profile = Object.fromEntries(formData.entries());

  try {
    await login(profile);
    // Success! Go to home
    window.location.href = "/";
  } catch (error) {
    alert(error.message);
    console.error(error);
  }
}

const form = document.querySelector("#login-form");
if (form) {
  form.addEventListener("submit", handleLogin);
}
