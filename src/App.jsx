import { PodcastProvider, usePodcastContext } from "./context/podcastcontext";

function DebugViewer() {
  const { loading, error, paginatedPodcasts, totalPages } = usePodcastContext();

  if (loading) return <p>Loading podcasts…</p>;
  if (error) return <p>{error}</p>;

  return (
    <>
      <p>Visible podcasts: {paginatedPodcasts.length}</p>
      <p>Total pages: {totalPages}</p>
    </>
  );
}

export default function App() {
  return (
    <PodcastProvider>
      <DebugViewer />
    </PodcastProvider>
  );
}
