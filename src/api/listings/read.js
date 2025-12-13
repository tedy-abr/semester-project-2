import { API_AUCTION_LISTINGS, API_KEY } from "../constants.js";

export async function readListings(limit = 12, page = 1) {
  try {
    const response = await fetch(
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

    return {
      data: json.data,
      meta: json.meta,
    };
  } catch (error) {
    console.error(error);

    return { data: [], meta: {} };
  }
}

export async function readSingleListing(id) {
  if (!id) throw new Error("Listing ID is missing");

  const response = await fetch(
    `${API_AUCTION_LISTINGS}/${id}?_seller=true&_bids=true`
  );

  const json = await response.json();

  if (!response.ok) {
    throw new Error(json.errors?.[0]?.message || "Could not fetch listing");
  }

  return json.data;
}
