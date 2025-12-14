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
    // Fetch current data
    const profile = await readProfile(username);

    // Pre-fill Bio
    if (profile.bio) form.bio.value = profile.bio;

    if (profile.avatar?.url) form.avatar.value = profile.avatar.url;
    if (profile.banner?.url) form.banner.value = profile.banner.url;

    // Handle Save
    form.addEventListener("submit", async (e) => {
      e.preventDefault();

      // Get Bio value
      const bioText = form.bio.value;
      const avatarUrl = form.avatar.value;
      const bannerUrl = form.banner.value;

      try {
        await updateProfile(username, {
          bio: bioText,
          avatar: avatarUrl,
          banner: bannerUrl,
        });

        alert("Profile updated successfully!");
        window.location.href = "/profile.html";
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
