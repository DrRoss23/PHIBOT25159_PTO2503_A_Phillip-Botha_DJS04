import { usePodcastContext } from "../context/PodcastContext";

/**
 * SortSelect
 * Dropdown for selecting podcast sort order.
 */
export default function SortSelect() {
  const { sortOption, setSortOption } = usePodcastContext();

  /**
   * Handles changes to the sort option.
   *
   * @param {React.ChangeEvent<HTMLSelectElement>} event
   */
  function handleChange(event) {
    setSortOption(event.target.value);
  }

  return (
    <select className="sort-select" value={sortOption} onChange={handleChange}>
      <option value="newest">Newest first</option>
      <option value="az">Title A–Z</option>
      <option value="za">Title Z–A</option>
    </select>
  );
}
