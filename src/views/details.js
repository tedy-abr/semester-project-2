import { readSingleListing } from "../api/listings/read.js";
import { placeBid } from "../api/listings/bid.js";
import { API_AUCTION_PROFILES } from "../api/constants.js";

async function handleBid(event) {
  event.preventDefault();

  const form = event.target;
  const input = form.querySelector("#bid-amount");
  const amount = input.value;

  const parameterString = window.location.search;
  const searchParams = new URLSearchParams(parameterString);
  const id = searchParams.get("id");

  try {
    await placeBid(id, amount);

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
        localStorage.setItem("user_credits", json.data.credits);
      }
    }

    alert("Bid placed successfully!");
    window.location.reload();
  } catch (error) {
    alert(error.message);
  }
}

// Auth Check
const token = localStorage.getItem("token");
const bidForm = document.querySelector("#bid-form");
const authMessage = document.querySelector("#auth-message");

if (token) {
  if (bidForm) {
    bidForm.addEventListener("submit", handleBid);
  }
} else {
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

    document.title = `${listing.title} | NidarBid`;

    const image = document.querySelector("#listing-image");
    const title = document.querySelector("#listing-title");
    const description = document.querySelector("#listing-description");
    const seller = document.querySelector("#listing-seller");
    const created = document.querySelector("#listing-created");
    const price = document.querySelector("#listing-price");

    if (image) {
      image.src =
        listing.media?.[0]?.url ||
        "https://via.placeholder.com/400x300?text=No+Image";
      image.alt = listing.media?.[0]?.alt || listing.title;
    }
    if (title) title.textContent = listing.title;
    if (description)
      description.textContent =
        listing.description || "No description provided.";
    if (seller) seller.textContent = listing.seller?.name || "Unknown Seller";

    const date = new Date(listing.created).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    if (created) created.textContent = `Posted ${date}`;

    const currentBid =
      listing.bids?.length > 0
        ? listing.bids[listing.bids.length - 1].amount
        : 0;
    if (price) price.textContent = `${currentBid} Credits`;

    // Toggle Visibility
    const loader = document.querySelector("#loader");
    const container = document.querySelector("#listing-container");

    if (loader) loader.classList.add("hidden");
    if (container) container.classList.remove("hidden");
  } catch (error) {
    console.error(error);
    alert("Error loading listing details.");
  }
}

loadDetails();
