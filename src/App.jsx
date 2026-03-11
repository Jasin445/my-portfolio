import { createContext, useState } from "react";
import { useLocation } from "react-router-dom";
import Routes from "./Routes";
import CinematicCurtain from "./components/CinematicCurtain";

const ROUTES_WITHOUT_CURTAIN = [
  "/projects",
  "/about-professional",
  "/contact-connect",
  "/technical-blog",
];

export const IntroContext = createContext(false);


function App() {
  const { pathname } = useLocation();

  const [introDone, setIntroDone] = useState(
    sessionStorage.getItem("introSeen") === "true"
  );
  const [startHero, setStartHero] = useState(false)

  const showIntro =
    !introDone && !ROUTES_WITHOUT_CURTAIN.includes(pathname);

  const handleFinish = () => {
    sessionStorage.setItem("introSeen", "true");
    setIntroDone(true);
  };

  const handleStart = () => {
    setStartHero(true);
  };

  return (
        <IntroContext.Provider value={startHero}>

      {showIntro && <CinematicCurtain onStart={handleStart} onFinish={handleFinish} />}

      <Routes />
        </IntroContext.Provider>

  );
}

export default App;