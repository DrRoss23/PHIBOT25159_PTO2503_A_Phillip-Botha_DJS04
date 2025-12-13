import { usePodcastContext } from "../context/PodcastContext";

/**
 * Genre filter component.
 * Allows selecting multiple podcast genres.
 */
export default function GenreFilter() {
  const { genres, selectedGenres, setSelectedGenres } = usePodcastContext();

  function toggleGenre(genreId) {
    setSelectedGenres((prev) =>
      prev.includes(genreId)
        ? prev.filter((id) => id !== genreId)
        : [...prev, genreId]
    );
  }

  return (
    <fieldset className="genre-filter">
      <legend>Filter by genre</legend>

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
    </fieldset>
  );
}
