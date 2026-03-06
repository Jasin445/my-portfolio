import { useEffect, useState } from "react";

const useTypewriter = (text, speed = 60) => {
  const [displayed, setDisplayed] = useState("");

  useEffect(() => {
    let index = 0;

    const interval = setInterval(() => {
      setDisplayed(text.slice(0, index + 1));
      index++;

      if (index === text.length) clearInterval(interval);
    }, speed);

    return () => clearInterval(interval);
  }, [text, speed]);

  return displayed;
};

export default useTypewriter;