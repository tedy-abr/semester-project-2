import { API_AUCTION_LISTINGS, API_KEY } from "../constants.js";

export async function readListings(limit = 12, page = 1) {
  try {
    const response = await fetch(
      // Active listings, seller info, and bid count
      `${API_AUCTION_LISTINGS}?limit=${limit}&page=${page}&_active=true&_seller=true&_bids=true&sort=created&sortOrder=desc`,
      {
        method: "GET",
        headers: {
          "X-Noroff-API-Key": API_KEY,
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error("Could not fetch listings");
    }

    const json = await response.json();
    return json.data;
  } catch (error) {
    console.error(error);
    return [];
  }
}
