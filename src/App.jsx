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
import CoachingAccountingSystem from "./pages/CoachingAccountingSystem";
import ClassRoutineGenerator from "./pages/ClassRoutineGenerator";
import UsePageTitle from "./components/TitleManager";

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
    documentTitle: `RARe Academy - ${new Date().toLocaleDateString()}`, // Dynamic title with current date"`,
  });

  // const location = useLocation();

  // if (location.pathname === "/") {
  //   title = "Blog - RARe Academy";
  // } else if (location.pathname === "/ict") {
  //   title = "ICT - RARe Academy";
  // } else if (location.pathname === "/math") {
  //   title = "Math - RARe Academy";
  // } else if (location.pathname === "/hisab") {
  //   title = "Coaching Accounting System - RARe Academy";
  // } else if (location.pathname === "/routine") {
  //   title = "Class Routine Generator - RARe Academy";
  // } else if (location.pathname === "/whiteboard") {
  //   title = "Whiteboard - RARe Academy";
  // } else {
  //   title = "RARe Academy";
  // }

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
          className="flex-1 absolute left-20 md:left-24 lg:left-40 top-0 bottom-12 right-0
          before:fixed before:left-20 before:md:left-24 before:lg:left-40 before:content-[''] before:inset-0 
          before:bg-[url('/images/logo.png')] 
          before:bg-[length:auto_100%] before:bg-center before:bg-repeat-y before:opacity-60 before:-z-10 
          print:left-0 print:right-0 print:text-2xl print:before:bg-[length:80%_auto] print:before:mt-10 
          print:before:bg-no-repeat print:before:bg-center print:before:fixed print:before:opacity-0
          print:p-8 print:before:content-[''] 
          print:before:text-[60px] print:before:text-gray-900
          print:before:font-bold print:before:tracking-widest print:before:text-center
          print:before:bg-[length:auto_60%]

          after:fixed  print:after:block after:content-[''] after:inset-0 
          after:bg-[url('/images/A4newpage.png')] 
          after:opacity-0 after:-z-10 print:after:-z-10
          after:bg-[length:100%_auto] after:bg-[position:calc(0%)_calc(0%)]
          after:bg-no-repeat
          after:bg-no-repeat print:after:opacity-100
          print:after:content-[''] 
          print:after:tracking-widest
          
          "
        >
          <style>
{`
  @media print {
    @page {
      size: A4 portrait;
      margin-top: 0mm;
      margin-bottom: 0mm;
      margin-left: 0mm;
      margin-right: 0mm;
     
    }

    // body::before {
    //   content: "Rufaidah,Ataullah,Rukaiyah --- educational Academy 2025";
    //   position: fixed;
    //   top: 5px;
    //   bottom: 5px;
    //   left: 0mm;
    //   width: 10mm;
    //   height: 100%;
    //   writing-mode: vertical-rl;
    //   text-orientation: mixed;
    //   transform: rotate(-180deg);

    //   font-family: Algerian;
    //   font-size: 16px;
    //   font-weight: 600;
    //   letter-spacing: 10px;

    //   color: rgba(0,0,0,0.6);
    //   opacity: 0.4;

    //   display: flex;
    //   align-items: center;

    //   z-index: 1;

    //   -webkit-print-color-adjust: exact !important;
    //   print-color-adjust: exact !important;
     }

    // body::after {
    //   content: "";
    //   position: fixed;
    //   top: 0;
    //   left: 0;
    //   height: 150px;
    //   width: 100%;

    //   background-image: url('images/header.png');
    //   background-repeat: no-repeat;
    //   background-size: contain;
    //   background-position: top center;

    //   z-index: -1;

    //   -webkit-print-color-adjust: exact !important;
    //   print-color-adjust: exact !important;
    // }
  }
`}
</style>

          <img
            src="/images/Cover.svg"
            className=" h-[98%] hidden mx-auto mr-0 print:block break-after-page"
            alt="logo"
          />
          <Router>
            <UsePageTitle />
            <main
              className={` ${selectedColor.textColor} ${selectedColor.backgroundColor}  print:bg-transparent flex w-[calc(100%)] min-h-screen 
              pb-16 sm:pb-4 md:pb-4 print:pb-0
              left-10

              before:content-[''] before:fixed
              before:w-[100%] before:h-[25mm] before:top-0 before:left-0
              before:pointer-events-none before:select-none before:hidden 
              print:before:block print:before:opacity-10

              
              after:content-[''] after:fixed
              after:w-full after:bottom-0 after:left-0 after:h-[25mm]
              after:pointer-events-none after:select-none
              print:after:block 
              `}
            >
              {whiteboardOpen && (
                <div
                  ref={whiteboardContainerRef}
                  className="w-[calc(100%-10px)] absolute z-10 pb-16 sm:pb-4 md:pb-4 pr-6"
                >
                  <Whiteboard
                    whiteboardOpen={whiteboardOpen}
                    height={`${outerRef.current.scrollHeight}px`}
                    selectedColor=""
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
                <Route
                  path="/whiteboard"
                  element={
                    <Whiteboard
                      selectedColor={selectedColor}
                      height={`1000px`}
                    />
                  }
                />
                <Route path="/hisab" element={<CoachingAccountingSystem />} />
                <Route path="/routine" element={<ClassRoutineGenerator />} />
              </Routes>
            </main>
          </Router>
          {/* <img
            src="/images/A4page.png"
            className=" h-[100%] print:fixed print:left-0 hidden w-[100%] print:z-5 mr-0 print:block break-after-page"
            alt="logo"
          /> */}
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
