import { ListingCard } from "../components/ListingCard.js";
import { readListings } from "../api/listings/read.js";
import { placeBid } from "../api/listings/bid.js";
// 🟢 1. Import Search API
import { searchListings } from "../api/listings/search.js";

let currentPage = 1;
let currentSearchQuery = "";

async function loadHomePage() {
  const grid = document.querySelector("#listings-grid");
  const heroSection = document.querySelector("#hero-section");
  const token = localStorage.getItem("token");
  const isLoggedIn = !!token;

  // Inject Create Listing Button if Logged In
  if (isLoggedIn && heroSection && !document.querySelector(".js-create-btn")) {
    const template = document.querySelector("#create-listing-btn-template");
    if (template) {
      const clone = template.content.cloneNode(true);
      clone.firstElementChild.classList.add("js-create-btn");
      heroSection.appendChild(clone);
    }
  }

  // Search listener
  const searchForm = document.querySelector("#search-form");
  if (searchForm && !searchForm.dataset.listenerAttached) {
    searchForm.addEventListener("submit", onSearchSubmit);
    searchForm.dataset.listenerAttached = "true";
  }

  if (!grid) return;

  // Clear Grid and Show Loading State
  grid.innerHTML = `<div class="col-span-full text-center text-slate-400 py-10">Loading ${
    currentSearchQuery ? "results" : "page " + currentPage
  }...</div>`;

  try {
    let result;
    if (currentSearchQuery) {
      result = await searchListings(currentSearchQuery, 12, currentPage);
    } else {
      result = await readListings(12, currentPage);
    }

    const { data: listings, meta } = result;

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

          // Inject quick bid form
          const bidTemplate = document.querySelector("#quick-bid-template");
          if (bidTemplate) {
            const clone = bidTemplate.content.cloneNode(true);
            const input = clone.querySelector(".bid-input");
            const bidBtn = clone.querySelector(".bid-btn");

            bidBtn.addEventListener("click", async () => {
              const amount = Number(input.value);
              if (!amount) return alert("Please enter an amount");

              if (confirm(`Are you sure you want to bid ${amount} credits?`)) {
                try {
                  await placeBid(listing.id, amount);
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

      // Pagination Controls
      renderPaginationControls(grid, meta);
    } else {
      grid.innerHTML = `<div class="col-span-full text-center text-slate-500">No listings found.</div>`;
    }
  } catch (error) {
    console.error(error);
    grid.innerHTML = `<div class="col-span-full text-center text-red-500">Error loading auctions.</div>`;
  }
}

// Handle search submit
function onSearchSubmit(event) {
  event.preventDefault();
  const formData = new FormData(event.target);
  const query = formData.get("search").trim();

  currentSearchQuery = query;
  currentPage = 1;
  loadHomePage();
}

// Pagination helper
function renderPaginationControls(grid, meta) {
  if (meta.pageCount <= 1) return;

  const template = document.querySelector("#pagination-template");
  if (!template) return;

  const clone = template.content.cloneNode(true);
  const prevBtn = clone.querySelector(".js-prev-btn");
  const nextBtn = clone.querySelector(".js-next-btn");
  const indicator = clone.querySelector(".js-page-indicator");

  indicator.textContent = `Page ${meta.currentPage} of ${meta.pageCount}`;

  // Handle Previous Button
  prevBtn.disabled = meta.isFirstPage;
  prevBtn.addEventListener("click", () => {
    if (!meta.isFirstPage) {
      currentPage--;
      loadHomePage();
      document
        .querySelector("#listings-grid")
        .scrollIntoView({ behavior: "smooth" });
    }
  });

  // Handle Next Button
  nextBtn.disabled = meta.isLastPage;
  nextBtn.addEventListener("click", () => {
    if (!meta.isLastPage) {
      currentPage++;
      loadHomePage();
      document
        .querySelector("#listings-grid")
        .scrollIntoView({ behavior: "smooth" });
    }
  });

  grid.append(clone);
}

loadHomePage();
