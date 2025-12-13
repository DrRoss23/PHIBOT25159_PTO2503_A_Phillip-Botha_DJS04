import { formatDate } from "../utils/formatDate";

/**
 * Displays a single podcast preview card.
 * Pure presentational component.
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
