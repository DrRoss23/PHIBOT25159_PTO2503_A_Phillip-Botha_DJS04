import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { fetchPodcasts } from "../api/fetchPodcasts";
import { GENRES } from "../data/genres";

/**
 * PodcastContext provides all podcast data and UI state
 * (search, filter, sort, pagination) in a single source of truth.
 */
const PodcastContext = createContext(null);

/**
 * Hook to safely consume PodcastContext.
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
 * Fetches podcast data and manages all UI-related state.
 */
export function PodcastProvider({ children }) {
  /* =========================
     Raw data
     ========================= */

  const [podcasts, setPodcasts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  /* =========================
     UI state
     ========================= */

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [sortOption, setSortOption] = useState("newest"); // newest | az | za
  const [currentPage, setCurrentPage] = useState(1);

  const ITEMS_PER_PAGE = 12;

  /* =========================
     Fetch podcasts
     ========================= */

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

  /* =========================
     Derived data pipeline
     Order: search → filter → sort → paginate
     ========================= */

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
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return sortedPodcasts.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [sortedPodcasts, currentPage]);

  /* =========================
     Reset pagination when filters change
     ========================= */

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedGenres, sortOption]);

  /* =========================
     Context value
     ========================= */

  const value = {
    // raw data
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

    // derived data
    paginatedPodcasts,
    totalPages,

    // static data
    genres: GENRES,
  };

  return (
    <PodcastContext.Provider value={value}>{children}</PodcastContext.Provider>
  );
}
