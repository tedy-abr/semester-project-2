import { readProfile } from "../api/profiles/read.js";
import { updateProfile } from "../api/profiles/update.js";

async function loadEditPage() {
  const form = document.querySelector("#edit-profile-form");
  const username = localStorage.getItem("user_name");

  if (!username) {
    window.location.href = "/login.html";
    return;
  }

  try {
    // 1. Fetch current data to pre-fill the form
    const profile = await readProfile(username);

    if (profile.avatar?.url) form.avatar.value = profile.avatar.url;
    if (profile.banner?.url) form.banner.value = profile.banner.url;

    // 2. Handle Save
    form.addEventListener("submit", async (e) => {
      e.preventDefault();

      const avatarUrl = form.avatar.value;
      const bannerUrl = form.banner.value;

      try {
        await updateProfile(username, { avatar: avatarUrl, banner: bannerUrl });
        alert("Profile updated successfully!");
        window.location.href = "/profile.html"; // Go back to profile
      } catch (error) {
        alert(error.message);
      }
    });
  } catch (error) {
    console.error(error);
    alert("Error loading profile data.");
  }
}

loadEditPage();
