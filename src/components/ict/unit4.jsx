import React, { useState } from "react";

export default function Unit4({topic}) {
  
  return (
    <>
      {topic === "web-development" && (
        <div>     <h1 className="text-2xl font-bold mb-4">Web Development Basics</h1>
          <p className="mb-2">
            Web development refers to the process of creating and maintaining
            websites and web applications.
          </p>
          <p className="mb-2">
            It involves various tasks, including web design, coding, content
            creation, and server management.
          </p>
        </div>
      )}
    </>
  );
}
