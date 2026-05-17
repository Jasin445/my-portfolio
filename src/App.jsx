import { useSmoothScroll } from "./hooks/useSmoothScroll";
import Routes from "./Routes";

function App() {
  useSmoothScroll()
  return (
    <div>
      <Routes />
    </div>
  );
}

export default App;
