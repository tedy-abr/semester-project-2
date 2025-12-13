export function ListingCard(listing) {
  const { id, title, media, _count, endsAt, seller, created, bids } = listing;

  // Find the template blueprint
  const template = document.querySelector("#listing-template");
  if (!template) {
    return document.createElement("div");
  }

  // Clone the template content
  const clone = template.content.cloneNode(true);

  const imageUrl =
    media?.[0]?.url || "https://via.placeholder.com/400x300?text=No+Image";
  const imageAlt = media?.[0]?.alt || title;

  const dateOptions = { month: "short", day: "numeric", year: "numeric" };
  const formattedEnds = new Date(endsAt).toLocaleDateString(
    "en-US",
    dateOptions
  );
  const formattedCreated = new Date(created).toLocaleDateString(
    "en-US",
    dateOptions
  );

  const bidAmount = _count?.bids || 0;
  const lastBid = bids && bids.length > 0 ? bids[bids.length - 1] : null;
  const img = clone.querySelector(".js-img");
  img.src = imageUrl;
  img.alt = imageAlt;

  // Timer
  clone.querySelector(".js-ends-at").textContent = `Ends: ${formattedEnds}`;

  // Title
  const titleEl = clone.querySelector(".js-title");
  titleEl.textContent = title;
  titleEl.title = title;

  // Seller
  const sellerLink = clone.querySelector(".js-seller");
  sellerLink.textContent = seller?.name || "Unknown";
  sellerLink.href = `/profile.html?name=${seller?.name || "Unknown"}`;

  // Date
  clone.querySelector(".js-created").textContent = `Posted ${formattedCreated}`;

  // Bid Amount
  clone.querySelector(".js-bid-amount").textContent = `${bidAmount} Credits`;

  // Bidder Name
  if (lastBid?.bidder?.name) {
    const bidderNameEl = clone.querySelector(".js-bidder-name");
    const bidderContainer = clone.querySelector(".js-bidder-container");

    bidderNameEl.textContent = lastBid.bidder.name;
    bidderNameEl.href = `/profile.html?name=${lastBid.bidder.name}`;

    // Show Icon & Bidder
    if (bidderContainer) {
      bidderContainer.classList.remove("hidden");
    }
  }

  const btn = clone.querySelector(".js-view-btn");
  btn.href = `/details.html?id=${id}`;

  return clone;
}
