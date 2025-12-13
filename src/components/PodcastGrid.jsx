import { usePodcastContext } from "../context/PodcastContext";
import PodcastCard from "./PodcastCard";

/**
 * Renders a grid of podcast cards.
 * Data is fully prepared by context.
 */
export default function PodcastGrid() {
  const { paginatedPodcasts, loading, error } = usePodcastContext();

  if (loading) return <p>Loading podcasts…</p>;
  if (error) return <p>{error}</p>;
  if (paginatedPodcasts.length === 0) {
    return <p>No podcasts found.</p>;
  }

  return (
    <section className="podcast-grid">
      {paginatedPodcasts.map((podcast) => (
        <PodcastCard key={podcast.id} podcast={podcast} />
      ))}
    </section>
  );
}
