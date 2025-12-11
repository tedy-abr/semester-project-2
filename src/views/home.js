import { ListingCard } from "../components/ListingCard.js";
import { readListings } from "../api/listings/read.js";

async function loadHomePage() {
  const grid = document.querySelector("#listings-grid");

  if (!grid) {
    console.error("❌ Debug: Grid not found!");
    return;
  }

  try {
    console.log("🔵 Debug: Fetching listings...");
    const listings = await readListings();
    console.log("🔵 Debug: Listings found:", listings);

    // Clear "Loading..." text
    grid.innerHTML = "";

    if (listings && listings.length > 0) {
      listings.forEach((listing) => {
        // Create the element
        const cardElement = ListingCard(listing);

        // Log if something is wrong with the card
        if (!cardElement) {
          console.error(
            "❌ Debug: ListingCard returned null/undefined for:",
            listing.title
          );
          return;
        }

        // Append it
        grid.append(cardElement);
      });
      console.log("✅ Debug: All cards appended to grid.");
    } else {
      console.warn("⚠️ Debug: No listings returned from API.");
      grid.innerHTML = `<div class="col-span-full text-center text-slate-500">No listings found.</div>`;
    }
  } catch (error) {
    console.error("❌ Debug: Error loading home page:", error);
    grid.innerHTML = `<div class="col-span-full text-center text-red-500">Error loading auctions.</div>`;
  }
}

loadHomePage();
