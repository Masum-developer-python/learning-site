import React, { useState } from "react";

export default function Unit5({topic}) {
  
  return (
    <>
      {topic === "programming" && (
        <div>
          <h1 className="text-2xl font-bold mb-4">Programming Basics</h1>
          <p className="mb-2">
            Programming is the process of designing and building executable
            computer software to accomplish a specific task.
          </p>
          <p className="mb-2">
            It involves writing code in various programming languages, such as
            Python, Java, C++, and JavaScript.
          </p>
          <p className="mb-2">
            Understanding programming concepts is essential for developing
            software applications and solving complex problems.
          </p>
        </div>
      )}
    </>
  );
}
