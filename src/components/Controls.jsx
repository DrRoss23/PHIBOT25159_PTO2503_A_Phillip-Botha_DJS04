import SearchBar from "./SearchBar";
import SortSelect from "./SortSelect";
import GenreDropdown from "./GenreDropdown";

/**
 * Controls
 * Groups all user-facing podcast browsing controls:
 * - Search
 * - Genre filtering
 * - Sorting
 */
export default function Controls() {
  return (
    <section className="controls-wrapper">
      <div className="controls">
        <SearchBar />
        <GenreDropdown />
        <SortSelect />
      </div>
    </section>
  );
}
