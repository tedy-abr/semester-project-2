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
    const bidsCount = document.querySelector("#listing-bids-count");
    const price = document.querySelector("#listing-price");
    const endsAt = document.querySelector("#listing-ends");

    // Populate Data
    if (image) {
      image.src =
        listing.media?.[0]?.url ||
        "https://via.placeholder.com/400x300?text=No+Image";
      image.alt = listing.media?.[0]?.alt || listing.title;
    }

    if (title) {
      title.textContent = listing.title;
      title.classList.remove("hidden");
    }

    if (description) {
      description.textContent =
        listing.description || "No description provided.";
    }

    if (seller) seller.textContent = listing.seller?.name || "Unknown";

    if (bidsCount) {
      bidsCount.textContent = listing._count?.bids || listing.bids?.length || 0;
    }

    const currentBid =
      listing.bids?.length > 0
        ? listing.bids[listing.bids.length - 1].amount
        : 0;
    if (price) price.textContent = currentBid;
    renderBidHistory(listing.bids);

    if (endsAt) {
      const date = new Date(listing.endsAt).toLocaleString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
      endsAt.textContent = date;
    }

    const loader = document.querySelector("#loader");
    const container = document.querySelector("#listing-container");

    if (loader) loader.classList.add("hidden");
    if (container) container.classList.remove("hidden");
  } catch (error) {
    console.error(error);
    alert("Error loading listing details.");
  }
}

function renderBidHistory(bids) {
  const container = document.querySelector("#bids-container");
  const template = document.querySelector("#bid-row-template");

  if (!container || !template) return;

  container.innerHTML = "";

  if (!bids || bids.length === 0) {
    container.innerHTML = `<div class="text-center text-slate-500 italic">No bids yet. Be the first!</div>`;
    return;
  }

  // Sort bids
  const sortedBids = bids.sort((a, b) => b.amount - a.amount);

  sortedBids.forEach((bid) => {
    const clone = template.content.cloneNode(true);
    const bidderEl = clone.querySelector(".js-bidder");
    const dateEl = clone.querySelector(".js-date");
    const amountEl = clone.querySelector(".js-amount");
    const name = bid.bidderName || bid.bidder?.name || "Unknown Bidder";
    const date = new Date(bid.created).toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

    if (bidderEl) bidderEl.textContent = name;
    if (dateEl) dateEl.textContent = date;
    if (amountEl) amountEl.textContent = `${bid.amount} credits`;

    container.appendChild(clone);
  });
}

loadDetails();
