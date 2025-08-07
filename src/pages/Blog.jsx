import { useEffect } from "react";

const Blog = ({ selectedColor, diacritics }) => {
  console.log(diacritics);
  const toBanglaNumber = (number) =>
    number.toString().replace(/\d/g, (digit) => "০১২৩৪৫৬৭৮৯"[digit]);

  // useEffect(() => {
  //   const translate = async () => {
  //     const res = await fetch("https://libretranslate.com/translate", {
  //       method: "POST",
  //       body: JSON.stringify({
  //         q: diacritics.title,
  //         source: "en",
  //         target: "bn",
  //         format: "text",
  //         api_key: "", // Leave blank if not needed
  //       }),
  //       headers: { "Content-Type": "application/json" },
  //     });

  //     const data = await res.json();
  //     console.log(data.translatedText);
  //   };

  //   translate();
  // }, [diacritics.title]);

  return (
    <div
      className={`w-full flex flex-col items-center min-h-screen  px-4 py-8 space-y-10
    ${selectedColor.backgroundColor} ${selectedColor.textColor} 
    `}
    >
      {/* Title Section */}
      <div className="w-full text-center">
        <h1
          className={`${selectedColor.backgroundColor} ${selectedColor.textColor} 
          text-4xl md:text-7xl font-bold rounded-full px-6 py-4 font-bangla shadow-lg`}
        >
          {diacritics.title} এর নিয়মাবলী
        </h1>
      </div>

      {/* Description Section */}
      <div className="w-full max-w-6xl p-6 rounded-xl shadow-md space-y-6 font-bangla text-gray-800">
        <p
          className={`text-3xl md:text-4xl ${selectedColor.backgroundColor} ${selectedColor.textColor}`}
        >
          <strong>{diacritics.title}</strong> অর্থ:{" "}
          <span>{diacritics.meaning}</span>
        </p>
        {diacritics.diacritics.length > 1 && (
          <>
            <p
              className={`text-2xl md:text-3xl ${selectedColor.backgroundColor} ${selectedColor.textColor}`}
            >
              <strong>{diacritics.title}</strong> &nbsp;
              <strong>
                {toBanglaNumber(diacritics.diacritics.length)}
              </strong>{" "}
              প্রকার।
            </p>

            {/* List */}
            <ul
              className={`list-disc list-inside text-2xl md:text-3xl space-y-2 ${selectedColor.backgroundColor} ${selectedColor.textColor}`}
            >
              {diacritics.diacritics.map((diacritic, index) => (
                <li key={index}>{diacritic.title}</li>
              ))}
            </ul>
          </>
        )}
      </div>

      {/* Pronunciation Section */}
      <div
        className={`w-full max-w-6xl p-6 rounded-xl shadow-md space-y-6 font-bangla text-gray-800`}
      >
        <h2
          className={`text-4xl font-extrabold text-center border-b pb-2 ${selectedColor.backgroundColor} ${selectedColor.textColor}`}
        >
          উচ্চারণ পদ্ধতি
        </h2>
        {diacritics.diacritics.map((diacritic, index) => (
          <div key={index} className="space-y-2">
            <dt
              className={`text-3xl text-left font-semibold ${selectedColor.backgroundColor} ${selectedColor.textColor}`}
            >
              {diacritic.title}
            </dt>
            <dd
              className={`text-2xl ${selectedColor.backgroundColor} ${selectedColor.textColor}`}
            >
              {diacritic.description}
            </dd>
          </div>
        ))}
      </div>

      {/* Video Section */}
      <div className="w-full max-w-4xl p-1">
        <video
          className="w-full h-auto rounded-xl shadow-lg border border-gray-300"
          controls
          src={diacritics.video || "/videos/diacritics.mp4"}
          poster="/images/rmn.jpg"
        >
          Your browser does not support the video tag.
        </video>
      </div>
    </div>
  );
};

export default Blog;

// const Blog = ({ selectedColor, diacritics }) => {
//   console.log(diacritics);
//   async () => {
//     const res = await fetch("https://libretranslate.com/translate", {
//       method: "POST",
//       body: JSON.stringify({
//         q: "",
//         source: "en",
//         target: "bn",
//         format: "text",
//         alternatives: 3,
//         api_key: "",
//       }),
//       headers: { "Content-Type": "application/json" },
//     });

//     console.log(await res.json());
//   };

//   return (
//     <div className="w-[100%] flex flex-col items-center h-screen">
//       <div className=" p-1 w-[100%] ">
//         <p
//           className={`${selectedColor.backgroundColor}
//             ${selectedColor.textColor} text-8xl text-center rounded-full font-bangla`}
//         >
//           {diacritics.title}ের নিয়মাবলী
//         </p>
//       </div>
//       <div className="w-[100%]  p-4">
//         <p
//           className={`${selectedColor.backgroundColor}
//             ${selectedColor.textColor} text-5xl text-center rounded-lg font-bangla`}
//         >
//           {diacritics.title} অর্থ {diacritics.meaning} <br />
//           <br />
//           {diacritics.title} {diacritics.diacritics.length} প্রকার। <br />
//           <ul className="list-disc list-inside text-4xl">

//             {diacritics.diacritics.map((diacritic, index) => (
//               <li key={index}>{diacritic.title}</li>
//             ))}
//           </ul>
//         </p>
//       {/* </div>
//       <div className="w-full p-4"> */}
//         <dl
//           className={`${selectedColor.backgroundColor} ${selectedColor.textColor}
//       text-4xl md:text-5xl rounded-lg font-bangla p-6 space-y-6`}
//         >
//           <div>
//             <dd>-----------------</dd>
//             <dt className="font-bold">উচ্চারণ পদ্ধতি</dt>
//             <dd>-----------------</dd>
//           </div>
//           {diacritics.diacritics.map((diacritic, index) => (
//             <div key={index}>
//               <dt className="font-semibold">{diacritic.title}</dt>
//               <dd>{diacritic.description}</dd>
//             </div>
//           ))}

//         </dl>
//       </div>
//       <div className="w-full p-4">
//         <video
//           className="w-full h-auto rounded-lg"
//           controls
//           src="/videos/diacritics.mp4"
//         >
//           Your browser does not support the video tag.
//         </video>
//       </div>
//     </div>
//   );
// };

// export default Blog;
