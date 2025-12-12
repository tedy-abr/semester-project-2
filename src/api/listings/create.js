import { API_AUCTION_LISTINGS } from "../constants.js";

export async function createListing({
  title,
  description,
  tags,
  media,
  endsAt,
}) {
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("You must be logged in to create a listing.");
  }

  const response = await fetch(API_AUCTION_LISTINGS, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      "X-Noroff-API-Key": import.meta.env.VITE_API_KEY,
    },
    body: JSON.stringify({
      title,
      description,
      tags,
      media,
      endsAt,
    }),
  });

  const json = await response.json();

  if (!response.ok) {
    throw new Error(json.errors?.[0]?.message || "Could not create listing");
  }

  return json.data;
}
