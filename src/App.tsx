// import { useEffect, useState } from "react";
// import { EpicFooter } from "./components/Footer";
// import { EpicHeader } from "./components/Header";
// import Home from "./pages/Home";

// function App() {
//   const [currentSection, setCurrentSection] = useState(0);
//   const [isScrolling, setIsScrolling] = useState(false); // chặn spam cuộn

//   const sections = [
//     { id: "header", ref: 0 },
//     { id: "home", ref: 1 },
//     { id: "footer", ref: 2 },
//   ];

//   useEffect(() => {
//     const handleWheel = (e: WheelEvent) => {
//       e.preventDefault(); // chặn cuộn mặc định
//       if (isScrolling) return; // đang cuộn thì bỏ qua

//       setIsScrolling(true);
//       setTimeout(() => setIsScrolling(false), 800); // chờ 0.8s mới cho cuộn tiếp

//       if (e.deltaY > 0) {
//         // Scroll xuống
//         setCurrentSection((prev) => Math.min(prev + 1, sections.length - 1));
//       } else {
//         // Scroll lên
//         setCurrentSection((prev) => Math.max(prev - 1, 0));
//       }
//     };

//     window.addEventListener("wheel", handleWheel, { passive: false });
//     return () => window.removeEventListener("wheel", handleWheel);
//   }, [isScrolling]);

//   useEffect(() => {
//     window.scrollTo({
//       top: window.innerHeight * currentSection,
//       behavior: "smooth",
//     });
//   }, [currentSection]);

//   return (
//     <div className="overflow-hidden">
//       <section className="h-screen" id="header">
//         <EpicHeader />
//       </section>
//       <section className="h-screen" id="home">
//         <Home />
//       </section>
//       <section className="h-screen" id="footer">
//         <EpicFooter />
//       </section>
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
  const [isScrolling, setIsScrolling] = useState(false);

  const sections = [
    { id: "header", ref: 0 },
    { id: "home", ref: 1 },
    { id: "footer", ref: 2 },
  ];

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      if (isScrolling) return;

      setIsScrolling(true);
      const timeout = setTimeout(() => setIsScrolling(false), 800);

      if (e.deltaY > 0) {
        setCurrentSection((prev) => Math.min(prev + 1, sections.length - 1));
      } else {
        setCurrentSection((prev) => Math.max(prev - 1, 0));
      }

      // clearTimeout khi component unmount
      return () => clearTimeout(timeout);
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    return () => window.removeEventListener("wheel", handleWheel);
  }, [isScrolling]);

  // 🔹 Khi quay lại tab, reset cuộn
  useEffect(() => {
    const handleVisibility = () => {
      if (!document.hidden) {
        // Tab được focus trở lại
        setIsScrolling(false);
      }
    };

    document.addEventListener("visibilitychange", handleVisibility);
    return () =>
      document.removeEventListener("visibilitychange", handleVisibility);
  }, []);

  // 🔹 Cuộn mượt đến section tương ứng
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
