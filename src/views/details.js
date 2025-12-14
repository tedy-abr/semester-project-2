import { readSingleListing } from "../api/listings/read.js";
import { placeBid } from "../api/listings/bid.js";

function renderBidHistory(bids) {
  const container = document.querySelector("#bids-container");
  const template = document.querySelector("#bid-row-template");

  if (!container || !template) return;

  container.innerHTML = "";

  if (!bids || bids.length === 0) {
    container.innerHTML = `<div class="text-center text-slate-500 italic">No bids yet. Be the first!</div>`;
    return;
  }

  // Sort bids highest amount first
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

function renderBidForm(listingId) {
  const token = localStorage.getItem("token");
  const section = document.querySelector("#bid-section");
  const template = document.querySelector("#bid-form-template");

  // If not logged in or missing elements, stop here
  if (!token || !section || !template) return;

  // Clear and Show Section
  section.innerHTML = "";
  section.classList.remove("hidden");

  // Clone Template
  const clone = template.content.cloneNode(true);
  const input = clone.querySelector("#bid-amount-input");
  const btn = clone.querySelector("#place-bid-btn");
  const msg = clone.querySelector("#bid-message");

  // Add Click Listener
  btn.addEventListener("click", async () => {
    const amount = Number(input.value);

    if (!amount) {
      alert("Please enter a valid amount.");
      return;
    }

    btn.disabled = true;
    btn.textContent = "Placing Bid...";
    msg.classList.add("hidden");

    try {
      await placeBid(listingId, amount);

      // Update Credits in LocalStorage
      const currentCredits = Number(localStorage.getItem("user_credits") || 0);
      localStorage.setItem("user_credits", currentCredits - amount);

      alert("Bid placed successfully!");
      window.location.reload();
    } catch (error) {
      console.error(error);
      msg.textContent = error.message || "Failed to place bid.";
      msg.classList.remove("hidden");
      btn.disabled = false;
      btn.textContent = "Place Bid";
    }
  });

  section.appendChild(clone);
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

    // Render dynamic sections
    renderBidHistory(listing.bids);
    renderBidForm(listing.id);

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
