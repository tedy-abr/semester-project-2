import { API_AUTH_LOGIN, API_AUCTION_PROFILES } from "../constants.js";

export async function login({ email, password }) {
  try {
    // Login request
    const loginResponse = await fetch(API_AUTH_LOGIN, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const loginJson = await loginResponse.json();

    if (!loginResponse.ok) {
      throw new Error(loginJson.errors?.[0]?.message || "Could not login");
    }

    // Get data from login
    const { accessToken, name } = loginJson.data;

    // Fetch full profile data
    const profileResponse = await fetch(`${API_AUCTION_PROFILES}/${name}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "X-Noroff-API-Key": import.meta.env.VITE_API_KEY,
      },
    });

    const profileJson = await profileResponse.json();

    if (!profileResponse.ok) {
      throw new Error("Logged in, but could not fetch profile credits.");
    }

    // Save everything to storage
    const credits = profileJson.data.credits;

    localStorage.setItem("token", accessToken);
    localStorage.setItem("user_name", name);
    localStorage.setItem("user_credits", credits);

    return profileJson.data;
  } catch (error) {
    throw error;
  }
}
