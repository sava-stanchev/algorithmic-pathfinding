import "./App.css";
import { useState, useEffect } from "react";
import Visualizer from "./Visualizer/Visualizer";
import MobileView from "./MobileView/MobileView";

const App = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);

  const handleResize = () => {
    if (window.innerWidth < 1024) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
  });

  return (
    <div className="App">
      {!isMobile ? <Visualizer></Visualizer> : <MobileView></MobileView>}
    </div>
  );
};

export default App;
