import { useState } from "react";
import { usePodcastContext } from "../context/PodcastContext";

/**
 * GenreDropdown
 * Multi-select dropdown for filtering podcasts by genre.
 */
export default function GenreDropdown() {
  const { genres, selectedGenres, setSelectedGenres } = usePodcastContext();

  const [open, setOpen] = useState(false);

  /**
   * Toggles a genre ID in the selected genres list.
   *
   * @param {number} id Genre ID
   */
  function toggleGenre(id) {
    setSelectedGenres((prev) =>
      prev.includes(id) ? prev.filter((g) => g !== id) : [...prev, id]
    );
  }

  /**
   * Generates dropdown label text based on selection.
   *
   * @returns {string}
   */
  function getLabel() {
    if (selectedGenres.length === 0) return "Filter by genre";
    if (selectedGenres.length === 1) return genres[selectedGenres[0]];
    return `${selectedGenres.length} genres selected`;
  }

  return (
    <div className="genre-dropdown">
      <button
        type="button"
        className="genre-toggle"
        onClick={() => setOpen((prev) => !prev)}
        aria-expanded={open}
      >
        {getLabel()}
      </button>

      {open && (
        <div className="genre-menu">
          {Object.entries(genres).map(([id, name]) => (
            <label key={id} className="genre-option">
              <input
                type="checkbox"
                checked={selectedGenres.includes(Number(id))}
                onChange={() => toggleGenre(Number(id))}
              />
              {name}
            </label>
          ))}
        </div>
      )}
    </div>
  );
}
