console.log("ColorSelector.jsx");

import React from "react";

function ColorSelector({ selectedTheme, selectedColor, setSelectedColor }) {
  const handleColorChange = (e) => {
    const color = JSON.parse(e.target.value); // Parse the selected color object from the dropdown.
    setSelectedColor(color);
  };

  return (
    <>
      {/* <label className=" mb-2 font-semibold">Select Color Combination:</label> */}
      <label className="font-bangla w-8 md:w-12 lg:w-16 mb-2 font-small">
        Select Color :{" "}
      </label>
      <select
        value={JSON.stringify(selectedColor)}
        onChange={handleColorChange}
        className={`w-12 md:w-16 lg:w-24 p-1 md:p-2 border-4 hover:border-green-300 rounded font-bangla ${selectedColor.textColor} ${selectedColor.backgroundColor}`}
      >
        {selectedTheme.combinations.map((combo, index) => (
          <option
            key={index}
            className={`${combo.textColor} ${combo.backgroundColor}`}
            value={JSON.stringify(combo)}
          >
            {combo.description}
          </option>
        ))}
      </select>
    </>
  );
}

export default ColorSelector;
