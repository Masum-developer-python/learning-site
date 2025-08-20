import React, { useState } from "react";
import AE from '../components/AlgebraicExpression';

export default function Math() {
  const mathTopics = {
    realNumber: "সাধারণ গণিত ১ম অধ্যায় - বাস্তব সংখ্যা",
    setFunction: "সাধারণ গণিত ২য় & উচ্চতর গণিত ১ম অধ্যায় - সেট ও ফাংশন",
    algebraicExpression: "সাধারণ গণিত ৩য় & উচ্চতর গণিত ২য় অধ্যায় - বীজগাণিতিক রাশি",
    exponentLogarithm: "সাধারণ গণিত ৪র্থ অধ্যায়  & উচ্চতর গণিত ৯ম অধ্যায় - সূচক ও লগারিদম (সূচকীয় ও লগারিদমিক ফাংশনসহ)",
    equation: "সাধারণ গণিত ৫ম অধ্যায় & উচ্চতর গণিত ৫ম অধ্যায় - সমীকরণ (এক চলক ও দুই চলক বিশিষ্ট)",
    seriesSequence: "সাধারণ গণিত ১৩শ অধ্যায়  & উচ্চতর গণিত ৭ম অধ্যায় - সসীম ধারা ও অসীম ধারা",
    // inequality: "সাধারণ গণিত ১ম অধ্যায় - অসমতা",
    // ratioProportion: "সাধারণ গণিত ১ম অধ্যায় - অনুপাত ও সমানুপাত (বীজগাণিতিক অনুপাত-সমানুপাতসহ)",
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
    <option key={key} value={key} className="text-center w-full">
      {value}
    </option>
  ));
  const handleChange = (event) => {
    const selectedTopic = event.target.value;
    setUnit(selectedTopic);
  };
  const [unit,setUnit] = useState('');
  return (
    <div className="mx-auto w-[100%]">
      <select className="mb-4 p-2 border border-gray-300 rounded w-full" onChange={handleChange}>
        <option value="cover" selected  className="text-center">
          অধ্যায় নির্বাচন করুন
        </option>
        {mathTopicsList}
      </select>
      {unit == 'algebraicExpression' && <AE></AE>}
    </div>
  );
}
