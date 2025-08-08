import { useState, useEffect, useRef } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {
  alphabetColorCombinations,
  arabicDiacritics,
  receiveDataFromDjango,
} from "./data";

import Nav from "./components/Nav";


import ICT from "./pages/ICT";
import Whiteboard from "./components/Whiteboard";
import OverlayWhiteboard from "./components/OverlayWhiteboard";
import Blog from "./pages/Blog";

function App() {
  console.log("App.jsx");
  console.log(arabicDiacritics.Harakat.diacritics[0].pages[0].column);
  const [arabicAlphabet, setArabicAlphabet] = useState([]);
  const [whiteboardOpen, setWhiteboardOpen] = useState(false);
  const outerRef = useRef(null);
  const whiteboardContainerRef = useRef(null);

  let rootAddress = localStorage.getItem("rootAddress");
  console.log(rootAddress);
  useEffect(() => {
    async function fetchData() {
      const data = await receiveDataFromDjango(
        rootAddress + "arabic-alphabets/"
      );
      setArabicAlphabet(data); // ✅ Update state with fetched data
    }
    fetchData();
  }, []);

  // Initialize state from localStorage or default values
  const [selectedTheme, setSelectedTheme] = useState(() => {
    const saved = localStorage.getItem("arabic-app-theme");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return alphabetColorCombinations[1];
      }
    }
    return alphabetColorCombinations[1];
  });
  const [selectedColor, setSelectedColor] = useState(() => {
    const saved = localStorage.getItem("arabic-app-color");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return selectedTheme.combinations[0];
      }
    }
    return selectedTheme.combinations[0];
  });

  // Save to localStorage when theme changes
  useEffect(() => {
    localStorage.setItem("arabic-app-theme", JSON.stringify(selectedTheme));
  }, [selectedTheme]);

  // Save to localStorage when color changes
  useEffect(() => {
    localStorage.setItem("arabic-app-color", JSON.stringify(selectedColor));
  }, [selectedColor]);

  const reciterList = [
    { name: "Shuraim", folder: "Shuraim" },
    // Add more reciterList as needed
  ];
  const [selectedReciter, setSelectedReciter] = useState(() => {
    const saved = localStorage.getItem("arabic-app-reciter");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return parsed?.folder ? parsed : reciterList[0];
      } catch {
        return reciterList[0];
      }
    }
    return reciterList[0];
  });

  // Save to localStorage on change
  useEffect(() => {
    localStorage.setItem("arabic-app-reciter", JSON.stringify(selectedReciter));
    console.log(selectedReciter);
  }, [selectedReciter]);

  useEffect(() => {
    if (outerRef.current && whiteboardContainerRef.current) {
      const scrollHeight = outerRef.current.scrollHeight;
      whiteboardContainerRef.current.style.height = `${scrollHeight}px`;
      console.log("Set whiteboard container height to:", scrollHeight);
    }
  }, [whiteboardOpen]); // Run when whiteboard is opened

  return (
    <div className="min-h-screen flex flex-col ">
      <div className="flex flex-1 w-[100%] h-full ">
        <Nav
          selectedColor={selectedColor}
          selectedTheme={selectedTheme}
          setSelectedTheme={setSelectedTheme}
          setSelectedColor={setSelectedColor}
          alphabetColorCombinations={alphabetColorCombinations}
          selectedReciter={selectedReciter}
          setSelectedReciter={setSelectedReciter}
          reciterList={reciterList}
          whiteboardOpen={whiteboardOpen}
          setWhiteboardOpen={setWhiteboardOpen}
        />

        <div
          ref={outerRef}
          className="flex-1 fixed left-16 md:left-32 lg:left-40 top-0 bottom-12 right-0 overflow-y-auto h-full"
        >
          {/* <OverlayWhiteboard /> */}
          <Router>
            <main className=" flex w-[calc(100%-10px)] pb-16 sm:pb-4 md:pb-4 ">
              {whiteboardOpen && (
                <div
                  ref={whiteboardContainerRef}
                  className="w-[calc(100%-10px)] absolute z-10 pb-16 sm:pb-4 md:pb-4 pr-6"
                >
                  <Whiteboard whiteboardOpen={whiteboardOpen} height={`${outerRef.current.scrollHeight}px`} />
                </div>
              )}
              <Routes>
                <Route path="/" element={<Blog  selectedColor={selectedColor} />} />
                <Route path="/ict" element={<ICT />} />
                <Route path="/whiteboard" element={<Whiteboard />} />
              </Routes>
            </main>
          </Router>
        </div>
      </div>
      <footer
        className="h-auto w-[calc(100%-60px)] mx-auto px-12 flex items-center justify-center text-center font-sans
        text-[#555] border-t border-[#eaeaea] text-base rounded-lg block z-10"
      >
         Developed by &nbsp;
        <strong>
          <a href="https://www.facebook.com/rahmatullah.masum/"> Masum </a> @{" "}
          <button title="Rufaidah" className="text-green-500">
            <em>R </em>
          </button>
          <button title="Ataullah" className="text-red-500">
            <em>A </em>
          </button>
          <button title="Rukaiyah" className="text-green-500">
            <em>R</em>
          </button>{" "}
          e Academy
        </strong>
      </footer>
    </div>
  );
}

export default App;
