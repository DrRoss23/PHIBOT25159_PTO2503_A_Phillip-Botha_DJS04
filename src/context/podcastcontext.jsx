import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { fetchPodcasts } from "../api/fetchPodcasts";

/**
 * @typedef {Object} Podcast
 * @property {string} id
 * @property {string} title
 * @property {number[]} genres
 * @property {string} updated
 */

/**
 * PodcastContext provides all podcast data and UI state
 * (search, filter, sort, pagination) in a single source of truth.
 */
const PodcastContext = createContext(null);

/**
 * Hook to access PodcastContext safely.
 * @returns {Object}
 */
export function usePodcastContext() {
  const context = useContext(PodcastContext);
  if (!context) {
    throw new Error("usePodcastContext must be used inside PodcastProvider");
  }
  return context;
}

/**
 * PodcastProvider
 * Fetches podcast data and manages all UI-related state.
 */
export function PodcastProvider({ children }) {
  /** -----------------------------
   * RAW DATA
   * ----------------------------- */
  const [podcasts, setPodcasts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  /** -----------------------------
   * UI STATE
   * ----------------------------- */
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [sortOption, setSortOption] = useState("newest"); // newest | az | za
  const [currentPage, setCurrentPage] = useState(1);

  const ITEMS_PER_PAGE = 12;

  /** -----------------------------
   * FETCH DATA
   * ----------------------------- */
  useEffect(() => {
    async function loadPodcasts() {
      try {
        const data = await fetchPodcasts();
        setPodcasts(data);
      } catch (err) {
        setError("Failed to load podcasts");
      } finally {
        setLoading(false);
      }
    }

    loadPodcasts();
  }, []);

  /** -----------------------------
   * DERIVED DATA PIPELINE
   * Order matters: search → filter → sort → paginate
   * ----------------------------- */

  const searchedPodcasts = useMemo(() => {
    if (!searchTerm) return podcasts;

    return podcasts.filter((podcast) =>
      podcast.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [podcasts, searchTerm]);

  const filteredPodcasts = useMemo(() => {
    if (selectedGenres.length === 0) return searchedPodcasts;

    return searchedPodcasts.filter((podcast) =>
      podcast.genres.some((genreId) => selectedGenres.includes(genreId))
    );
  }, [searchedPodcasts, selectedGenres]);

  const sortedPodcasts = useMemo(() => {
    const sorted = [...filteredPodcasts];

    switch (sortOption) {
      case "az":
        return sorted.sort((a, b) => a.title.localeCompare(b.title));
      case "za":
        return sorted.sort((a, b) => b.title.localeCompare(a.title));
      case "newest":
      default:
        return sorted.sort((a, b) => new Date(b.updated) - new Date(a.updated));
    }
  }, [filteredPodcasts, sortOption]);

  const totalPages = Math.ceil(sortedPodcasts.length / ITEMS_PER_PAGE);

  const paginatedPodcasts = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    const end = start + ITEMS_PER_PAGE;
    return sortedPodcasts.slice(start, end);
  }, [sortedPodcasts, currentPage]);

  /** -----------------------------
   * RESET RULES
   * Search / filter changes reset page to 1
   * ----------------------------- */
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedGenres, sortOption]);

  /** -----------------------------
   * CONTEXT VALUE
   * ----------------------------- */
  const value = {
    // data
    podcasts,
    loading,
    error,

    // ui state
    searchTerm,
    setSearchTerm,
    selectedGenres,
    setSelectedGenres,
    sortOption,
    setSortOption,
    currentPage,
    setCurrentPage,

    // derived
    paginatedPodcasts,
    totalPages,
  };

  return (
    <PodcastContext.Provider value={value}>{children}</PodcastContext.Provider>
  );
}
