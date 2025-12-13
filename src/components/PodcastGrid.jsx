import PodcastCard from "./PodcastCard";
import { usePodcastContext } from "../context/PodcastContext";

/**
 * Renders podcast cards and load-more pagination.
 */
export default function PodcastGrid() {
  const {
    visiblePodcasts,
    visibleCount,
    setVisibleCount,
    totalCount,
    itemsPerLoad,
  } = usePodcastContext();

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
