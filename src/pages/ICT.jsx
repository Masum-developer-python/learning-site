import React, { useState } from "react";

const ICT = () => {
  const [Unit, setUnit] = useState("");
  const [topic, setTopic] = useState("");
  const [inputBase, setInputBase] = useState(10);
  const [tergetedBase, setTergetedBase] = useState(2);
  const [input, setInput] = useState('');
  const [integerPart, setIntegerPart] = useState('');
  const [fractionalPart, setFractionalPart] = useState('');
  const [stepCount, setStepCount] = useState(3);
  return (
    <div className="p-4 w-[100%]">
      <h1>Information and Communication Technology (ICT)</h1>
      <p>
        ICT refers to the integration of telecommunications, computers, and
        software to enable users to access, store, transmit, and manipulate
        information.
      </p>
      <div className="mt-4">
        <select
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
          onChange={(e) => {
            const Topic = e.target.value;
            console.log(` topic: ${Topic}`);
            setUnit(e.target.value);
            // Handle the  topic here
          }}
        >
          <option value="">Select a topic</option>
          <option value="introduction">Introduction</option>
          <option value="networking">Networking</option>
          <option value="numbersystem">Number System</option>
          <option value="web-development">Web Development</option>
          <option value="programming">Programming</option>
          <option value="databases">Databases</option>
        </select>

        {/* //--------------------------------------------------------------------------------------------------- */}

        {Unit === "numbersystem" && (
          <div className="mt-4">
            {/* <label className="block text-sm font-medium text-gray-700">
              Select Input base:
            </label> */}
            <select
              className="m-1  inline-block w-1/4 border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
              onChange={(e) => {
                setInputBase(e.target.value);

                console.log(` base: ${e.target.value}`);
              }}
            >
              <option value="10">ডেসিমেল</option>
              <option value="2">বাইনারি</option>
              <option value="8">অক্টাল</option>
              <option value="16">হেক্সাডেসিমেল</option>
            </select>
            <input
              type="text"
              className="m-1 inline-block w-1/4 border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
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
                  e.target.value.includes(".")
                    ? e.target.value.split(".")[1]
                    : 0
                );
                
                console.log(`Input number: ${input}`);
                // Handle the input number here
              }}
            />
            {/* <label className="block text-sm font-medium text-gray-700">
              Select target base:
            </label> */}
            <select
              className="m-1 inline-block w-1/4 border-gray-300 rounded-md shadow-sm 
              p-2 focus:ring-blue-500 focus:border-blue-500"
              onChange={(e) => {
                setTergetedBase(e.target.value);

                console.log(` base: ${e.target.value}`);
              }}
            >
              <option value="2">বাইনারি</option>
              <option value="8">অক্টাল</option>
              <option value="16">হেক্সাডেসিমেল</option>
              <option value="10">ডেসিমেল</option>
            </select>
            <br />
            <div className="mt-4">
              <p className="text-6xl">
                {tergetedBase && (
                  <>
                    {integerPart || "0"}
                    <sub>{inputBase}</sub> {" => "}
                    {` ${parseInt(integerPart, inputBase)
                      .toString(tergetedBase)
                      .toUpperCase()}`}{" "}
                    <sub>{tergetedBase}</sub>
                  </>
                )}
              </p>
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
                      fractionalSteps.push(tempFractionalPart.toFixed(3));
                      count++;
                    }
                    console.log(integerSteps);

                    return (
                      <div className="w-full">
                        <div className="w-[90%] mx-auto">
                          <p className="text-4xl text-left">
                            {integerPart || "0"}
                            {fractionalPart ? `.${fractionalPart}` : ""}
                            <sub>{inputBase}</sub> {" => "}
                            {reminders.reverse().map((reminder, index) => (
                              <div key={index} className="inline-block">
                                {` ${parseInt(reminder, inputBase)
                                  .toString(tergetedBase)
                                  .toUpperCase()}`}
                              </div>
                            ))}
                            .
                            {integerSteps.map((reminder, index) => (
                              <div key={index} className="inline-block">
                                {` ${parseInt(reminder, inputBase)
                                  .toString(tergetedBase)
                                  .toUpperCase()}`}
                                {index == integerSteps.length - 1 && (
                                  <sub>{tergetedBase}</sub>
                                )}
                              </div>
                            ))}
                          </p>
                        </div>
                        <div className="flex mt-16">
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
                                      - {reminders[stepsNumber.length - 1 - index]}
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
                          <div className="w-1/4 mx-auto mt-4">
                            {/* ------------------- */}
                            <button
                              className="bg-blue-500 text-white px-4 py-2 rounded inline-block"
                              onClick={() => {
                                setStepCount(stepCount + 1);
                              }}
                            >
                              +
                            </button>
                            <button
                              className="bg-red-500 text-white px-4 py-2 rounded ml-2 inline-block"
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
                                    ).toFixed(3)}`}
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
                    let lsbPower = input.includes('.') ? fractionalPart.toString().length * -1 : 0;
                    let stepsPower = [];
                    console.log(`msbPower: ${msbPower}`);
                    console.log(`lsbPower: ${lsbPower}`);
                    while (msbPower >= lsbPower) {
                      stepsPower.push(msbPower);
                      msbPower--;
                    }
                    console.log(stepsPower);
                    let number = integerPart.toString().split('').map((digit) => {
                      return parseInt(digit, inputBase);
                    }).concat (input.includes('.') ? fractionalPart.toString().split('').map((digit) => {
                      return parseInt(digit, inputBase);
                    }) : []);
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
      </div>
    </div>
  );
};

export default ICT;
