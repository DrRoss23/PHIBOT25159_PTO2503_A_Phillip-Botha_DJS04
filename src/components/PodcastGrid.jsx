import PodcastCard from "./PodcastCard";
import { usePodcastContext } from "../context/PodcastContext";

/**
 * PodcastGrid
 * Renders visible podcast cards and handles
 * "Load more" pagination.
 */
export default function PodcastGrid() {
  const {
    visiblePodcasts,
    visibleCount,
    setVisibleCount,
    totalCount,
    itemsPerLoad,
    loading,
    error,
  } = usePodcastContext();

  if (loading) return <p>Loading podcasts…</p>;
  if (error) return <p>{error}</p>;

  return (
    <>
      <section className="podcast-grid">
        {visiblePodcasts.map((podcast) => (
          <PodcastCard key={podcast.id} podcast={podcast} />
        ))}
      </section>

      {visibleCount < totalCount && (
        <div className="load-more-wrapper">
          <button
            className="load-more-btn"
            onClick={() => setVisibleCount((prev) => prev + itemsPerLoad)}
          >
            Load more
          </button>
        </div>
      )}
    </>
  );
}
