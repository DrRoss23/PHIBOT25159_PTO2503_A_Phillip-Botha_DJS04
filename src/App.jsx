import { PodcastProvider } from "./context/PodcastContext";
import Controls from "./components/Controls";
import PodcastGrid from "./components/PodcastGrid";

export default function App() {
  return (
    <PodcastProvider>
      <Controls />
      <PodcastGrid />
    </PodcastProvider>
  );
}
