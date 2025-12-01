import React, { useState } from "react";

export default function Unit3({ topic, selectedColor }) {
  const [inputBase, setInputBase] = useState(10);
  const [tergetedBase, setTergetedBase] = useState(2);
  const [input, setInput] = useState("");
  const [integerPart, setIntegerPart] = useState("");
  const [fractionalPart, setFractionalPart] = useState("");
  const [stepCount, setStepCount] = useState(3);
  return (
    <>
      {topic === "numbersystem" && (
        <div className={`mt-4 ${selectedColor.textColor} mx-auto`}>
          {/* <label className="block text-sm font-medium text-gray-700">
              Select Input base:
            </label> */}

          <input
            type="text"
            className={` ${selectedColor.textColor} text-right   m-1 inline-block  text-3xl
             w-fit p-2`}
            placeholder="Enter a number"
            onChange={(e) => {
              let input = e.target.value;
              setInput(input);
              input.length === 0 ||
                parseInt(input[input.length - 1], inputBase) >= 0 ||
                input[input.length - 1] == "." ||
                alert("Invalid digit for the selected base");
              setIntegerPart(e.target.value.split(".")[0] || 0);
              setFractionalPart(
                e.target.value.includes(".") ? e.target.value.split(".")[1] : 0
              );

              console.log(`Input number: ${input}`);
              // Handle the input number here
            }}
          />
          <sub>
            <select
              className={`inline-block   w-[40px] p-1 
               ${selectedColor.textColor} `}
              onChange={(e) => {
                setInputBase(e.target.value);

                console.log(` base: ${e.target.value}`);
              }}
            >
              <option value="10">10</option>
              <option value="2">2</option>
              <option value="8">8</option>
              <option value="16">16</option>
            </select>
          </sub>
          {/* <label className="block text-sm font-medium text-gray-700">
              Select target base:
            </label> */}

          <span className="text-3xl">{"=>(?)"}</span>
          <sub>
            <select
              className={`inline-block   w-[40px] p-1 
               ${selectedColor.textColor} `}
              onChange={(e) => {
                setTergetedBase(e.target.value);

                console.log(` base: ${e.target.value}`);
              }}
            >
              <option value="2">2</option>
              <option value="8">8</option>
              <option value="16">16</option>
              <option value="10">10</option>
            </select>
          </sub>
          <br />
          <div className="mt-4">
            {/* <p className="text-6xl">
                {tergetedBase && (
                  <>
                    {integerPart || "0"}
                    <sub>{inputBase}</sub> {" ==> "}
                    {` ${parseInt(integerPart, inputBase)
                      .toString(tergetedBase)
                      .toUpperCase()}`}{" "}
                    <sub>{tergetedBase}</sub>
                  </>
                )}
              </p> */}
            <br />
            {/* //--------------------------------------------------------------------------------------------------- */}
            {tergetedBase && input && inputBase == 10 && (
              <div className="mx-auto w-full">
                {(() => {
                  let tempInput = integerPart;
                  let stepsNumber = [];
                  let reminders = [];
                  console.log(tempInput);

                  while (tempInput > 0) {
                    reminders.push(tempInput % tergetedBase);
                    console.log(reminders);
                    tempInput = Math.floor(tempInput / tergetedBase);
                    stepsNumber.push(tempInput);
                    console.log(tempInput);
                  }

                  let tempFractionalPart =
                    fractionalPart / 10 ** fractionalPart.length || 0;
                  let integerSteps = [];
                  let fractionalSteps = [];
                  let count = 0;
                  while (count < stepCount && tempFractionalPart > 0) {
                    tempFractionalPart *= tergetedBase;
                    tempFractionalPart = tempFractionalPart.toFixed(6);

                    integerSteps.push(Math.floor(tempFractionalPart));

                    console.log(tempFractionalPart, integerSteps);

                    tempFractionalPart -= Math.floor(tempFractionalPart);
                    fractionalSteps.push(tempFractionalPart.toFixed(6));
                    count++;
                  }
                  console.log(integerSteps);

                  return (
                    <div className="w-full">
                      <div className="w-[90%] mx-auto">
                        <p className="text-4xl text-left">
                          {integerPart || "0"}
                          {fractionalPart ? `.${fractionalPart}` : ""}
                          <sub>{inputBase}</sub> {" => "} (
                          {reminders.reverse().map((reminder, index) => (
                            <div key={index} className="inline-block">
                              {` ${parseInt(reminder, inputBase)
                                .toString(tergetedBase)
                                .toUpperCase()}`}
                            </div>
                          ))}
                          {fractionalPart ? "." : ""}
                          {integerSteps.map((reminder, index) => (
                            <div key={index} className="inline-block">
                              {` ${parseInt(reminder, inputBase)
                                .toString(tergetedBase)
                                .toUpperCase()}`}
                              {tempFractionalPart != 0 &&
                              index == integerSteps.length - 1
                                ? "....."
                                : ""}
                            </div>
                          ))}
                          )<sub>{tergetedBase}</sub>
                        </p>
                      </div>
                      <div className="flex mt-16 print:flex-col print:text-left">
                        <div className="w-1/2 mx-auto mt-12">
                          <table className="border-collapse font-bangla mx-auto">
                            <tr className="w-full ">
                              <td className="font-semibold text-right ">
                                <div className=" inline-block">
                                  {tergetedBase}
                                </div>
                                <div className=" inline-block border-l border-b border-gray-900">
                                  &nbsp;{integerPart}
                                </div>
                              </td>
                              <td className="font-semibold text-right inline-block">
                                &nbsp;
                              </td>
                              <td className="font-semibold pl-2">^</td>
                            </tr>
                            {stepsNumber.map((step, index) => (
                              <tr key={index} className="w-full">
                                <td className="font-semibold text-right ">
                                  {index < stepsNumber.length - 1 && (
                                    <div className=" inline-block">
                                      {tergetedBase}
                                    </div>
                                  )}

                                  <div
                                    className={`inline-block ${
                                      index < stepsNumber.length - 1
                                        ? "border-l border-b border-gray-900"
                                        : ""
                                    }`}
                                  >
                                    &nbsp;{step}
                                  </div>
                                </td>
                                <td className="font-semibold text-right">
                                  <div
                                    className={`inline-block ${
                                      index < stepsNumber.length - 1
                                        ? "border-b border-gray-900"
                                        : ""
                                    }`}
                                  >
                                    -{" "}
                                    {reminders[stepsNumber.length - 1 - index]}
                                  </div>
                                </td>
                                <td>
                                  <div className="inline-block border-r border-gray-900 ml-2">
                                    &nbsp;
                                  </div>
                                </td>
                              </tr>
                            ))}
                          </table>
                        </div>
                        <hr className="hidden border-gray-900 print:block"/>
                        {/* ------------------- */}
                        {fractionalPart !== 0 && (
                          <div className="w-1/4 mx-auto mt-4">
                            {/* ------------------- */}
                            <button
                              className="bg-blue-500 text-white px-4 py-2 rounded inline-block print:hidden"
                              onClick={() => {
                                setStepCount(stepCount + 1);
                              }}
                            >
                              +
                            </button>
                            <button
                              className="bg-red-500 text-white px-4 py-2 rounded ml-2 inline-block print:hidden"
                              onClick={() => {
                                if (stepCount > 1) {
                                  setStepCount(stepCount - 1);
                                }
                              }}
                            >
                              -
                            </button>
                            <br />

                            <table className="border-collapse font-bangla mx-auto">
                              <tr className="w-full ">
                                <td className="font-semibold text-right ">
                                  <div className=" inline-block">&nbsp;</div>
                                  <div className=" inline-block border-l border-b border-gray-900">
                                    &nbsp;
                                    {`${(
                                      fractionalPart /
                                      10 ** fractionalPart.length
                                    ).toFixed(6)}`}
                                    <br />x {tergetedBase}
                                  </div>
                                </td>
                              </tr>
                              {fractionalSteps.map((step, index) => (
                                <tr key={index} className="w-full">
                                  <td className="font-semibold text-right ">
                                    <div className=" inline-block">
                                      {integerSteps[index]}
                                    </div>

                                    <div
                                      className={`inline-block border-l border-b border-gray-900`}
                                    >
                                      &nbsp;{step}
                                      <br />
                                      {`x ${tergetedBase}`}
                                    </div>
                                  </td>
                                </tr>
                              ))}
                            </table>
                          </div>
                        )}
                      </div>
                      {/* ---------------------- */}
                    </div>
                  );
                })()}
              </div>
            )}
            {/* //--------------------------------------------------------------------------------------------------- */}
            {inputBase && input && tergetedBase == 10 && (
              <div className="mx-auto w-fit">
                {(() => {
                  let msbPower = integerPart.toString().length - 1;
                  let lsbPower = input.includes(".")
                    ? fractionalPart.toString().length * -1
                    : 0;
                  let stepsPower = [];
                  console.log(`msbPower: ${msbPower}`);
                  console.log(`lsbPower: ${lsbPower}`);
                  while (msbPower >= lsbPower) {
                    stepsPower.push(msbPower);
                    msbPower--;
                  }
                  console.log(stepsPower);
                  let number = integerPart
                    .toString()
                    .split("")
                    .map((digit) => {
                      return parseInt(digit, inputBase);
                    })
                    .concat(
                      input.includes(".")
                        ? fractionalPart
                            .toString()
                            .split("")
                            .map((digit) => {
                              return parseInt(digit, inputBase);
                            })
                        : []
                    );
                  console.log(`number: ${number}`);

                  return (
                    <>
                      <p className="text-4xl text-left">
                        {stepsPower.map((power, index) => (
                          <>
                            {parseInt(number[index], inputBase)} * {inputBase}
                            <sup>{power}</sup>{" "}
                            {index < stepsPower.length - 1 && " + "}
                          </>
                        ))}
                      </p>
                      <p className="text-5xl text-left">
                        ={" "}
                        {stepsPower.map((power, index) => (
                          <>
                            {number[index] * Math.pow(inputBase, power)}
                            {index < stepsPower.length - 1 && " + "}
                          </>
                        ))}
                      </p>
                      <p className="text-5xl text-left">
                        ={" "}
                        {stepsPower
                          .reduce((acc, power, index) => {
                            return (
                              acc + number[index] * Math.pow(inputBase, power)
                            );
                          }, 0)
                          .toFixed(4)}{" "}
                        <sub>10</sub>
                      </p>
                    </>
                  );
                })()}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
