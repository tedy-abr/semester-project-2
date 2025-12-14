import { API_AUCTION_PROFILES } from "../constants.js";

export async function readProfile(name) {
  const token = localStorage.getItem("token");

  // Show profile data
  const headers = {
    "X-Noroff-API-Key": import.meta.env.VITE_API_KEY,
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(`${API_AUCTION_PROFILES}/${name}`, {
    headers: headers,
  });

  const json = await response.json();

  if (!response.ok) {
    throw new Error(json.errors?.[0]?.message || "Could not fetch profile");
  }

  return json.data;
}

export async function readProfileListings(name) {
  const token = localStorage.getItem("token");
  const headers = {
    "X-Noroff-API-Key": import.meta.env.VITE_API_KEY,
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  // Fetch listings created by this user
  const response = await fetch(
    `${API_AUCTION_PROFILES}/${name}/listings?_bids=true`,
    {
      headers: headers,
    }
  );

  const json = await response.json();

  if (!response.ok) {
    throw new Error("Could not fetch user listings");
  }

  return json.data;
}

export async function readProfileBids(name) {
  const token = localStorage.getItem("token");
  const headers = {
    "X-Noroff-API-Key": import.meta.env.VITE_API_KEY,
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  // Fetch bids made by user & include the listing details
  const response = await fetch(
    `${API_AUCTION_PROFILES}/${name}/bids?_listings=true`,
    {
      headers: headers,
    }
  );

  const json = await response.json();

  if (!response.ok) {
    throw new Error("Could not fetch user bids");
  }

  return json.data;
}
