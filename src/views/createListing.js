import { createListing } from "../api/listings/create.js";

async function handleCreateListing(event) {
  event.preventDefault();

  const form = event.target;
  const formData = new FormData(form);

  // Raw values
  const title = formData.get("title");
  const description = formData.get("description");
  const tagsString = formData.get("tags");
  const mediaUrl = formData.get("mediaUrl");
  const endsAt = formData.get("endsAt");

  // Format data for API
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

// Check if user is logged in immediately
const token = localStorage.getItem("token");
if (!token) {
  alert("You must be logged in to create a listing.");
  window.location.href = "/login.html";
} else {
  const form = document.querySelector("#create-listing-form");
  if (form) {
    form.addEventListener("submit", handleCreateListing);
  }
}
