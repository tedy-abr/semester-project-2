import { API_AUCTION_LISTINGS } from "../constants.js";

export async function bidOnListing(id, amount) {
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("You must be logged in to place a bid.");
  }

  const response = await fetch(`${API_AUCTION_LISTINGS}/${id}/bids`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      "X-Noroff-API-Key": import.meta.env.VITE_API_KEY,
    },
    body: JSON.stringify({ amount: Number(amount) }),
  });

  const json = await response.json();

  if (!response.ok) {
    throw new Error(json.errors?.[0]?.message || "Could not place bid");
  }

  return json;
}
