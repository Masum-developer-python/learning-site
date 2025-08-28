import React, { useState } from "react";

export default function Unit1({ topic }) {
  
  return (
    <>
      {topic === "introduction" && (
        <div>
          <h1 className="text-2xl font-bold mb-4">Introduction to ICT</h1>
          <p className="mb-2">
            Information and Communication Technology (ICT) refers to the use of
            digital technology to access, store, transmit, and manipulate
            information.
          </p>
          <p className="mb-2">
            ICT encompasses a wide range of technologies, including computers,
            the internet, telecommunications, and software applications.
          </p>
          <p className="mb-2">
            ICT plays a crucial role in modern society, impacting various
            sectors such as education, healthcare, business, and entertainment.
          </p>
          <p className="mb-2">
            It enables efficient communication, data management, and access to
            information, fostering innovation and connectivity on a global
            scale.
          </p>
        </div>
      )}
    </>
  );
}
