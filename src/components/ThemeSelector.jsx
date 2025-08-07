console.log('ThemeSelector.jsx');

import React from "react";

function ThemeSelector({ selectedTheme, setSelectedTheme, alphabetColorCombinations, setSelectedColor, selectedColor }) {
  const handleThemeChange = (e) => {
    const theme = alphabetColorCombinations.find((t) => t.theme === e.target.value);
    setSelectedTheme(theme);
    setSelectedColor(theme.combinations[0]); // Set the first color combination of the selected theme.
  };

  return (
    <>
      <label className="font-bangla w-8 md:w-12 lg:w-16 mb-2 font-xs md:font-small">Select Theme : </label>
      <select
        value={selectedTheme.theme}
        onChange={handleThemeChange}
        className={`w-12 md:w-16 lg:w-24 p-1 md:p-2 border-4 hover:border-green-300 rounded font-bangla ${selectedColor.textColor} ${selectedColor.backgroundColor}`}
      >
        {alphabetColorCombinations.map((theme) => (
          <option key={theme.theme} value={theme.theme}>
            {theme.theme}
          </option>
        ))}
      </select>
      <br></br>
    </>
  );
}

export default ThemeSelector;
