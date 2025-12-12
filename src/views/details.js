import { readSingleListing } from "../api/listings/read.js";

async function loadDetails() {
  // Get ID from the URL
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

    // Handle Image
    image.src =
      listing.media?.[0]?.url ||
      "https://via.placeholder.com/400x300?text=No+Image";
    image.alt = listing.media?.[0]?.alt || listing.title;

    // Handle Text
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
