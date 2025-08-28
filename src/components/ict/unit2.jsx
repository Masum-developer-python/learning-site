import React, { useState } from "react";

export default function Unit2({topic}) {
  
  return (
    <>
      {topic === "networking" && (
        <div>     <h1 className="text-2xl font-bold mb-4">Networking Basics</h1>
          <p className="mb-2">
            Networking refers to the practice of connecting computers and other
            devices to share resources and information.
          </p>
          <p className="mb-2">
            It enables communication between devices, allowing them to exchange
            data and access shared resources.
          </p>
          <p className="mb-2">
            Networking can be classified into different types, including local
            area networks (LANs), wide area networks (WANs), and the internet.
          </p>
          <p className="mb-2">
            Understanding networking concepts is essential for managing and
            troubleshooting networked systems.
          </p>
        </div>
      )}
    </>
  );
}
