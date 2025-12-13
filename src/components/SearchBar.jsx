import { usePodcastContext } from "../context/PodcastContext";

/**
 * SearchBar
 * Provides live search functionality for podcast titles.
 */
export default function SearchBar() {
  const { searchTerm, setSearchTerm } = usePodcastContext();

  /**
   * Handles changes to the search input.
   *
   * @param {React.ChangeEvent<HTMLInputElement>} event
   */
  function handleChange(event) {
    setSearchTerm(event.target.value);
  }

  return (
    <input
      type="search"
      className="search-input"
      placeholder="Search podcasts..."
      value={searchTerm}
      onChange={handleChange}
    />
  );
}
