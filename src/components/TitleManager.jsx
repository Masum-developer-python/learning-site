import { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";


function UsePageTitle() {
  const location = useLocation();

  useEffect(() => {
    let title = "RARe Academy"; // default

    switch (location.pathname) {
      case "/":
        title = "RARe Academy";
        break;
      case "/ict":
        title = "ICT - RARe Academy";
        break;
      case "/math":
        title = "Math - RARe Academy";
        break;
      case "/hisab":
        title = "Coaching Accounting System - RARe Academy";
        break;
      case "/routine":
        title = "Class Routine Generator - RARe Academy";
        break;
      case "/whiteboard":
        title = "Whiteboard - RARe Academy";
        break;
      default:
        title = "others - RARe Academy";
    }

    document.title = title;
  }, [location.pathname]);
}

export default UsePageTitle;
