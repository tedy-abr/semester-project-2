import { readSingleListing } from "../api/listings/read.js";
import { bidOnListing } from "../api/listings/bid.js";
import { API_AUCTION_PROFILES } from "../api/constants.js";

// Handle the Bid Submission
async function handleBid(event) {
  event.preventDefault();

  const form = event.target;
  const input = form.querySelector("#bid-amount");
  const amount = input.value;

  // Get ID from URL
  const parameterString = window.location.search;
  const searchParams = new URLSearchParams(parameterString);
  const id = searchParams.get("id");

  try {
    // Send the bid
    await bidOnListing(id, amount);

    // Refresh user credits
    const username = localStorage.getItem("user_name");
    const token = localStorage.getItem("token");

    if (username) {
      const response = await fetch(`${API_AUCTION_PROFILES}/${username}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "X-Noroff-API-Key": import.meta.env.VITE_API_KEY,
        },
      });

      const json = await response.json();

      if (response.ok) {
        // Save the new amount to local storage
        localStorage.setItem("user_credits", json.data.credits);
      }
    }

    // Success amd reload
    alert("Bid placed successfully!");
    window.location.reload();
  } catch (error) {
    alert(error.message);
  }
}

// Auth Check Hide form if not logged in
const token = localStorage.getItem("token");
const bidForm = document.querySelector("#bid-form");
const authMessage = document.querySelector("#auth-message");

if (token) {
  // If logged in enable form
  if (bidForm) {
    bidForm.addEventListener("submit", handleBid);
  }
} else {
  // Not logged in disable form
  if (bidForm) bidForm.classList.add("hidden");
  if (authMessage) authMessage.classList.remove("hidden");
}

async function loadDetails() {
  const parameterString = window.location.search;
  const searchParams = new URLSearchParams(parameterString);
  const id = searchParams.get("id");

  if (!id) {
    alert("No listing ID found.");
    window.location.href = "/";
    return;
  }

  try {
    const listing = await readSingleListing(id);

    // Update the Page Title
    document.title = `${listing.title} | NidarBid`;

    const image = document.querySelector("#listing-image");
    const title = document.querySelector("#listing-title");
    const description = document.querySelector("#listing-description");
    const seller = document.querySelector("#listing-seller");
    const created = document.querySelector("#listing-created");
    const price = document.querySelector("#listing-price");

    image.src =
      listing.media?.[0]?.url ||
      "https://via.placeholder.com/400x300?text=No+Image";
    image.alt = listing.media?.[0]?.alt || listing.title;
    title.textContent = listing.title;
    description.textContent = listing.description || "No description provided.";
    seller.textContent = listing.seller?.name || "Unknown Seller";

    // Format Date
    const date = new Date(listing.created).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    created.textContent = `Posted ${date}`;

    // Handle Price/Bids
    const currentBid =
      listing.bids?.length > 0
        ? listing.bids[listing.bids.length - 1].amount
        : 0;
    price.textContent = `${currentBid} Credits`;

    // Toggle Visibility of Loader and Content
    document.querySelector("#loader").classList.add("hidden");
    document.querySelector("#listing-container").classList.remove("hidden");
  } catch (error) {
    console.error(error);
    alert("Error loading listing details.");
  }
}

loadDetails();
