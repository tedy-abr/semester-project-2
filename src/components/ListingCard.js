/**
 * Creates a DOM Element by cloning the <template> in index.html.
 * This keeps HTML/CSS in the HTML file, and Logic in the JS file.
 */
export function ListingCard(listing) {
  const { id, title, media, _count, endsAt, seller, created, bids } = listing;

  // 1. Find the template blueprint
  const template = document.querySelector("#listing-template");
  if (!template) {
    console.error(
      "❌ CRITICAL ERROR: Could not find <template id='listing-template'> in index.html!"
    );
    return document.createElement("div"); // Return empty div to prevent crash
  }

  // 2. Clone it (true means clone all children inside)
  const clone = template.content.cloneNode(true);

  // 3. Format Data
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

  // 4. Fill in the slots (Query Selector looks INSIDE the clone)

  // Image
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

  // Bidder Name (Only if it exists)
  if (lastBid?.bidder?.name) {
    const bidderEl = clone.querySelector(".js-bidder-name");
    bidderEl.textContent = lastBid.bidder.name;
    bidderEl.href = `/profile.html?name=${lastBid.bidder.name}`;
    bidderEl.classList.remove("hidden"); // Show it
  }

  // View Details Button
  const btn = clone.querySelector(".js-view-btn");
  btn.href = `/listings/details.html?id=${id}`;

  // 5. Return the filled clone
  return clone;
}
