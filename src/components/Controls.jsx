import SearchBar from "./SearchBar";
import SortSelect from "./SortSelect";

/**
 * Groups search and sort controls.
 */
export default function Controls() {
  return (
    <section className="controls">
      <SearchBar />
      <SortSelect />
    </section>
  );
}
