import { register } from "../api/auth/register.js";

async function handleRegister(event) {
  event.preventDefault();

  const form = event.target;
  const formData = new FormData(form);
  const profile = Object.fromEntries(formData.entries());

  try {
    await register(profile);
    alert("Registration successful! Please log in.");
    window.location.href = "/login.html";
  } catch (error) {
    alert(error.message);
  }
}

const form = document.querySelector("#register-form");
if (form) {
  form.addEventListener("submit", handleRegister);
}
