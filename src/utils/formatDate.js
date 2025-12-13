/**
 * Formats an ISO date string into a readable date.
 *
 * @param {string} isoDate ISO date string
 * @returns {string} Formatted date
 */
export function formatDate(isoDate) {
  const date = new Date(isoDate);

  return date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}
