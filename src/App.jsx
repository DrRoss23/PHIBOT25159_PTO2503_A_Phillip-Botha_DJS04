import { PodcastProvider } from "./context/PodcastContext";
import Controls from "./components/Controls";
import PodcastGrid from "./components/PodcastGrid";

/**
 * App
 * Root application component.
 * Wraps the app in PodcastProvider and renders
 * all high-level UI sections.
 */
export default function App() {
  return (
    <PodcastProvider>
      <Controls />
      <PodcastGrid />
    </PodcastProvider>
  );
}
