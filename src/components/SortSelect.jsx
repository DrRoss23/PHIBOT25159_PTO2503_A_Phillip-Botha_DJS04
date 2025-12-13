import { usePodcastContext } from "../context/PodcastContext";

/**
 * Sort selector for podcast list.
 */
export default function SortSelect() {
  const { sortOption, setSortOption } = usePodcastContext();

  return (
    <select
      value={sortOption}
      onChange={(e) => setSortOption(e.target.value)}
      className="sort-select"
    >
      <option value="newest">Newest first</option>
      <option value="az">Title A–Z</option>
      <option value="za">Title Z–A</option>
    </select>
  );
}
