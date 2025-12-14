import { ListingCard } from "../components/ListingCard.js";
import { readListings } from "../api/listings/read.js";
import { placeBid } from "../api/listings/bid.js";
import { searchListings } from "../api/listings/search.js";

let currentPage = 1;
let currentSearchQuery = "";
let currentSort = "created";
let currentSortOrder = "desc";

async function loadHomePage() {
  const grid = document.querySelector("#listings-grid");
  const heroSection = document.querySelector("#hero-section");
  const token = localStorage.getItem("token");
  const isLoggedIn = !!token;

  // Inject Create Listing Button
  if (isLoggedIn && heroSection && !document.querySelector(".js-create-btn")) {
    const template = document.querySelector("#create-listing-btn-template");
    if (template) {
      const clone = template.content.cloneNode(true);
      clone.firstElementChild.classList.add("js-create-btn");
      heroSection.appendChild(clone);
    }
  }

  // Search Listener
  const searchForm = document.querySelector("#search-form");
  if (searchForm && !searchForm.dataset.listenerAttached) {
    searchForm.addEventListener("submit", onSearchSubmit);
    searchForm.dataset.listenerAttached = "true";
  }

  // Sort Listener
  const sortSelect = document.querySelector("#sort");
  if (sortSelect && !sortSelect.dataset.listenerAttached) {
    sortSelect.addEventListener("change", onSortChange);
    sortSelect.dataset.listenerAttached = "true";
  }

  if (!grid) return;

  grid.innerHTML = `<div class="col-span-full text-center text-slate-400 py-10">Loading...</div>`;

  try {
    let result;
    if (currentSearchQuery) {
      result = await searchListings(currentSearchQuery, 12, currentPage);
    } else {
      result = await readListings(
        12,
        currentPage,
        currentSort,
        currentSortOrder
      );
    }

    const { data: listings, meta } = result;

    grid.innerHTML = "";

    if (listings && listings.length > 0) {
      listings.forEach((listing) => {
        const cardElement = ListingCard(listing);

        // Handle seller link based on Auth
        const sellerLink = cardElement.querySelector(".js-seller");
        if (sellerLink) {
          if (isLoggedIn) {
            sellerLink.href = `/profile.html?name=${listing.seller.name}`;
          } else {
            sellerLink.removeAttribute("href");
            sellerLink.classList.remove("text-secondary", "hover:underline");
            sellerLink.classList.add("text-slate-500", "cursor-default");
            sellerLink.title = "Log in to view seller profile";
          }
        }

        // Handle bidder Link based on Auth
        const bidderLink = cardElement.querySelector(".js-bidder-name");
        if (bidderLink) {
          if (!isLoggedIn) {
            // Disable the link for guests
            bidderLink.removeAttribute("href");
            bidderLink.classList.remove("hover:underline");
            bidderLink.classList.add("text-slate-500", "cursor-default");
            bidderLink.title = "Log in to view bidder profile";
          }
        }

        if (isLoggedIn) {
          const authMessage = cardElement.querySelector(
            ".text-xs.text-heading-color.mb-3"
          );
          if (authMessage) authMessage.remove();

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

      renderPaginationControls(grid, meta);
    } else {
      grid.innerHTML = `<div class="col-span-full text-center text-slate-500">No listings found.</div>`;
    }
  } catch (error) {
    console.error(error);
    grid.innerHTML = `<div class="col-span-full text-center text-red-500">Error loading auctions.</div>`;
  }
}

function onSearchSubmit(event) {
  event.preventDefault();
  const formData = new FormData(event.target);
  const query = formData.get("search").trim();
  currentSearchQuery = query;
  currentPage = 1;
  loadHomePage();
}

// Handle Sort Change
function onSortChange(event) {
  const value = event.target.value;

  // Split the value
  const [sort, order] = value.split("_");
  currentSort = sort;
  currentSortOrder = order;
  currentPage = 1;
  loadHomePage();
}

function renderPaginationControls(grid, meta) {
  if (meta.pageCount <= 1) return;

  const template = document.querySelector("#pagination-template");
  if (!template) return;

  const clone = template.content.cloneNode(true);
  const prevBtn = clone.querySelector(".js-prev-btn");
  const nextBtn = clone.querySelector(".js-next-btn");
  const indicator = clone.querySelector(".js-page-indicator");

  indicator.textContent = `Page ${meta.currentPage} of ${meta.pageCount}`;

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
