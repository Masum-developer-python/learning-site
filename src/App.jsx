import { useState, useEffect, useRef } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { alphabetColorCombinations } from "./data";
import { useReactToPrint } from "react-to-print";

import Nav from "./components/Nav";
import ICT from "./pages/ICT";
import Math from "./pages/Math";
import Whiteboard from "./components/Whiteboard";
import OverlayWhiteboard from "./components/OverlayWhiteboard";
import Blog from "./pages/Blog";

function App() {
  console.log("App.jsx");
  const [whiteboardOpen, setWhiteboardOpen] = useState(false);
  const outerRef = useRef(null);
  const whiteboardContainerRef = useRef(null);
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

  useEffect(() => {
    if (outerRef.current && whiteboardContainerRef.current) {
      const scrollHeight = outerRef.current.scrollHeight;
      whiteboardContainerRef.current.style.height = `${scrollHeight}px`;
      console.log("Set whiteboard container height to:", scrollHeight);
    }
  }, [whiteboardOpen]); // Run when whiteboard is opened
  const [isPrinting, setIsPrinting] = useState(false);
  const handlePrint = async () => {
    setIsPrinting(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    console.log("Printing started");
    print();
    setIsPrinting(false);
    console.log("Printing finished");
  };
  const print = useReactToPrint({
    // content: () => sectionRef.current,
    contentRef: outerRef,
    documentTitle: "RARe Academy - ",
  });

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
        <img
          src="/images/print_btn.png"
          className="w-10 h-10 fixed top-2 right-2 z-50 cursor-pointer"
          onClick={handlePrint}
          width="24"
          title="প্রিন্ট"
          alt="print_btn"
        ></img>
        <div
          ref={outerRef}
          className="flex-1 absolute left-16 md:left-24 lg:left-40 top-0 bottom-12 right-0
          before:absolute before:content-[''] before:inset-0 before:bg-[url('/images/logo.png')] 
          before:bg-[length:90%_auto] before:bg-repeat-y before:opacity-100 before:-z-10 
           print:left-0 print:text-2xl print:before:bg-[length:80%_auto] print:before:mt-10
          print:before:left-16 print:before:bg-no-repeat print:before:bg-center print:before:fixed"
        >
          <Router>
            <main
              className={`${selectedColor.backgroundColor} ${selectedColor.textColor} flex w-[calc(100%-0px)] min-h-screen pb-16 sm:pb-4 md:pb-4`}
            >
              {whiteboardOpen && (
                <div
                  ref={whiteboardContainerRef}
                  className="w-[calc(100%-10px)] absolute z-10 pb-16 sm:pb-4 md:pb-4 pr-6"
                >
                  <Whiteboard
                    whiteboardOpen={whiteboardOpen}
                    height={`${outerRef.current.scrollHeight}px`}
                  />
                </div>
              )}
              <Routes>
                <Route
                  path="/"
                  element={<Blog selectedColor={selectedColor} />}
                />
                <Route
                  path="/ict"
                  element={<ICT selectedColor={selectedColor} />}
                />
                <Route
                  path="/math"
                  element={<Math selectedColor={selectedColor} />}
                />
                <Route path="/whiteboard" element={<Whiteboard />} />
              </Routes>
            </main>
          </Router>
        </div>
      </div>
      <footer
        className="h-auto w-[calc(100%-60px)] fixed bottom-0 left-0 right-0 mx-auto px-12 flex items-center justify-center text-center font-sans
        text-[#555] border-t border-[#eaeaea] text-base rounded-lg block z-10"
      >
        তত্ত্বাবধায়ক :&nbsp;
        <strong>
          <a href="https://www.facebook.com/rahmatullah.masum/"> মাসুম </a> @{" "}
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
