import React, { useEffect, useState } from "react";
import "./App.css";
import Firework from "./Firework.js";

function App() {
  const [firework, setFireWork] = useState(null);
  useEffect(() => {
    const localFirework = new Firework();
    setFireWork(localFirework);
  }, []);

  const handleClick = () => {
    if (firework) {
      firework.onClick();
    }
  };

  return (
    <div id="dir" onClick={handleClick}>
      {" "}
      Click Anywhere For More{" "}
    </div>
  );
}

export default App;
