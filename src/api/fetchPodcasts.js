/**
 * Fetches podcast preview data from the public API.
 *
 * @returns {Promise<Array>} Array of podcast previews
 * @throws {Error} If the request fails
 */
export async function fetchPodcasts() {
  const response = await fetch("https://podcast-api.netlify.app");

  if (!response.ok) {
    throw new Error("Failed to fetch podcasts");
  }

  return response.json();
}
