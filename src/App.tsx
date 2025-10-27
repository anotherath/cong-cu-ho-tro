// import Home from "./pages/Home";

// function App() {
//   return (
//     <div>
//       <Home />
//     </div>
//   );
// }

// export default App;

import { useEffect, useState } from "react";
import { EpicFooter } from "./components/Footer";
import { EpicHeader } from "./components/Header";
import Home from "./pages/Home";

function App() {
  const [currentSection, setCurrentSection] = useState(0);

  const sections = [
    { id: "header", ref: 0 },
    { id: "home", ref: 1 },
    { id: "footer", ref: 2 },
  ];

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault(); // chặn cuộn mặc định
      if (e.deltaY > 0) {
        // Scroll xuống
        setCurrentSection((prev) => Math.min(prev + 1, sections.length - 1));
      } else {
        // Scroll lên
        setCurrentSection((prev) => Math.max(prev - 1, 0));
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    return () => window.removeEventListener("wheel", handleWheel);
  }, []);

  useEffect(() => {
    window.scrollTo({
      top: window.innerHeight * currentSection,
      behavior: "smooth",
    });
  }, [currentSection]);

  return (
    <div className="overflow-hidden">
      <section className="h-screen" id="header">
        <EpicHeader />
      </section>
      <section className="h-screen" id="home">
        <Home />
      </section>
      <section className="h-screen" id="footer">
        <EpicFooter />
      </section>
    </div>
  );
}

export default App;
