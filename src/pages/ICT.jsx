import React, { useState } from "react";

import Unit1 from "../components/ict/unit1.jsx";
import Unit2 from "../components/ict/unit2.jsx";
import Unit3 from "../components/ict/unit3.jsx";
import Unit4 from "../components/ict/unit4.jsx";
import Unit5 from "../components/ict/unit5.jsx";
import Unit6 from "../components/ict/unit6.jsx";

const ICT = ({selectedColor}) => {
  const [unit, setUnit] = useState("");
  const ictUnits = [
    {
      name: "Introduction",
      value: "introduction",
      topics: ["What is ICT?", "History of ICT", "Importance of ICT"],
    },
    {
      name: "Networking",
      value: "networking",
      topics: ["Types of Networks", "Network Topologies", "Network Protocols"],
    },
    {
      name: "Number System",
      value: "numbersystem",
      topics: [
        "Binary System",
        "Decimal System",
        "Hexadecimal System",
        "Conversions",
      ],
    },
    {
      name: "Web Development",
      value: "web-development",
      topics: [
        "HTML Basics",
        "CSS Basics",
        "JavaScript Basics",
        "Responsive Design",
      ],
    },
    {
      name: "Programming",
      value: "programming",
      topics: ["Programming Languages", "Data Structures", "Algorithms"],
    },
    {
      name: "Databases",
      value: "databases",
      topics: ["Database Types", "SQL Basics", "NoSQL Basics"],
    },
  ];
  
  return (
    <div className="p-4 w-[100%]">

      <div className={`mt-4 ${selectedColor.textColor} `}>
        <select
          className={`mt-1 block w-full bg-white/10 border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500 ${selectedColor.textColor} `}
          onChange={(e) => {
            const Topic = e.target.value;
            console.log(` topic: ${Topic}`);
            setUnit(e.target.value);
            // Handle the  topic here
          }}
        >
          <option value="" className={`${selectedColor.textColor} `}>অধ্যায় নির্বাচন করুন</option>
          {ictUnits.map((unit) => (
            <option key={unit.value} value={unit.value} className={`${selectedColor.textColor} `}>
              {unit.name}
            </option>
          ))}
        </select>

        {/* //--------------------------------------------------------------------------------------------------- */}
        {unit === "introduction" && <Unit1 topic={unit} selectedColor={selectedColor} />}
        {unit === "networking" && <Unit2 topic={unit} selectedColor={selectedColor} />}
        {unit === "numbersystem" && <Unit3 topic={unit} selectedColor={selectedColor} />}
        {unit === "web-development" && <Unit4 topic={unit} selectedColor={selectedColor} />}
        {unit === "programming" && <Unit5 topic={unit} selectedColor={selectedColor} />}
        {unit === "databases" && <Unit6 topic={unit} selectedColor={selectedColor} />}
        
        
      </div>
    </div>
  );
};

export default ICT;
