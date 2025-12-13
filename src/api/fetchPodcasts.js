/**
 * Fetches podcast preview data from the API.
 * @returns {Promise<Array<Object>>}
 */
export async function fetchPodcasts() {
  const response = await fetch("https://podcast-api.netlify.app");

  if (!response.ok) {
    throw new Error("Failed to fetch podcasts");
  }

  const data = await response.json();
  return data;
}
