/**
 * Formats an ISO date string into a readable date.
 *
 * @param {string} dateString - ISO date string from the API
 * @returns {string} Formatted date (e.g. "12 Jan 2024")
 */
export function formatDate(dateString) {
  const date = new Date(dateString);

  return date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}
