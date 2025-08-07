import React, { useState, useEffect } from "react";
import SideBar from "../components/sideBar";
import Audio from "../components/Audio";
import { fileLocation } from "../data";
function Cards({
  arabicAlphabet,
  selectedColor,
  arabicAlphabetDiacritics = "",
  withHoverChildren = false,
  isSaddah = false,
  isSaakinah = false,
  title,
  audioFolder = "",
  diacritics,
}) {
  const [preAlphabetDiacriticsUnicode, setPreAlphabetDiacriticsUnicode] =
    useState("");
  const [preAlphabet, setPreAlphabet] = useState("");
  const [postAlphabetDiacriticsUnicode, setPostAlphabetDiacriticsUnicode] =
    useState("");

  console.log("LetterCard.jsx");
  console.log(diacritics);
  console.log(arabicAlphabet);
  return (
    <>
      <div
        className="flex flex-col w-[calc(100%-10px)]
       space-x-1 p-1 justify-center items-center"
      >
        <div
          className={`flex  justify-center items-center 
            text-center text-lg md:text-2xl  w-[calc(100%-0px)] 
            p-1 h-[75px] md:h-[50px] rounded-lg ${selectedColor.backgroundColor} 
            ${selectedColor.textColor}`}
        >
          <span className="text-center">
            <span className="text-lg md:text-3xl font-bangla">
              আরবী বর্ণমালা{" "}
            </span>
            <span className="text-lg md:text-3xl font-bangla">{title} </span>
            {arabicAlphabetDiacritics && (
              <>
                <span className="text-5xl font-akbar">
                  {String.fromCodePoint(parseInt(arabicAlphabetDiacritics, 16))}
                </span>
                <span className="text-5xl font-bangla">-</span>
                <span className="text-lg md:text-3xl font-bangla"> দিয়ে</span>
              </>
            )}
          </span>
        </div>
        {isSaakinah && (
          <div className="w-[100%] h-[25vh] overflow-y-scroll font-akber flex justify-center items-center">
            <SideBar
              selectedColor={selectedColor}
              preAlphabetDiacriticsUnicode={preAlphabetDiacriticsUnicode}
              setPreAlphabetDiacriticsUnicode={setPreAlphabetDiacriticsUnicode}
              preAlphabet={preAlphabet}
              setPreAlphabet={setPreAlphabet}
              postAlphabetDiacriticsUnicode={postAlphabetDiacriticsUnicode}
              setPostAlphabetDiacriticsUnicode={
                setPostAlphabetDiacriticsUnicode
              }
              isSaddah={isSaddah}
              arabicAlphabet={arabicAlphabet}
            />
          </div>
        )}
        <div className="flex flex-0 flex-wrap flex-row-reverse w-[100%] font-akber ">
          {arabicAlphabet
            .filter((row) => row.extra != 1)
            .map((item, itemIndex) => (
              <div
                key={`container-${itemIndex}`}
                className=" group flex-grow 
              m-1 p-1 space-x-1
              w-[45%] sm:w-[40%] md:w-[30%] lg:w-[24%] xl:w-[19%] 2xl:w-[13%]
             "
              >
                <Audio
                  folder={`${fileLocation}audios/alphabets${audioFolder}/`}
                  fileName={`${itemIndex + 1}.mp3`}
                  card={true}
                >
                  <div
                    key={`item-${itemIndex}`}
                    className={`rtl p-2 sm:p-4 md:p-10 m-1 mx-auto box-border max-w-[250px] min-w-[100px] 2xl:max-w-[400px]
                      aspect-square md:aspect-[3/4] 2xl:aspect-[5/5]
                      ${selectedColor.backgroundColor} 
                      text-8xl xl:text-9xl 2xl:text-[10rem]
                       text-center font-akber
                      ${selectedColor.textColor} rounded-lg 
                      hover:scale-110 hover:border-4 hover:border-solid hover:border-green-500
                      transition-all duration-150 ease-in-out`}
                  >
                    {preAlphabet && preAlphabet}
                    {preAlphabet &&
                      preAlphabetDiacriticsUnicode &&
                      String.fromCodePoint(
                        parseInt(preAlphabetDiacriticsUnicode, 16)
                      )}

                    {diacritics
                      ? itemIndex !== 0
                        ? `${item.alphabet}`
                        : diacritics.name.includes("Fatha") ||
                          diacritics.name.includes("Dhammah")
                        ? `${arabicAlphabet[35].alphabet}`
                        : diacritics.name.includes("Kasrah")
                        ? `${arabicAlphabet[32].alphabet}`
                        : `${arabicAlphabet[34].alphabet}`
                      : `${item.alphabet}`}

                    {arabicAlphabetDiacritics &&
                      String.fromCodePoint(
                        parseInt(arabicAlphabetDiacritics, 16)
                      )}
                    {postAlphabetDiacriticsUnicode &&
                      String.fromCodePoint(
                        parseInt(postAlphabetDiacriticsUnicode, 16)
                      )}
                    {item.post_alphabet && item.post_alphabet}
                    {diacritics && diacritics.indication.length != 0 && (
                      <span className="text-5xl text-right ">
                        <br />(
                        {diacritics.name === "AshShaddah" &&
                          (preAlphabet ? `${preAlphabet}` : "")}
                        {diacritics.name === "AshShaddah" &&
                          (preAlphabet && preAlphabetDiacriticsUnicode
                            ? `${String.fromCodePoint(
                                parseInt(preAlphabetDiacriticsUnicode, 16)
                              )}`
                            : "")}
                        {itemIndex !== 0
                          ? `${item.alphabet}`
                          : `${arabicAlphabet[34].alphabet}`}
                        {diacritics.indication.map((desc, index) =>
                          String.fromCodePoint(parseInt(desc.slice(2), 16))
                        )}
                        {diacritics.name === "AshShaddah"
                          ? postAlphabetDiacriticsUnicode
                            ? itemIndex !== 0
                              ? `${item.alphabet}`
                              : `${arabicAlphabet[34].alphabet}` +
                                `${String.fromCodePoint(
                                  parseInt(postAlphabetDiacriticsUnicode, 16)
                                )}`
                            : itemIndex !== 0
                            ? `${item.alphabet}`
                            : `${arabicAlphabet[34].alphabet}`
                          : ""}
                        )
                      </span>
                    )}
                    {withHoverChildren && (
                      <>
                        <div
                          dir="rtl"
                          key={`itemNameAr-${itemIndex}`}
                          className="text-2xl text-right opacity-0 group-hover:opacity-100 pt-1 sm:pt-4 lg:pt-16"
                        >
                          <hr></hr>
                          {item.alphabet_name}
                        </div>
                        <div
                          key={`itemNameBn-${itemIndex}`}
                          className="text-2xl text-left opacity-0 group-hover:opacity-100"
                        >
                          {item.alphabet_banglaname}
                        </div>
                      </>
                    )}
                  </div>
                </Audio>
              </div>
            ))}
        </div>
      </div>
    </>
  );
}
export default Cards;
