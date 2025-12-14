import { createListing } from "../api/listings/create.js";

async function handleCreateListing(event) {
  event.preventDefault();

  const form = event.target;
  const formData = new FormData(form);

  const title = formData.get("title");
  const description = formData.get("description");
  const tagsString = formData.get("tags");
  const mediaUrl = formData.get("mediaUrl");
  const endsAt = formData.get("endsAt");

  const tags = tagsString
    ? tagsString
        .split(",")
        .map((tag) => tag.trim())
        .filter((tag) => tag !== "")
    : [];
  const media = mediaUrl ? [{ url: mediaUrl, alt: title }] : [];
  const dateObj = new Date(endsAt);

  try {
    await createListing({
      title,
      description,
      tags,
      media,
      endsAt: dateObj.toISOString(),
    });

    alert("Listing published successfully!");
    window.location.href = "/";
  } catch (error) {
    console.error(error);
    alert(error.message);
  }
}

// Auth Check
const token = localStorage.getItem("token");
if (!token) {
  alert("You must be logged in to create a listing.");
  window.location.href = "/login.html";
} else {
  const form = document.querySelector("#create-listing-form");
  if (form) {
    form.addEventListener("submit", handleCreateListing);

    // Prevent past dates
    const dateInput = document.querySelector("#ends-at-input");
    if (dateInput) {
      const now = new Date();
      now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
      dateInput.min = now.toISOString().slice(0, 16);
    }

    // Image preview
    const urlInput = document.querySelector("#media-url-input");
    const previewContainer = document.querySelector("#image-preview");
    const previewImg = document.querySelector("#preview-img");

    if (urlInput && previewContainer && previewImg) {
      urlInput.addEventListener("input", (e) => {
        const url = e.target.value;
        if (url) {
          previewImg.src = url;
          previewContainer.classList.remove("hidden");
        } else {
          previewContainer.classList.add("hidden");
        }
      });

      // Handle broken image
      previewImg.addEventListener("error", () => {
        previewContainer.classList.add("hidden");
      });
    }
  }
}
