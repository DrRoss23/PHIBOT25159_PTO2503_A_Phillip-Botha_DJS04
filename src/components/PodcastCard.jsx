import { formatDate } from "../utils/formatDate";

/**
 * PodcastCard
 * Displays a single podcast preview.
 *
 * @param {Object} props
 * @param {Object} props.podcast Podcast data object
 */
export default function PodcastCard({ podcast }) {
  return (
    <article className="podcast-card">
      <img src={podcast.image} alt={podcast.title} loading="lazy" />

      <div className="podcast-card__content">
        <h3>{podcast.title}</h3>
        <p>Last updated: {formatDate(podcast.updated)}</p>
      </div>
    </article>
  );
}
