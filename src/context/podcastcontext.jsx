import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { fetchPodcasts } from "../api/fetchPodcasts";
import { GENRES } from "../data/genres";

/**
 * PodcastContext
 * Centralised state container for podcast data and UI state.
 */
const PodcastContext = createContext(null);

/**
 * Custom hook for accessing PodcastContext safely.
 *
 * @returns {Object} Podcast context value
 * @throws {Error} If used outside PodcastProvider
 */
export function usePodcastContext() {
  const context = useContext(PodcastContext);
  if (!context) {
    throw new Error("usePodcastContext must be used within a PodcastProvider");
  }
  return context;
}

/**
 * PodcastProvider
 * Fetches podcast data and manages search, sorting,
 * filtering, and load-more pagination state.
 *
 * @param {Object} props
 * @param {React.ReactNode} props.children
 */
export function PodcastProvider({ children }) {
  /** Raw podcast data */
  const [podcasts, setPodcasts] = useState([]);

  /** Loading and error state */
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  /** UI state */
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [sortOption, setSortOption] = useState("newest");

  /** Load-more pagination state */
  const ITEMS_PER_LOAD = 4;
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_LOAD);

  /**
   * Fetch podcasts on initial mount.
   */
  useEffect(() => {
    async function loadPodcasts() {
      try {
        const data = await fetchPodcasts();
        setPodcasts(data);
      } catch {
        setError("Failed to load podcasts");
      } finally {
        setLoading(false);
      }
    }

    loadPodcasts();
  }, []);

  /**
   * Apply search filtering.
   */
  const searchedPodcasts = useMemo(() => {
    if (!searchTerm) return podcasts;
    return podcasts.filter((p) =>
      p.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [podcasts, searchTerm]);

  /**
   * Apply genre filtering.
   */
  const filteredPodcasts = useMemo(() => {
    if (selectedGenres.length === 0) return searchedPodcasts;

    return searchedPodcasts.filter((p) =>
      p.genres.some((id) => selectedGenres.includes(id))
    );
  }, [searchedPodcasts, selectedGenres]);

  /**
   * Apply sorting.
   */
  const sortedPodcasts = useMemo(() => {
    const list = [...filteredPodcasts];

    switch (sortOption) {
      case "az":
        return list.sort((a, b) => a.title.localeCompare(b.title));
      case "za":
        return list.sort((a, b) => b.title.localeCompare(a.title));
      default:
        return list.sort((a, b) => new Date(b.updated) - new Date(a.updated));
    }
  }, [filteredPodcasts, sortOption]);

  /**
   * Slice visible podcasts for load-more pagination.
   */
  const visiblePodcasts = useMemo(() => {
    return sortedPodcasts.slice(0, visibleCount);
  }, [sortedPodcasts, visibleCount]);

  /**
   * Reset pagination when filter/search/sort changes.
   */
  useEffect(() => {
    setVisibleCount(ITEMS_PER_LOAD);
  }, [searchTerm, selectedGenres, sortOption]);

  const value = {
    podcasts,
    loading,
    error,

    searchTerm,
    setSearchTerm,
    selectedGenres,
    setSelectedGenres,
    sortOption,
    setSortOption,

    visiblePodcasts,
    visibleCount,
    setVisibleCount,
    totalCount: sortedPodcasts.length,

    itemsPerLoad: ITEMS_PER_LOAD,
    genres: GENRES,
  };

  return (
    <PodcastContext.Provider value={value}>{children}</PodcastContext.Provider>
  );
}
