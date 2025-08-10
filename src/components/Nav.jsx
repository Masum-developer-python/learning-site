import Submenu from "./menuSubmenu";
import { Menu } from "lucide-react";

function Nav({
  selectedColor,
  selectedTheme,
  setSelectedTheme,
  setSelectedColor,
  alphabetColorCombinations,
  selectedReciter,
  setSelectedReciter,
  reciterList,
  setWhiteboardOpen,
  whiteboardOpen = false, // Default to false if not provided
}) {
  console.log("Nav.jsx");
  return (
    <>
      
      {/* <div
        className={`${selectedColor.backgroundColor} ${selectedColor.textColor} w-32  p-4 h-[50px] 
         mt-16`}
      ></div> */}
      {/* Navbar */}
      <nav
        id="vertical-menu"
        className={`${selectedColor.backgroundColor} ${selectedColor.textColor} 
        w-20 lg:w-32 pl-0 lg:pl-1 h-full flex flex-col justify-between items-start 
        fixed left-1 lg:left-6 h-[calc(100vh-5px)] overflow-y-scroll mt-0`}
      >
        <Submenu
          selectedTheme={selectedTheme}
          selectedColor={selectedColor}
          setSelectedTheme={setSelectedTheme}
          setSelectedColor={setSelectedColor}
          alphabetColorCombinations={alphabetColorCombinations}
          selectedReciter={selectedReciter}
          setSelectedReciter={setSelectedReciter}
          reciterList={reciterList}
          whiteboardOpen={whiteboardOpen}
          setWhiteboardOpen={setWhiteboardOpen}
        />
      </nav>
    </>
  );
}
export default Nav;
