import { API_AUCTION_PROFILES } from "../constants.js";

export async function updateProfile(name, { avatar, banner, bio }) {
  const token = localStorage.getItem("token");

  const response = await fetch(`${API_AUCTION_PROFILES}/${name}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      "X-Noroff-API-Key": import.meta.env.VITE_API_KEY,
    },
    body: JSON.stringify({
      bio: bio,
      avatar: { url: avatar, alt: `${name}'s avatar` },
      banner: { url: banner, alt: `${name}'s banner` },
    }),
  });

  const json = await response.json();

  if (!response.ok) {
    throw new Error(json.errors?.[0]?.message || "Could not update profile");
  }

  return json.data;
}
