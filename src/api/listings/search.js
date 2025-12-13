import { API_AUCTION_SEARCH, API_KEY } from "../constants.js";

export async function searchListings(query, limit = 12, page = 1) {
  try {
    const response = await fetch(
      `${API_AUCTION_SEARCH}?q=${query}&limit=${limit}&page=${page}&_active=true&_seller=true&_bids=true`,
      {
        method: "GET",
        headers: {
          "X-Noroff-API-Key": API_KEY,
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error("Could not fetch search results");
    }

    const json = await response.json();

    return {
      data: json.data,
      meta: json.meta,
    };
  } catch (error) {
    console.error(error);
    return { data: [], meta: {} };
  }
}
