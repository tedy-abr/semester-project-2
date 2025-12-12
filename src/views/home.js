import { ListingCard } from "../components/ListingCard.js";
import { readListings } from "../api/listings/read.js";

async function loadHomePage() {
  const grid = document.querySelector("#listings-grid");

  if (!grid) {
    return;
  }

  try {
    const listings = await readListings();

    // Clear Loading Message
    grid.innerHTML = "";

    if (listings && listings.length > 0) {
      listings.forEach((listing) => {
        // Create the element
        const cardElement = ListingCard(listing);

        if (!cardElement) {
          return;
        }

        grid.append(cardElement);
      });
    } else {
      grid.innerHTML = `<div class="col-span-full text-center text-slate-500">No listings found.</div>`;
    }
  } catch (error) {
    grid.innerHTML = `<div class="col-span-full text-center text-red-500">Error loading auctions.</div>`;
  }
}

loadHomePage();
