import { PodcastProvider } from "./context/PodcastContext";
import PodcastGrid from "./components/PodcastGrid";

export default function App() {
  return (
    <PodcastProvider>
      <PodcastGrid />
    </PodcastProvider>
  );
}
