import SearchBar from "./SearchBar";
import SortSelect from "./SortSelect";
import GenreDropdown from "./GenreDropdown";

/**
 * Groups all podcast browsing controls.
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
