import React, { useState } from "react";

export default function Unit6({topic}) {
  
  return (
    <>
      {topic === "databases" && (
        <div>
          <h1 className="text-2xl font-bold mb-4">Database Basics</h1>
          <p className="mb-2">
            A database is an organized collection of structured information,
            typically stored electronically in a computer system.
          </p>
          <p className="mb-2">
            Databases are managed by Database Management Systems (DBMS), which
            provide tools for creating, retrieving, updating, and deleting
            data.
          </p>
          <p className="mb-2">
            Understanding database concepts is essential for developing data-driven
            applications and managing large volumes of information.
          </p>
        </div>
      )}
    </>
  );
}
