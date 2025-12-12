import { readProfile, readProfileListings } from "../api/profiles/read.js";

async function loadProfile() {
  // Determine who's profile to show
  const params = new URLSearchParams(window.location.search);
  const loggedInUser = localStorage.getItem("user_name");
  const profileName = params.get("name") || loggedInUser;

  if (!profileName) {
    alert("No profile specified and not logged in.");
    window.location.href = "/login.html";
    return;
  }

  // Users profile?
  const isOwnProfile = profileName === loggedInUser;

  try {
    const profile = await readProfile(profileName);
    const listings = await readProfileListings(profileName);

    document.title = `${profile.name} | NidarBid`;
    document.querySelector("#profile-name").textContent = profile.name;
    document.querySelector("#profile-email").textContent = profile.email;

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

    // Show private info if own profile
    if (isOwnProfile) {
      const creditEl = document.querySelector("#profile-credits");
      const editBtn = document.querySelector("#edit-profile-btn");

      creditEl.textContent = `Total Credits: ${profile.credits}`;
      creditEl.classList.remove("hidden");
      editBtn.classList.remove("hidden");
    }

    // Render Listings
    const listingsGrid = document.querySelector("#listings-grid");
    listingsGrid.innerHTML = "";

    if (listings.length > 0) {
      const template = document.querySelector("#profile-listing-template");

      listings.forEach((item) => {
        const clone = template.content.cloneNode(true);
        const img = clone.querySelector(".js-img");
        img.src = item.media?.[0]?.url || "https://via.placeholder.com/150";

        // Title
        clone.querySelector(".js-title").textContent = item.title;

        // Date
        const date = new Date(item.endsAt).toLocaleDateString();
        clone.querySelector(".js-ends").textContent = date;

        // Bids
        const bidCount = item._count?.bids || 0;
        clone.querySelector(".js-bid").textContent = `${bidCount} Bids`;

        // Button Link
        const btn = clone.querySelector(".js-btn");
        btn.href = `/details.html?id=${item.id}`;

        // If own profile, show edit button
        listingsGrid.append(clone);
      });
    } else {
      listingsGrid.innerHTML = `<p class="text-slate-400 text-center py-4">No listings active.</p>`;
    }
  } catch (error) {
    console.error(error);
    alert("Error loading profile.");
  }
}

loadProfile();
