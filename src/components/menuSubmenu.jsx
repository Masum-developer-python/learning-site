import React, { useState, useRef } from "react";
import ThemeSelector from "./ThemeSelector";
import ColorSelector from "./ColorSelector";
import { PencilRuler, X } from "lucide-react";

function Submenu({
  selectedTheme,
  selectedColor,
  setSelectedTheme,
  setSelectedColor,
  alphabetColorCombinations,
  whiteboardOpen = false,
  setWhiteboardOpen,
}) {
  const [openCategories, setOpenCategories] = useState({});
  const [openSubCategories, setOpenSubCategories] = useState({});

  const toggleCategory = (category) => {
    setOpenCategories((prev) => {
      const isCurrentlyOpen = prev[category];

      // If the clicked category is already open, close all
      if (isCurrentlyOpen) {
        return {};
      }

      // Otherwise, open only the clicked one
      return {
        [category]: true,
      };
    });
  };

  const toggleSubCategory = (subCategory) => {
    setOpenSubCategories((prev) => {
      const isCurrentlyOpen = prev[subCategory];

      // If the clicked category is already open, close all
      if (isCurrentlyOpen) {
        return {};
      }

      // Otherwise, open only the clicked one
      return {
        [subCategory]: true,
      };
    });
  };
  return (
    <ul
      className={`font-bangla w-16 md:w-20 lg:w-24 text-xs md:text-md lg:text-2xl relative h-full text-center whitespace-normal 
        ${selectedColor.backgroundColor} ${selectedColor.textColor}`}
    >
      <li key={"w1234"} className="text-xs">
        <hr />

        {/* Category Name */}
        <button
          onClick={() => {
            // Handle whiteboard button click
            setWhiteboardOpen((prev) => !prev);
          }}
          className="block px-1 py-2 rounded hover:bg-blue-700 focus:bg-red-200 transition duration-1000 mx-auto"
        >
          {whiteboardOpen ? (
            <X className="inline-block " />
          ) : (
            <PencilRuler className="inline-block " />
          )}
        </button>

        <hr />
      </li>
      <li key={"0"} className="">
        <hr />
        <br />
        <br />
        {/* Category Name */}
        <a
          className="block px-1 py-2 rounded hover:bg-blue-700 focus:bg-red-200 transition duration-1000"
          href={"/"}
        >
          Home
        </a>
        <br />
        <hr />
      </li>
      <li key={"z0"} className="">
        <hr />
        <br />
        <br />
        {/* Category Name */}
        <a
          className="block px-1 py-2 rounded hover:bg-blue-700 focus:bg-red-200 transition duration-1000"
          href={"https://growwithquran.xyz/"}
        >
          Quran
        </a>
        <br />
        <hr />
      </li>
      <li key={"1"} className="">
        <hr />
        <br />
        <br />
        {/* Category Name */}
        <a
          className="block px-1 py-2 rounded hover:bg-blue-700 focus:bg-red-200 transition duration-1000"
          href={"/ict"}
        >
          ICT
        </a>
        <br />
        <hr />
      </li>
      <li key={"2"} className="">
        <hr />
        <br />
        <br />
        {/* Category Name */}
        <a
          className="block px-1 py-2 rounded hover:bg-blue-700 focus:bg-red-200 transition duration-1000"
          href={"/math"}
        >
          Math
        </a>
        <br />
        <hr />
      </li>
      <li key={"3"} className="">
        <hr />
        <br />
        <br />
        {/* Category Name */}
        <a
          className="block px-1 py-2 rounded hover:bg-blue-700 focus:bg-red-200 transition duration-1000"
          href={"/physics"}
        >
          Physics
        </a>
        <br />
        <hr />
      </li>
      <li key={"4"} className="">
        <hr />
        <br />
        <br />
        {/* Category Name */}
        <a
          className="block px-1 py-2 rounded hover:bg-blue-700 focus:bg-red-200 transition duration-1000"
          href={"/chemistry"}
        >
          Chemistry
        </a>
        <br />
        <hr />
      </li>
      <li key={"w5"} className="">
        <hr />
        <br />
        <br />
        {/* Category Name */}
        <a
          className="block px-1 py-2 rounded hover:bg-blue-700 focus:bg-red-200 transition duration-1000"
          href={"/whiteboard"}
        >
          হোয়াইট বোর্ড
        </a>
        <br />
        <hr />
      </li>
      <li key={"1234567"}>
        <hr />
        <br />
        <br />
        <ThemeSelector
          selectedTheme={selectedTheme}
          selectedColor={selectedColor}
          setSelectedTheme={(newTheme) => {
            setSelectedTheme(newTheme);
            setSelectedColor(newTheme.combinations[2]); // Reset color when theme changes
          }}
          alphabetColorCombinations={alphabetColorCombinations}
        />
        <ColorSelector
          selectedTheme={selectedTheme}
          selectedColor={selectedColor}
          setSelectedColor={setSelectedColor}
        />
        <br />
        <br />
        <hr />
      </li>
    </ul>
  );
}

export default Submenu;
