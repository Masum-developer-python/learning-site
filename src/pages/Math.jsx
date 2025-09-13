import React, { useState, useRef } from "react";

import AE from "../components/math/AlgebraicExpression";

export default function Math({ selectedColor }) {
  const mathTopics = {
    algebraicExpression: "বীজগাণিতিক রাশি",
    // realNumber: "বাস্তব সংখ্যা",
    // setFunction: "সেট ও ফাংশন",
    // exponentLogarithm: "সূচক ও লগারিদম (সূচকীয় ও লগারিদমিক ফাংশনসহ)",
    // equation: "সমীকরণ (এক চলক ও দুই চলক বিশিষ্ট)",
    // seriesSequence: "সসীম ধারা ও অসীম ধারা",
    // inequality: "অসমতা",
    // ratioProportion: "অনুপাত ও সমানুপাত (বীজগাণিতিক অনুপাত-সমানুপাতসহ)",
    // binomialExpansion: "দ্বিপদী বিস্তৃতি (Binomial expansion)",
    // areaTheoremProblem: "ক্ষেত্রফল সম্পর্কিত উপপাদ্য ও সমস্যা",
    // mensuration: "পরিচিতি",
    // coordinateGeometry: "স্থানাঙ্ক জ্যামিতি",
    // practicalGeometry: "ব্যবহারিক/প্রয়োগমূলক জ্যামিতি",
    // lineAngleTriangle: "রেখা, কোণ ও ত্রিভুজ",
    // circle: "বৃত্ত",
    // geometricConstruction: "জ্যামিতিক আকারণ",
    // solidGeometry: "ঘন জ্যামিতি",
    // trigonometry: "ত্রিকোণমিতি (অনুপাত, দূরত্ব ও উচ্চতাসহ)",
    // vector: "ভেক্টর (সমতলীয় ও ত্রিমাত্রিক ভেক্টর)",
    // similaritySymmetry: "অনুপাত, সদৃশতা ও প্রতিসমতা",
    // statistics: "পরিসংখ্যান",
    // probability: "সম্ভাবনা",
  };
  const mathTopicsList = Object.entries(mathTopics).map(([key, value]) => (
    <option key={key} value={key} className={`text-center w-full ${selectedColor.textColor} ${selectedColor.backgroundColor}`}>
      {value}
    </option>
  ));
  const handleChange = (event) => {
    const selectedTopic = event.target.value;
    setUnit(selectedTopic);
  };
  const [unit, setUnit] = useState("");
  return (
    <div className="mx-auto w-[97%]">
      <select
        className={`p-2 print:hidden border rounded w-full ${selectedColor.textColor} ${selectedColor.backgroundColor}`}
        onChange={handleChange}
      >
        <option value="cover" selected className={`text-center ${selectedColor.textColor} ${selectedColor.backgroundColor}`}>
          অধ্যায় নির্বাচন করুন
        </option>
        {mathTopicsList}
      </select>

      {unit === "algebraicExpression" && (
        <div className="w-full">
          <AE  selectedColor={selectedColor}/>
        </div>
      )}

      {/* Add more components for other topics as needed */}
    </div>
  );
}


