import { usePodcastContext } from "../context/PodcastContext";

/**
 * Search input for podcast titles.
 * Updates search term in context.
 */
export default function SearchBar() {
  const { searchTerm, setSearchTerm } = usePodcastContext();

  return (
    <input
      type="search"
      placeholder="Search podcasts…"
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      className="search-input"
    />
  );
}
