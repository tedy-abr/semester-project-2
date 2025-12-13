import { ListingCard } from "../components/ListingCard.js";
import { readListings } from "../api/listings/read.js";
import { placeBid } from "../api/listings/bid.js";

async function loadHomePage() {
  const grid = document.querySelector("#listings-grid");
  const heroSection = document.querySelector("#hero-section");

  const token = localStorage.getItem("token");
  const isLoggedIn = !!token;

  // Create Listing Button from Template
  if (isLoggedIn && heroSection) {
    const template = document.querySelector("#create-listing-btn-template");
    if (template) {
      heroSection.appendChild(template.content.cloneNode(true));
    }
  }

  if (!grid) return;

  try {
    const listings = await readListings();
    grid.innerHTML = "";

    if (listings && listings.length > 0) {
      listings.forEach((listing) => {
        const cardElement = ListingCard(listing);

        if (isLoggedIn) {
          // Remove Auth Message
          const authMessage = cardElement.querySelector(
            ".text-xs.text-heading-color.mb-3"
          );
          if (authMessage) authMessage.remove();

          // Inject quick bid from template
          const bidTemplate = document.querySelector("#quick-bid-template");
          if (bidTemplate) {
            // Clone the template
            const clone = bidTemplate.content.cloneNode(true);

            const input = clone.querySelector(".bid-input");
            const bidBtn = clone.querySelector(".bid-btn");

            bidBtn.addEventListener("click", async () => {
              const amount = Number(input.value);
              if (!amount) return alert("Please enter an amount");

              if (confirm(`Are you sure you want to bid ${amount} credits?`)) {
                try {
                  await placeBid(listing.id, amount);

                  // Update balance & reload
                  const currentCredits = Number(
                    localStorage.getItem("user_credits") || 0
                  );
                  localStorage.setItem("user_credits", currentCredits - amount);

                  alert("Bid placed successfully!");
                  window.location.reload();
                } catch (error) {
                  alert(error.message);
                }
              }
            });

            const viewBtn = cardElement.querySelector(".js-view-btn");
            viewBtn.parentElement.insertBefore(clone, viewBtn);
          }
        }

        grid.append(cardElement);
      });
    } else {
      grid.innerHTML = `<div class="col-span-full text-center text-slate-500">No listings found.</div>`;
    }
  } catch (error) {
    console.error(error);
    grid.innerHTML = `<div class="col-span-full text-center text-red-500">Error loading auctions.</div>`;
  }
}

loadHomePage();
