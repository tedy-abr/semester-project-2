import {
  readProfile,
  readProfileListings,
  readProfileBids,
} from "../api/profiles/read.js";

async function loadProfile() {
  const params = new URLSearchParams(window.location.search);
  const loggedInUser = localStorage.getItem("user_name");
  const profileName = params.get("name") || loggedInUser;

  if (!profileName) {
    alert("No profile specified and not logged in.");
    window.location.href = "/login.html";
    return;
  }

  const isOwnProfile = profileName === loggedInUser;

  try {
    const profile = await readProfile(profileName);
    const listings = await readProfileListings(profileName);

    // Fetch bids only if it is logged in user
    let bids = [];
    if (isOwnProfile) {
      bids = await readProfileBids(profileName);
    }

    document.title = `${profile.name} | NidarBid`;
    document.querySelector("#profile-name").textContent = profile.name;
    document.querySelector("#profile-email").textContent = profile.email;

    // Bio
    const bioEl = document.querySelector("#profile-bio");
    if (bioEl) {
      bioEl.textContent = profile.bio || "No about me info yet.";
    }

    // Banner & Avatar
    const banner = document.querySelector("#profile-banner");
    const avatar = document.querySelector("#profile-avatar");

    if (profile.banner?.url) {
      banner.src = profile.banner.url;
      banner.alt = profile.banner.alt || "Profile Banner";
    }
    if (profile.avatar?.url) {
      avatar.src = profile.avatar.url;
      avatar.alt = profile.avatar.alt || "Avatar";
    }

    // Handle UI based on Ownership
    const editLink = document.querySelector("#edit-profile-link");
    const listingsTitle = document.querySelector("#listings-title");
    const creditEl = document.querySelector("#profile-credits");

    if (isOwnProfile) {
      if (editLink) editLink.classList.remove("hidden");
      if (creditEl) {
        creditEl.textContent = `Total Credits: ${profile.credits}`;
        creditEl.classList.remove("hidden");
      }
      if (listingsTitle) listingsTitle.textContent = "My listings";

      // Render user Bids
      const bidsSection = document.querySelector("#bids-section");
      const bidsGrid = document.querySelector("#bids-grid");

      if (bids.length > 0 && bidsSection && bidsGrid) {
        bidsSection.classList.remove("hidden");
        bidsGrid.innerHTML = "";
        const template = document.querySelector("#profile-listing-template");

        bids.forEach((bid) => {
          const item = bid.listing;
          if (!item) return;
          const clone = template.content.cloneNode(true);
          fillCard(clone, item, true, bid.amount);
          bidsGrid.append(clone);
        });
      }
    } else {
      if (editLink) editLink.classList.add("hidden");
      if (creditEl) creditEl.classList.add("hidden");

      if (listingsTitle)
        listingsTitle.textContent = `${profile.name}'s listings`;
    }

    // Render Listings
    const listingsGrid = document.querySelector("#listings-grid");
    listingsGrid.innerHTML = "";

    if (listings.length > 0) {
      const template = document.querySelector("#profile-listing-template");
      listings.forEach((item) => {
        const clone = template.content.cloneNode(true);
        fillCard(clone, item, false);
        listingsGrid.append(clone);
      });
    } else {
      listingsGrid.innerHTML = `<p class="text-slate-400 text-center py-4">No active listings.</p>`;
    }
  } catch (error) {
    console.error(error);
    alert("Error loading profile.");
  }
}

function fillCard(clone, item, isBidItem, myBidAmount = 0) {
  const img = clone.querySelector(".js-img");
  img.src = item.media?.[0]?.url || "https://via.placeholder.com/150";
  img.alt = item.media?.[0]?.alt || item.title;

  clone.querySelector(".js-title").textContent = item.title;

  const date = new Date(item.endsAt).toLocaleDateString();
  clone.querySelector(".js-ends").textContent = date;

  const bidLabel = clone.querySelector(".js-bid");
  const bidTitleLabel = bidLabel.previousElementSibling;

  if (isBidItem) {
    bidTitleLabel.textContent = "My Bid";
    bidLabel.textContent = `${myBidAmount} Credits`;
    bidLabel.classList.add("text-secondary");
  } else {
    const bidCount = item._count?.bids || 0;
    bidLabel.textContent = `${bidCount} Bids`;
  }

  const btn = clone.querySelector(".js-btn");
  btn.href = `/details.html?id=${item.id}`;
}

loadProfile();
