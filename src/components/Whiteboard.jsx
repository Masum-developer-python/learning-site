import { use } from "react";
import { useEffect, useRef, useState, useCallback } from "react";

export default function Whiteboard({
  whiteboardOpen = false,
  height = "100%",
}) {
  const canvasRef = useRef(null);
  const contextRef = useRef(null);

  // Drawing states
  const [isDrawing, setIsDrawing] = useState(false);
  const [tool, setTool] = useState("pen");
  const [color, setColor] = useState("#000000");
  const [brushSize, setBrushSize] = useState(1);
  const [drawingData, setDrawingData] = useState(null);

  // Selection and clipboard states
  const [isSelecting, setIsSelecting] = useState(false);
  const [selection, setSelection] = useState(null);
  const [clipboard, setClipboard] = useState(null);
  const [startPoint, setStartPoint] = useState(null);
  const [pasteMode, setPasteMode] = useState(false);
  const [pastePreview, setPastePreview] = useState(null);
  const [isDraggingPaste, setIsDraggingPaste] = useState(false);

  // History for undo/redo
  const [history, setHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  // Helper function to get coordinates
  const getCoordinates = useCallback((e) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    return {
      x: (e.clientX - rect.left) * (canvas.width / rect.width),
      y: (e.clientY - rect.top) * (canvas.height / rect.height),
    };
  }, []);

  // Save to history
  const saveToHistory = useCallback(() => {
    const canvas = canvasRef.current;
    if (canvas.width > 0 && canvas.height > 0) {
      const imageData = canvas.toDataURL();
      const newHistory = history.slice(0, historyIndex + 1);
      newHistory.push(imageData);
      setHistory(newHistory);
      setHistoryIndex(newHistory.length - 1);
      setDrawingData(imageData);
    }
  }, [history, historyIndex]);

  // Draw paste preview
  const drawPastePreview = useCallback(
    (x, y) => {
      if (!clipboard || !contextRef.current) return;

      const ctx = contextRef.current;
      ctx.save();
      ctx.globalAlpha = 0.7;
      ctx.putImageData(clipboard.imageData, x, y);
      ctx.restore();
    },
    [clipboard]
  );

  // Redraw canvas
  const redrawCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    const ctx = contextRef.current;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (drawingData) {
      const img = new Image();
      img.onload = () => {
        ctx.drawImage(img, 0, 0);

        // Draw selection box
        if (selection && tool === "select") {
          ctx.save();
          ctx.strokeStyle = "#0066cc";
          ctx.lineWidth = 2;
          ctx.setLineDash([5, 5]);
          ctx.strokeRect(
            Math.min(selection.startX, selection.endX),
            Math.min(selection.startY, selection.endY),
            Math.abs(selection.endX - selection.startX),
            Math.abs(selection.endY - selection.startY)
          );
          ctx.restore();
        }

        // Draw paste preview
        if (pastePreview && pasteMode) {
          drawPastePreview(pastePreview.x, pastePreview.y);
        }
      };
      img.src = drawingData;
    } else if (pastePreview && pasteMode) {
      drawPastePreview(pastePreview.x, pastePreview.y);
    }
  }, [drawingData, selection, tool, pastePreview, pasteMode, drawPastePreview]);

  // Draw shapes
  const drawShape = useCallback(
    (start, end, finalize = false) => {
      const ctx = contextRef.current;
      ctx.save();
      ctx.strokeStyle = color;
      ctx.lineWidth = brushSize;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";

      switch (tool) {
        case "rectangle":
          ctx.strokeRect(start.x, start.y, end.x - start.x, end.y - start.y);
          break;
        case "circle":
          const radius = Math.sqrt(
            Math.pow(end.x - start.x, 2) + Math.pow(end.y - start.y, 2)
          );
          ctx.beginPath();
          ctx.arc(start.x, start.y, radius, 0, 2 * Math.PI);
          ctx.stroke();
          break;
        case "line":
          ctx.beginPath();
          ctx.moveTo(start.x, start.y);
          ctx.lineTo(end.x, end.y);
          ctx.stroke();
          break;
        case "arrow":
          const headlen = 15;
          const dx = end.x - start.x;
          const dy = end.y - start.y;
          const angle = Math.atan2(dy, dx);

          ctx.beginPath();
          ctx.moveTo(start.x, start.y);
          ctx.lineTo(end.x, end.y);
          ctx.lineTo(
            end.x - headlen * Math.cos(angle - Math.PI / 6),
            end.y - headlen * Math.sin(angle - Math.PI / 6)
          );
          ctx.moveTo(end.x, end.y);
          ctx.lineTo(
            end.x - headlen * Math.cos(angle + Math.PI / 6),
            end.y - headlen * Math.sin(angle + Math.PI / 6)
          );
          ctx.stroke();
          break;
      }
      ctx.restore();
    },
    [tool, color, brushSize]
  );

  // Initialize canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    contextRef.current = ctx;

    const resize = () => {
      const container = canvas.parentElement;
      const dpr = window.devicePixelRatio || 1;

      // Save current drawing
      let currentDrawing = null;
      if (canvas.width > 0 && canvas.height > 0) {
        currentDrawing = canvas.toDataURL();
      }

      // Set display size
      const displayWidth = container.clientWidth;
      const displayHeight = container.clientHeight;

      // Set canvas size
      canvas.width = displayWidth * dpr;
      canvas.height = displayHeight * dpr;
      canvas.style.width = displayWidth + "px";
      canvas.style.height = displayHeight + "px";

      // Scale context for high DPI displays
      ctx.scale(dpr, dpr);

      // Restore drawing
      const dataToRestore = currentDrawing || drawingData;
      if (dataToRestore && canvas.width > 0 && canvas.height > 0) {
        const img = new Image();
        img.onload = () => {
          ctx.drawImage(img, 0, 0, displayWidth, displayHeight);
        };
        img.src = dataToRestore;
      }

      // Save initial state if history is empty
      if (history.length === 0) {
        saveToHistory();
      }
    };

    resize();
    window.addEventListener("resize", resize);

    return () => {
      window.removeEventListener("resize", resize);
    };
  }, []);

  // Event handlers
  const startDraw = useCallback(
    (e) => {
      const coords = getCoordinates(e);
      setStartPoint(coords);

      // Handle paste mode
      if (pasteMode && clipboard) {
        if (!pastePreview) {
          setPastePreview({ x: coords.x, y: coords.y });
          setIsDraggingPaste(true);
          redrawCanvas();
          return;
        } else {
          const ctx = contextRef.current;
          ctx.putImageData(clipboard.imageData, pastePreview.x, pastePreview.y);
          saveToHistory();
          setPasteMode(false);
          setPastePreview(null);
          setIsDraggingPaste(false);
          return;
        }
      }

      if (tool === "select") {
        setIsSelecting(true);
        setSelection({
          startX: coords.x,
          startY: coords.y,
          endX: coords.x,
          endY: coords.y,
        });
        return;
      }

      if (["rectangle", "circle", "line", "arrow"].includes(tool)) {
        setIsDrawing(true);
        return;
      }

      // For pen and eraser
      setIsDrawing(true);
      const ctx = contextRef.current;
      ctx.beginPath();
      ctx.moveTo(coords.x, coords.y);

      if (tool === "eraser") {
        ctx.globalCompositeOperation = "destination-out";
        ctx.lineWidth = brushSize * 3;
      } else {
        ctx.globalCompositeOperation = "source-over";
        ctx.strokeStyle = color;
        ctx.lineWidth = brushSize;
      }
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
    },
    [
      tool,
      pasteMode,
      clipboard,
      pastePreview,
      brushSize,
      color,
      getCoordinates,
      redrawCanvas,
      saveToHistory,
    ]
  );

  const draw = useCallback(
    (e) => {
      const coords = getCoordinates(e);

      // Handle paste preview
      if (pasteMode && isDraggingPaste && pastePreview) {
        setPastePreview({ x: coords.x, y: coords.y });
        redrawCanvas();
        return;
      }

      if (pasteMode && !isDraggingPaste && !pastePreview) {
        setPastePreview({ x: coords.x, y: coords.y });
        redrawCanvas();
        return;
      }

      // Handle selection
      if (tool === "select" && isSelecting) {
        setSelection((prev) => ({ ...prev, endX: coords.x, endY: coords.y }));
        redrawCanvas();
        return;
      }

      // Handle shapes
      if (
        ["rectangle", "circle", "line", "arrow"].includes(tool) &&
        isDrawing
      ) {
        redrawCanvas();
        setTimeout(() => drawShape(startPoint, coords), 0);
        return;
      }

      // Handle free drawing
      if (!isDrawing || ["select"].includes(tool)) return;

      const ctx = contextRef.current;
      ctx.lineTo(coords.x, coords.y);
      ctx.stroke();
    },
    [
      tool,
      pasteMode,
      isDraggingPaste,
      pastePreview,
      isSelecting,
      isDrawing,
      startPoint,
      getCoordinates,
      redrawCanvas,
      drawShape,
    ]
  );

  const stopDraw = useCallback(
    (e) => {
      if (isDraggingPaste) {
        setIsDraggingPaste(false);
        return;
      }

      if (tool === "select" && isSelecting) {
        setIsSelecting(false);
        return;
      }

      if (
        ["rectangle", "circle", "line", "arrow"].includes(tool) &&
        isDrawing
      ) {
        const coords = getCoordinates(e);
        drawShape(startPoint, coords, true);
        setIsDrawing(false);
        saveToHistory();
        return;
      }

      if (isDrawing && !["select"].includes(tool)) {
        setIsDrawing(false);
        const ctx = contextRef.current;
        ctx.closePath();
        saveToHistory();
      }
    },
    [
      tool,
      isDraggingPaste,
      isSelecting,
      isDrawing,
      startPoint,
      getCoordinates,
      drawShape,
      saveToHistory,
    ]
  );

  // Attach event listeners
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.addEventListener("mousedown", startDraw);
    canvas.addEventListener("mousemove", draw);
    canvas.addEventListener("mouseup", stopDraw);
    canvas.addEventListener("mouseleave", stopDraw);

    // Touch events for mobile
    canvas.addEventListener("touchstart", (e) => {
      e.preventDefault();
      const touch = e.touches[0];
      const mouseEvent = new MouseEvent("mousedown", {
        clientX: touch.clientX,
        clientY: touch.clientY,
      });
      canvas.dispatchEvent(mouseEvent);
    });

    canvas.addEventListener("touchmove", (e) => {
      e.preventDefault();
      const touch = e.touches[0];
      const mouseEvent = new MouseEvent("mousemove", {
        clientX: touch.clientX,
        clientY: touch.clientY,
      });
      canvas.dispatchEvent(mouseEvent);
    });

    canvas.addEventListener("touchend", (e) => {
      e.preventDefault();
      const mouseEvent = new MouseEvent("mouseup", {});
      canvas.dispatchEvent(mouseEvent);
    });

    return () => {
      canvas.removeEventListener("mousedown", startDraw);
      canvas.removeEventListener("mousemove", draw);
      canvas.removeEventListener("mouseup", stopDraw);
      canvas.removeEventListener("mouseleave", stopDraw);
    };
  }, [startDraw, draw, stopDraw]);

  // Canvas operations
  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = contextRef.current;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setDrawingData(null);
    setSelection(null);
    setHistory([]);
    setHistoryIndex(-1);
    saveToHistory();
  };

  const undo = () => {
    if (historyIndex > 0) {
      const newIndex = historyIndex - 1;
      setHistoryIndex(newIndex);

      const canvas = canvasRef.current;
      const ctx = contextRef.current;
      const img = new Image();
      img.onload = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0);
        setDrawingData(history[newIndex]);
      };
      img.src = history[newIndex];
    }
  };

  const redo = () => {
    if (historyIndex < history.length - 1) {
      const newIndex = historyIndex + 1;
      setHistoryIndex(newIndex);

      const canvas = canvasRef.current;
      const ctx = contextRef.current;
      const img = new Image();
      img.onload = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0);
        setDrawingData(history[newIndex]);
      };
      img.src = history[newIndex];
    }
  };

  const copySelection = () => {
    if (!selection) return;

    const canvas = canvasRef.current;
    const ctx = contextRef.current;

    const x = Math.min(selection.startX, selection.endX);
    const y = Math.min(selection.startY, selection.endY);
    const width = Math.abs(selection.endX - selection.startX);
    const height = Math.abs(selection.endY - selection.startY);

    if (width > 0 && height > 0) {
      const imageData = ctx.getImageData(x, y, width, height);
      setClipboard({ imageData, width, height });
    }
  };

  const pasteSelection = () => {
    if (!clipboard) return;
    setPasteMode(true);
    setPastePreview(null);
    setIsDraggingPaste(false);
  };

  const deleteSelection = () => {
    if (!selection) return;

    const ctx = contextRef.current;
    const x = Math.min(selection.startX, selection.endX);
    const y = Math.min(selection.startY, selection.endY);
    const width = Math.abs(selection.endX - selection.startX);
    const height = Math.abs(selection.endY - selection.startY);

    ctx.clearRect(x, y, width, height);
    setSelection(null);
    saveToHistory();
  };

  const downloadCanvas = () => {
    const canvas = canvasRef.current;
    const link = document.createElement("a");
    link.download = "whiteboard.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  const getCursor = () => {
    if (pasteMode) return "cursor-copy";
    switch (tool) {
      case "pen":
        return "cursor-crosshair";
      case "eraser":
        return "cursor-cell";
      case "select":
        return "cursor-pointer";
      case "rectangle":
      case "circle":
      case "line":
      case "arrow":
        return "cursor-crosshair";
      default:
        return "cursor-default";
    }
  };

  const presetColors = [
    "#000000",
    "#ff0000",
    "#00ff00",
    "#0000ff",
    "#ffff00",
    "#ff00ff",
    "#00ffff",
    "#ffa500",
    "#800080",
    "#ffc0cb",
  ];
  useEffect(() => {
    // Update the height state whenever the whiteboardOpen state changes

    if (whiteboardOpen) {
      canvasRef.current.style.height = height;
    }
    else{
      canvasRef.current.style.height = '100%';
    }
  }, [whiteboardOpen]);
  return (
    <div
      className={`flex flex-col w-[calc(100%-10px)] h-[${height}] absolute z-10 pb-16 sm:pb-4 md:pb-4 pr-6`}
    >
      {/* Header Toolbar */}
      {!whiteboardOpen && (
        <div className=" shadow-lg border-b border-gray-200 p-4">
          <div className="flex items-center justify-between flex-wrap gap-4">
            {/* Drawing Tools */}
            <div className="flex items-center gap-2 bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setTool("pen")}
                className={`p-2 rounded-md transition-all ${
                  tool === "pen"
                    ? "bg-blue-500 text-white shadow-md"
                    : "text-gray-600 hover:bg-gray-200"
                }`}
                title="Pen Tool"
              >
                ✏️
              </button>

              <button
                onClick={() => setTool("eraser")}
                className={`p-2 rounded-md transition-all ${
                  tool === "eraser"
                    ? "bg-red-500 text-white shadow-md"
                    : "text-gray-600 hover:bg-gray-200"
                }`}
                title="Eraser"
              >
                🧽
              </button>

              <button
                onClick={() => setTool("select")}
                className={`p-2 rounded-md transition-all ${
                  tool === "select"
                    ? "bg-green-500 text-white shadow-md"
                    : "text-gray-600 hover:bg-gray-200"
                }`}
                title="Select"
              >
                📦
              </button>
            </div>

            {/* Shape Tools */}
            <div className="flex items-center gap-2 bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setTool("rectangle")}
                className={`p-2 rounded-md transition-all ${
                  tool === "rectangle"
                    ? "bg-purple-500 text-white shadow-md"
                    : "text-gray-600 hover:bg-gray-200"
                }`}
                title="Rectangle"
              >
                ⬜
              </button>

              <button
                onClick={() => setTool("circle")}
                className={`p-2 rounded-md transition-all ${
                  tool === "circle"
                    ? "bg-purple-500 text-white shadow-md"
                    : "text-gray-600 hover:bg-gray-200"
                }`}
                title="Circle"
              >
                ⭕
              </button>

              <button
                onClick={() => setTool("line")}
                className={`p-2 rounded-md transition-all ${
                  tool === "line"
                    ? "bg-purple-500 text-white shadow-md"
                    : "text-gray-600 hover:bg-gray-200"
                }`}
                title="Line"
              >
                📏
              </button>

              <button
                onClick={() => setTool("arrow")}
                className={`p-2 rounded-md transition-all ${
                  tool === "arrow"
                    ? "bg-purple-500 text-white shadow-md"
                    : "text-gray-600 hover:bg-gray-200"
                }`}
                title="Arrow"
              >
                ➡️
              </button>
            </div>

            {/* Color Picker */}
            <div className="flex items-center gap-2 bg-gray-100 rounded-lg p-2">
              <input
                type="color"
                value={color}
                onChange={(e) => setColor(e.target.value)}
                className="w-8 h-8 rounded border-2 border-gray-300 cursor-pointer"
                title="Color Picker"
              />

              <div className="flex gap-1">
                {presetColors.map((presetColor) => (
                  <button
                    key={presetColor}
                    onClick={() => setColor(presetColor)}
                    className={`w-6 h-6 rounded-full border-2 hover:scale-110 transition-transform ${
                      color === presetColor
                        ? "border-gray-600"
                        : "border-gray-300"
                    }`}
                    style={{ backgroundColor: presetColor }}
                    title={`Color: ${presetColor}`}
                  />
                ))}
              </div>
            </div>

            {/* Brush Size */}
            <div className="flex items-center gap-2 bg-gray-100 rounded-lg px-3 py-2">
              <span className="text-sm text-gray-600">Size:</span>
              <input
                type="range"
                min="1"
                max="20"
                value={brushSize}
                onChange={(e) => setBrushSize(parseInt(e.target.value))}
                className="w-20"
              />
              <span className="text-sm text-gray-600 w-6">{brushSize}</span>
            </div>

            {/* History Controls */}
            <div className="flex items-center gap-2">
              <button
                onClick={undo}
                disabled={historyIndex <= 0}
                className="p-2 bg-gray-200 rounded-md hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
                title="Undo"
              >
                ↶
              </button>
              <button
                onClick={redo}
                disabled={historyIndex >= history.length - 1}
                className="p-2 bg-gray-200 rounded-md hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
                title="Redo"
              >
                ↷
              </button>
            </div>

            {/* Selection Actions */}
            {(selection || clipboard) && (
              <div className="flex items-center gap-2 bg-gray-100 rounded-lg p-1">
                {selection && (
                  <>
                    <button
                      onClick={copySelection}
                      className="p-2 rounded-md text-gray-600 hover:bg-gray-200"
                      title="Copy"
                    >
                      📋
                    </button>
                    <button
                      onClick={deleteSelection}
                      className="p-2 rounded-md text-gray-600 hover:bg-gray-200"
                      title="Delete"
                    >
                      🗑️
                    </button>
                  </>
                )}
                {clipboard && (
                  <button
                    onClick={pasteSelection}
                    className={`p-2 rounded-md transition-all ${
                      pasteMode
                        ? "bg-orange-500 text-white"
                        : "text-gray-600 hover:bg-gray-200"
                    }`}
                    title={pasteMode ? "Click to place" : "Paste"}
                  >
                    📝
                  </button>
                )}
              </div>
            )}

            {/* Paste Mode Indicator */}
            {pasteMode && (
              <div className="flex items-center gap-2 bg-orange-100 rounded-lg p-2 border border-orange-300">
                <span className="text-sm text-orange-800">
                  {pastePreview ? "Click to place" : "Move to position"}
                </span>
                <button
                  onClick={() => {
                    setPasteMode(false);
                    setPastePreview(null);
                    setIsDraggingPaste(false);
                  }}
                  className="text-orange-600 hover:text-orange-800"
                  title="Cancel"
                >
                  ❌
                </button>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex items-center gap-2">
              <button
                onClick={clearCanvas}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                title="Clear Canvas"
              >
                🗑️ Clear
              </button>

              <button
                onClick={downloadCanvas}
                className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                title="Download"
              >
                💾 Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Canvas Container */}
      <div className={`flex-1 h-[${height}]`}>
        <canvas
          ref={canvasRef}
          className={`w-full h-[${height}] ${getCursor()}`}
          style={{
            touchAction: "none",
            background: "transparent",
          }}
        />
      </div>

      {/* Status Bar */}
      <div className="bg-gray-100 px-4 py-2 text-sm text-gray-600 border-t">
        Tool: <span className="font-semibold capitalize">{tool}</span> | Size:{" "}
        <span className="font-semibold">{brushSize}px</span> | History:{" "}
        <span className="font-semibold">
          {historyIndex + 1}/{history.length}
        </span>
        {pasteMode && (
          <span className="ml-4 text-orange-600 font-semibold">
            📝 Paste Mode Active
          </span>
        )}
      </div>
    </div>
  );
}

// import { useEffect, useRef, useState } from "react";
// import OverlayWhiteboard from "./OverlayWhiteboard";

// export default function Whiteboard() {
//   const canvasRef = useRef(null);
//   const [isDrawing, setIsDrawing] = useState(false);
//   const [tool, setTool] = useState('pen');
//   const [color, setColor] = useState('#000000');
//   const [brushSize, setBrushSize] = useState(0.1);
//   const [drawingData, setDrawingData] = useState(null);

//   // Selection and shapes state
//   const [isSelecting, setIsSelecting] = useState(false);
//   const [selection, setSelection] = useState(null);
//   const [clipboard, setClipboard] = useState(null);
//   const [startPoint, setStartPoint] = useState(null);
//   const [pasteMode, setPasteMode] = useState(false);
//   const [pastePreview, setPastePreview] = useState(null);
//   const [isDraggingPaste, setIsDraggingPaste] = useState(false);

//   useEffect(() => {
//     const canvas = canvasRef.current;
//     const ctx = canvas.getContext("2d");

//     const resize = () => {
//       const container = canvas.parentElement;

//       let currentDrawing = null;
//       if (canvas.width > 0 && canvas.height > 0) {
//         currentDrawing = canvas.toDataURL();
//       }

//       canvas.width = container.clientWidth;
//       canvas.height = container.clientHeight;

//       const dataToRestore = currentDrawing || drawingData;
//       if (dataToRestore && canvas.width > 0 && canvas.height > 0) {
//         const img = new Image();
//         img.onload = () => {
//           ctx.drawImage(img, 0, 0);
//         };
//         img.src = dataToRestore;
//       }
//     };

//     resize();
//     window.addEventListener("resize", resize);

//     const getCoordinates = (e) => {
//       const rect = canvas.getBoundingClientRect();
//       return {
//         x: e.clientX - rect.left,
//         y: e.clientY - rect.top
//       };
//     };

//     const redrawCanvas = () => {
//       ctx.clearRect(0, 0, canvas.width, canvas.height);
//       if (drawingData) {
//         const img = new Image();
//         img.onload = () => {
//           ctx.drawImage(img, 0, 0);
//           // Redraw selection box after restoring content
//           if (selection && tool === 'select') {
//             drawSelectionBox();
//           }
//           // Draw paste preview if in paste mode
//           if (pastePreview && pasteMode) {
//             drawPastePreview(pastePreview.x, pastePreview.y);
//           }
//         };
//         img.src = drawingData;
//       } else {
//         // If no drawing data, still show paste preview
//         if (pastePreview && pasteMode) {
//           drawPastePreview(pastePreview.x, pastePreview.y);
//         }
//       }
//     };

//     const drawSelectionBox = () => {
//       if (!selection) return;
//       ctx.save();
//       ctx.strokeStyle = '#0066cc';
//       ctx.lineWidth = 2;
//       ctx.setLineDash([5, 5]);
//       ctx.strokeRect(
//         Math.min(selection.startX, selection.endX),
//         Math.min(selection.startY, selection.endY),
//         Math.abs(selection.endX - selection.startX),
//         Math.abs(selection.endY - selection.startY)
//       );
//       ctx.restore();
//     };

//     const drawShape = (start, end, finalize = false) => {
//       ctx.save();
//       ctx.strokeStyle = color;
//       ctx.lineWidth = brushSize;
//       ctx.lineCap = "round";
//       ctx.lineJoin = "round";

//       switch (tool) {
//         case 'rectangle':
//           ctx.strokeRect(start.x, start.y, end.x - start.x, end.y - start.y);
//           break;
//         case 'circle':
//           const radius = Math.sqrt(Math.pow(end.x - start.x, 2) + Math.pow(end.y - start.y, 2));
//           ctx.beginPath();
//           ctx.arc(start.x, start.y, radius, 0, 2 * Math.PI);
//           ctx.stroke();
//           break;
//         case 'line':
//           ctx.beginPath();
//           ctx.moveTo(start.x, start.y);
//           ctx.lineTo(end.x, end.y);
//           ctx.stroke();
//           break;
//         case 'arrow':
//           const headlen = 10;
//           const dx = end.x - start.x;
//           const dy = end.y - start.y;
//           const angle = Math.atan2(dy, dx);

//           ctx.beginPath();
//           ctx.moveTo(start.x, start.y);
//           ctx.lineTo(end.x, end.y);
//           ctx.lineTo(end.x - headlen * Math.cos(angle - Math.PI / 6), end.y - headlen * Math.sin(angle - Math.PI / 6));
//           ctx.moveTo(end.x, end.y);
//           ctx.lineTo(end.x - headlen * Math.cos(angle + Math.PI / 6), end.y - headlen * Math.sin(angle + Math.PI / 6));
//           ctx.stroke();
//           break;
//       }
//       ctx.restore();
//     };

//     const startDraw = (e) => {
//       const coords = getCoordinates(e);
//       setStartPoint(coords);

//       // Handle paste mode
//       if (pasteMode && clipboard) {
//         if (!pastePreview) {
//           // First click - show preview at mouse position
//           setPastePreview({ x: coords.x, y: coords.y });
//           setIsDraggingPaste(true);
//           redrawCanvas();
//           return;
//         } else {
//           // Second click or after dragging - finalize paste
//           const canvas = canvasRef.current;
//           const ctx = canvas.getContext("2d");
//           ctx.putImageData(clipboard.imageData, pastePreview.x, pastePreview.y);

//           if (canvas.width > 0 && canvas.height > 0) {
//             setDrawingData(canvas.toDataURL());
//           }
//           setPasteMode(false);
//           setPastePreview(null);
//           setIsDraggingPaste(false);
//           return;
//         }
//       }

//       if (tool === 'select') {
//         setIsSelecting(true);
//         setSelection({ startX: coords.x, startY: coords.y, endX: coords.x, endY: coords.y });
//         return;
//       }

//       if (['rectangle', 'circle', 'line', 'arrow'].includes(tool)) {
//         setIsDrawing(true);
//         return;
//       }

//       setIsDrawing(true);
//       ctx.beginPath();
//       ctx.moveTo(coords.x, coords.y);
//     };

//     const draw = (e) => {
//       const coords = getCoordinates(e);

//       // Handle paste preview dragging
//       if (pasteMode && isDraggingPaste && pastePreview) {
//         setPastePreview({ x: coords.x, y: coords.y });
//         redrawCanvas();
//         return;
//       }

//       // Handle paste preview hover (when not dragging)
//       if (pasteMode && !isDraggingPaste && !pastePreview) {
//         setPastePreview({ x: coords.x, y: coords.y });
//         redrawCanvas();
//         return;
//       }

//       if (tool === 'select' && isSelecting) {
//         setSelection(prev => ({ ...prev, endX: coords.x, endY: coords.y }));
//         // For selection, just redraw and show selection box without clearing permanent content
//         redrawCanvas();
//         return;
//       }

//       if (['rectangle', 'circle', 'line', 'arrow'].includes(tool) && isDrawing) {
//         // For shapes, redraw canvas and show preview
//         redrawCanvas();
//         setTimeout(() => drawShape(startPoint, coords), 0);
//         return;
//       }

//       if (!isDrawing || ['select'].includes(tool)) return;

//       // For free drawing (pen/eraser), don't clear canvas
//       ctx.lineTo(coords.x, coords.y);

//       if (tool === 'eraser') {
//         ctx.globalCompositeOperation = 'destination-out';
//         ctx.lineWidth = brushSize * 5;
//       } else {
//         ctx.globalCompositeOperation = 'source-over';
//         ctx.strokeStyle = color;
//         ctx.lineWidth = brushSize / 10;
//       }

//       ctx.lineCap = "round";
//       ctx.lineJoin = "round";
//       ctx.stroke();
//     };

//     const stopDraw = (e) => {
//       // Stop paste dragging
//       if (isDraggingPaste) {
//         setIsDraggingPaste(false);
//         return;
//       }

//       if (tool === 'select' && isSelecting) {
//         setIsSelecting(false);
//         return;
//       }

//       if (['rectangle', 'circle', 'line', 'arrow'].includes(tool) && isDrawing) {
//         const coords = getCoordinates(e);
//         // Draw the final shape directly on canvas
//         drawShape(startPoint, coords, true);
//         setIsDrawing(false);
//         // Save the canvas state after drawing the shape
//         if (canvas.width > 0 && canvas.height > 0) {
//           setDrawingData(canvas.toDataURL());
//         }
//         return;
//       }

//       if (isDrawing && !['select'].includes(tool)) {
//         setIsDrawing(false);
//         ctx.closePath();
//         // Save canvas state after each drawing stroke
//         if (canvas.width > 0 && canvas.height > 0) {
//           setDrawingData(canvas.toDataURL());
//         }
//       }
//     };

//     canvas.addEventListener("mousedown", startDraw);
//     canvas.addEventListener("mousemove", draw);
//     canvas.addEventListener("mouseup", stopDraw);
//     canvas.addEventListener("mouseleave", stopDraw);

//     return () => {
//       window.removeEventListener("resize", resize);
//       canvas.removeEventListener("mousedown", startDraw);
//       canvas.removeEventListener("mousemove", draw);
//       canvas.removeEventListener("mouseup", stopDraw);
//       canvas.removeEventListener("mouseleave", stopDraw);
//     };
//   }, [isDrawing, isSelecting, tool, color, brushSize, drawingData, selection, startPoint, pasteMode, pastePreview, isDraggingPaste]);

//   const clearCanvas = () => {
//     const canvas = canvasRef.current;
//     const ctx = canvas.getContext("2d");
//     ctx.clearRect(0, 0, canvas.width, canvas.height);
//     setDrawingData(null);
//     setSelection(null);
//   };

//   const copySelection = () => {
//     if (!selection) return;

//     const canvas = canvasRef.current;
//     const ctx = canvas.getContext("2d");

//     const x = Math.min(selection.startX, selection.endX);
//     const y = Math.min(selection.startY, selection.endY);
//     const width = Math.abs(selection.endX - selection.startX);
//     const height = Math.abs(selection.endY - selection.startY);

//     if (width > 0 && height > 0) {
//       const imageData = ctx.getImageData(x, y, width, height);
//       setClipboard({ imageData, width, height });
//     }
//   };

//   const pasteSelection = () => {
//     if (!clipboard) return;
//     setPasteMode(true);
//     setPastePreview(null);
//     setIsDraggingPaste(false);
//   };

//   const deleteSelection = () => {
//     if (!selection) return;

//     const canvas = canvasRef.current;
//     const ctx = canvas.getContext("2d");

//     const x = Math.min(selection.startX, selection.endX);
//     const y = Math.min(selection.startY, selection.endY);
//     const width = Math.abs(selection.endX - selection.startX);
//     const height = Math.abs(selection.endY - selection.startY);

//     ctx.clearRect(x, y, width, height);
//     setSelection(null);

//     if (canvas.width > 0 && canvas.height > 0) {
//       setDrawingData(canvas.toDataURL());
//     }
//   };

//   const downloadCanvas = () => {
//     const canvas = canvasRef.current;
//     const link = document.createElement('a');
//     link.download = 'whiteboard.png';
//     link.href = canvas.toDataURL('image/png');
//     link.click();
//   };

//   const getCursor = () => {
//     if (pasteMode) return 'cursor-copy';
//     switch (tool) {
//       case 'pen': return 'cursor-crosshair';
//       case 'eraser': return 'cursor-cell';
//       case 'select': return 'cursor-pointer';
//       case 'rectangle':
//       case 'circle':
//       case 'line':
//       case 'arrow': return 'cursor-crosshair';
//       default: return 'cursor-default';
//     }
//   };

//   const presetColors = ['#000000', '#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff', '#ffa500'];

//   return (
//     <div className="flex flex-col w-full h-[calc(100vh-4rem)] inset-0 z-50 pointer-events-none border border-gray-300">
//       {/* Header - Semi-transparent */}
//       <div className="bg-white/80 backdrop-blur-sm shadow-lg border-b border-gray-200/50 pointer-events-auto">
//         <div className="flex items-center justify-between px-6 py-4">
//           {/* Toolbar */}
//           <div className="flex items-center gap-4 flex-wrap">
//             {/* Drawing Tools */}
//             <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm rounded-lg p-1 border border-gray-200/50">
//               <button
//                 onClick={() => setTool('pen')}
//                 className={`p-2 rounded-md transition-all ${
//                   tool === 'pen'
//                     ? 'bg-blue-500 text-white shadow-md'
//                     : 'text-gray-600 hover:bg-gray-200/50'
//                 }`}
//                 title="Pen Tool"
//               >
//                 <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
//                 </svg>
//               </button>

//               <button
//                 onClick={() => setTool('eraser')}
//                 className={`p-2 rounded-md transition-all ${
//                   tool === 'eraser'
//                     ? 'bg-red-500 text-white shadow-md'
//                     : 'text-gray-600 hover:bg-gray-200/50'
//                 }`}
//                 title="Eraser Tool"
//               >
//                 <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
//                 </svg>
//               </button>

//               <button
//                 onClick={() => setTool('select')}
//                 className={`p-2 rounded-md transition-all ${
//                   tool === 'select'
//                     ? 'bg-green-500 text-white shadow-md'
//                     : 'text-gray-600 hover:bg-gray-200/50'
//                 }`}
//                 title="Selection Tool"
//               >
//                 <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
//                 </svg>
//               </button>
//             </div>

//             {/* Shape Tools */}
//             <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm rounded-lg p-1 border border-gray-200/50">
//               <button
//                 onClick={() => setTool('rectangle')}
//                 className={`p-2 rounded-md transition-all ${
//                   tool === 'rectangle'
//                     ? 'bg-purple-500 text-white shadow-md'
//                     : 'text-gray-600 hover:bg-gray-200/50'
//                 }`}
//                 title="Rectangle"
//               >
//                 <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
//                 </svg>
//               </button>

//               <button
//                 onClick={() => setTool('circle')}
//                 className={`p-2 rounded-md transition-all ${
//                   tool === 'circle'
//                     ? 'bg-purple-500 text-white shadow-md'
//                     : 'text-gray-600 hover:bg-gray-200/50'
//                 }`}
//                 title="Circle"
//               >
//                 <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <circle cx="12" cy="12" r="10"/>
//                 </svg>
//               </button>

//               <button
//                 onClick={() => setTool('line')}
//                 className={`p-2 rounded-md transition-all ${
//                   tool === 'line'
//                     ? 'bg-purple-500 text-white shadow-md'
//                     : 'text-gray-600 hover:bg-gray-200/50'
//                 }`}
//                 title="Line"
//               >
//                 <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14" />
//                 </svg>
//               </button>

//               <button
//                 onClick={() => setTool('arrow')}
//                 className={`p-2 rounded-md transition-all ${
//                   tool === 'arrow'
//                     ? 'bg-purple-500 text-white shadow-md'
//                     : 'text-gray-600 hover:bg-gray-200/50'
//                 }`}
//                 title="Arrow"
//               >
//                 <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
//                 </svg>
//               </button>
//             </div>

//             {/* Selection Actions */}
//             {(selection || clipboard) && (
//               <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm rounded-lg p-1 border border-gray-200/50">
//                 {selection && (
//                   <>
//                     <button
//                       onClick={copySelection}
//                       className="p-2 rounded-md text-gray-600 hover:bg-gray-200/50 transition-all"
//                       title="Copy Selection"
//                     >
//                       <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
//                       </svg>
//                     </button>
//                     <button
//                       onClick={deleteSelection}
//                       className="p-2 rounded-md text-gray-600 hover:bg-gray-200/50 transition-all"
//                       title="Delete Selection"
//                     >
//                       <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
//                       </svg>
//                     </button>
//                   </>
//                 )}
//                 {clipboard && (
//                   <button
//                     onClick={pasteSelection}
//                     className={`p-2 rounded-md transition-all ${
//                       pasteMode
//                         ? 'bg-orange-500 text-white shadow-md'
//                         : 'text-gray-600 hover:bg-gray-200/50'
//                     }`}
//                     title={pasteMode ? "Drag to position, click to place" : "Paste"}
//                   >
//                     <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
//                     </svg>
//                   </button>
//                 )}
//               </div>
//             )}

//             {/* Add cancel paste mode button */}
//             {pasteMode && (
//               <div className="flex items-center gap-2 bg-orange-100 backdrop-blur-sm rounded-lg p-2 border border-orange-300">
//                 <span className="text-sm text-orange-800">
//                   {pastePreview ? "Drag to position, click to place" : "Move mouse to position"}
//                 </span>
//                 <button
//                   onClick={() => {
//                     setPasteMode(false);
//                     setPastePreview(null);
//                     setIsDraggingPaste(false);
//                   }}
//                   className="p-1 rounded-md text-orange-600 hover:bg-orange-200 transition-all"
//                   title="Cancel Paste"
//                 >
//                   <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//                   </svg>
//                 </button>
//               </div>
//             )}
//             <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm rounded-lg p-2 border border-gray-200/50">
//               <input
//                 type="color"
//                 value={color}
//                 onChange={(e) => setColor(e.target.value)}
//                 className="w-6 h-6 rounded border-2 border-gray-300 cursor-pointer hover:scale-110 transition-transform"
//                 title="Color Picker"
//               />

//               <div className="flex gap-1">
//                 {presetColors.map((presetColor) => (
//                   <button
//                     key={presetColor}
//                     onClick={() => setColor(presetColor)}
//                     className={`w-4 h-4 rounded-full border-2 hover:scale-110 transition-transform ${
//                       color === presetColor ? 'border-gray-400' : 'border-gray-200'
//                     }`}
//                     style={{ backgroundColor: presetColor }}
//                     title={`Color: ${presetColor}`}
//                   />
//                 ))}
//               </div>
//             </div>

//             {/* Brush Size */}
//             <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm rounded-lg px-3 py-2 border border-gray-200/50">
//               <span className="text-sm text-gray-600">Size:</span>
//               <input
//                 type="range"
//                 min="1"
//                 max="10"
//                 value={brushSize}
//                 onChange={(e) => setBrushSize(parseInt(e.target.value))}
//                 className="w-20 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
//               />
//               <span className="text-sm text-gray-600 w-6">{brushSize}</span>
//             </div>

//             {/* Action Buttons */}
//             <div className="flex items-center gap-2">
//               <button
//                 onClick={clearCanvas}
//                 className="px-4 py-2 bg-red-500/90 text-white rounded-lg hover:bg-red-600 transition-colors flex items-center gap-2 backdrop-blur-sm"
//                 title="Clear Canvas"
//               >
//                 <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
//                 </svg>
//                 Clear
//               </button>

//               <button
//                 onClick={downloadCanvas}
//                 className="px-4 py-2 bg-green-500/90 text-white rounded-lg hover:bg-green-600 transition-colors flex items-center gap-2 backdrop-blur-sm"
//                 title="Download Canvas"
//               >
//                 <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2v-9a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
//                 </svg>
//                 Save
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Canvas Container - Transparent */}
//       <div className="flex-1 pointer-events-none">
//         <div className="relative w-full h-full pointer-events-none">
//           {/* <OverlayWhiteboard /> */}
//           <canvas
//             ref={canvasRef}
//             className={`absolute inset-0 w-full h-full pointer-events-auto ${getCursor()}`}
//             style={{
//               background: 'transparent',
//               touchAction: 'none'
//             }}
//             onWheel={(e) => e.stopPropagation()}
//           />
//         </div>
//       </div>

//       {/* Custom Slider Styles */}
//       <style jsx>{`
//         .slider::-webkit-slider-thumb {
//           appearance: none;
//           width: 16px;
//           height: 16px;
//           border-radius: 50%;
//           background: #3b82f6;
//           cursor: pointer;
//           box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
//         }

//         .slider::-moz-range-thumb {
//           width: 16px;
//           height: 16px;
//           border-radius: 50%;
//           background: #3b82f6;
//           cursor: pointer;
//           border: none;
//           box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
//         }
//       `}</style>
//     </div>
//   );
// }

// // import { useEffect, useRef, useState } from "react";

// // export default function Whiteboard() {
// //   const canvasRef = useRef(null);
// //   const [isDrawing, setIsDrawing] = useState(false);
// //   const [tool, setTool] = useState('pen');
// //   const [color, setColor] = useState('#000000');
// //   const [brushSize, setBrushSize] = useState(0.1);
// //   const [drawingData, setDrawingData] = useState(null); // Store drawing data

// //   useEffect(() => {
// //     const canvas = canvasRef.current;
// //     const ctx = canvas.getContext("2d");

// //     const resize = () => {
// //       const container = canvas.parentElement;

// //       // Save current drawing before resize (only if canvas has valid dimensions)
// //       let currentDrawing = null;
// //       if (canvas.width > 0 && canvas.height > 0) {
// //         currentDrawing = canvas.toDataURL();
// //       }

// //       canvas.width = container.clientWidth;
// //       canvas.height = container.clientHeight;

// //       // Restore drawing after resize (use current drawing or stored drawing data)
// //       const dataToRestore = currentDrawing || drawingData;
// //       if (dataToRestore && canvas.width > 0 && canvas.height > 0) {
// //         const img = new Image();
// //         img.onload = () => {
// //           ctx.drawImage(img, 0, 0);
// //         };
// //         img.src = dataToRestore;
// //       }
// //     };

// //     resize();
// //     window.addEventListener("resize", resize);

// //     const getCoordinates = (e) => {
// //       const rect = canvas.getBoundingClientRect();
// //       return {
// //         x: e.clientX - rect.left,
// //         y: e.clientY - rect.top
// //       };
// //     };

// //     const startDraw = (e) => {
// //       setIsDrawing(true);
// //       const coords = getCoordinates(e);
// //       ctx.beginPath();
// //       ctx.moveTo(coords.x, coords.y);
// //     };

// //     const draw = (e) => {
// //       if (!isDrawing) return;

// //       const coords = getCoordinates(e);
// //       ctx.lineTo(coords.x, coords.y);

// //       if (tool === 'eraser') {
// //         ctx.globalCompositeOperation = 'destination-out';
// //         ctx.lineWidth = brushSize * 3;
// //       } else {
// //         ctx.globalCompositeOperation = 'source-over';
// //         ctx.strokeStyle = color;
// //         ctx.lineWidth = brushSize;
// //       }

// //       ctx.lineCap = "round";
// //       ctx.lineJoin = "round";
// //       ctx.stroke();
// //     };

// //     const stopDraw = () => {
// //       if (isDrawing) {
// //         setIsDrawing(false);
// //         ctx.closePath();
// //         // Save drawing data after each stroke (only if canvas has valid dimensions)
// //         if (canvas.width > 0 && canvas.height > 0) {
// //           setDrawingData(canvas.toDataURL());
// //         }
// //       }
// //     };

// //     canvas.addEventListener("mousedown", startDraw);
// //     canvas.addEventListener("mousemove", draw);
// //     canvas.addEventListener("mouseup", stopDraw);
// //     canvas.addEventListener("mouseleave", stopDraw);

// //     return () => {
// //       window.removeEventListener("resize", resize);
// //       canvas.removeEventListener("mousedown", startDraw);
// //       canvas.removeEventListener("mousemove", draw);
// //       canvas.removeEventListener("mouseup", stopDraw);
// //       canvas.removeEventListener("mouseleave", stopDraw);
// //     };
// //   }, [isDrawing, tool, color, brushSize]);

// //   const clearCanvas = () => {
// //     const canvas = canvasRef.current;
// //     const ctx = canvas.getContext("2d");
// //     // Clear the canvas completely (making it transparent)
// //     ctx.clearRect(0, 0, canvas.width, canvas.height);
// //   };

// //   const downloadCanvas = () => {
// //     const canvas = canvasRef.current;
// //     const link = document.createElement('a');
// //     link.download = 'whiteboard.png';
// //     link.href = canvas.toDataURL('image/png'); // PNG supports transparency
// //     link.click();
// //   };

// //   const presetColors = ['#000000', '#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff', '#ffa500'];

// //   return (
// //     <div className="flex flex-col w-full h-[calc(100vh-4rem)] inset-0 z-50 pointer-events-none border border-gray-300 ">
// //       {/* Header - Semi-transparent */}
// //       <div className="bg-white/80 backdrop-blur-sm shadow-lg border-b border-gray-200/50 pointer-events-auto">
// //         <div className="flex items-center justify-between px-6 py-4 ">
// //           {/* Toolbar */}
// //           <div className="flex items-center gap-4 ">
// //             {/* Drawing Tools */}
// //             <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm rounded-lg p-1 border border-gray-200/50  ">
// //               <button
// //                 onClick={() => setTool('pen')}
// //                 className={`p-2 rounded-md transition-all ${
// //                   tool === 'pen'
// //                     ? 'bg-blue-500 text-white shadow-md'
// //                     : 'text-gray-600 hover:bg-gray-200/50'
// //                 }`}
// //                 title="Pen Tool"
// //               >
// //                 <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// //                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
// //                 </svg>
// //               </button>

// //               <button
// //                 onClick={() => setTool('eraser')}
// //                 className={`p-2 rounded-md transition-all ${
// //                   tool === 'eraser'
// //                     ? 'bg-red-500 text-white shadow-md'
// //                     : 'text-gray-600 hover:bg-gray-200/50'
// //                 }`}
// //                 title="Eraser Tool"
// //               >
// //                 <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// //                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
// //                 </svg>
// //               </button>
// //             </div>

// //             {/* Color Picker */}
// //             <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm rounded-lg p-2 border border-gray-200/50">
// //               <input
// //                 type="color"
// //                 value={color}
// //                 onChange={(e) => setColor(e.target.value)}
// //                 className="w-6 h-6 rounded border-2 border-gray-300 cursor-pointer hover:scale-110 transition-transform"
// //                 title="Color Picker"
// //               />

// //               {/* Preset Colors */}
// //               <div className="flex gap-1">
// //                 {presetColors.map((presetColor) => (
// //                   <button
// //                     key={presetColor}
// //                     onClick={() => setColor(presetColor)}
// //                     className={`w-4 h-4 rounded-full border-2 hover:scale-110 transition-transform ${
// //                       color === presetColor ? 'border-gray-400' : 'border-gray-200'
// //                     }`}
// //                     style={{ backgroundColor: presetColor }}
// //                     title={`Color: ${presetColor}`}
// //                   />
// //                 ))}
// //               </div>
// //             </div>

// //             {/* Brush Size */}
// //             <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm rounded-lg px-3 py-2 border border-gray-200/50">
// //               <span className="text-sm text-gray-600">Size:</span>
// //               <input
// //                 type="range"
// //                 min="1"
// //                 max="10"
// //                 value={brushSize}
// //                 onChange={(e) => setBrushSize(parseInt(e.target.value))}
// //                 className="w-20 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
// //               />
// //               <span className="text-sm text-gray-600 w-6">{brushSize}</span>
// //             </div>

// //             {/* Action Buttons */}
// //             <div className="flex items-center gap-2">
// //               <button
// //                 onClick={clearCanvas}
// //                 className="px-4 py-2 bg-red-500/90 text-white rounded-lg hover:bg-red-600 transition-colors flex items-center gap-2 backdrop-blur-sm"
// //                 title="Clear Canvas"
// //               >
// //                 <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// //                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
// //                 </svg>
// //                 Clear
// //               </button>

// //               <button
// //                 onClick={downloadCanvas}
// //                 className="px-4 py-2 bg-green-500/90 text-white rounded-lg hover:bg-green-600 transition-colors flex items-center gap-2 backdrop-blur-sm"
// //                 title="Download Canvas"
// //               >
// //                 <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// //                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2v-9a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
// //                 </svg>
// //                 Save
// //               </button>
// //             </div>
// //           </div>
// //         </div>
// //       </div>

// //       {/* Canvas Container - Transparent */}
// //       <div className="flex-1 pointer-events-none">
// //         <div className="relative w-full h-full pointer-events-none">
// //           <canvas
// //             ref={canvasRef}
// //             className={`absolute inset-0 w-full h-full pointer-events-auto ${
// //               tool === 'pen' ? 'cursor-crosshair' : 'cursor-cell'
// //             }`}
// //             style={{
// //               background: 'transparent',
// //               touchAction: 'none'
// //             }}
// //             onWheel={(e) => e.stopPropagation()} // Allow scrolling to pass through when not drawing}
// //           />

// //           {/* Canvas Overlay Info */}
// //           {/* <div className="absolute top-4 left-4 bg-black/40 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm">
// //             {tool === 'pen' ? `Drawing with ${color}` : 'Erasing'} • Size: {brushSize}px
// //           </div> */}
// //         </div>
// //       </div>

// //       {/* Custom Slider Styles */}
// //       <style jsx>{`
// //         .slider::-webkit-slider-thumb {
// //           appearance: none;
// //           width: 16px;
// //           height: 16px;
// //           border-radius: 50%;
// //           background: #3b82f6;
// //           cursor: pointer;
// //           box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
// //         }

// //         .slider::-moz-range-thumb {
// //           width: 16px;
// //           height: 16px;
// //           border-radius: 50%;
// //           background: #3b82f6;
// //           cursor: pointer;
// //           border: none;
// //           box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
// //         }
// //       `}</style>
// //     </div>
// //   );
// // }

// // // import { useEffect, useRef, useState } from "react";

// // // export default function Whiteboard() {
// // //   const canvasRef = useRef(null);
// // //   const [isDrawing, setIsDrawing] = useState(false);
// // //   const [tool, setTool] = useState('pen');
// // //   const [color, setColor] = useState('#000000');
// // //   const [brushSize, setBrushSize] = useState(2);
// // //   const [backgroundColor, setBackgroundColor] = useState('#ffffff');

// // //   useEffect(() => {
// // //     const canvas = canvasRef.current;
// // //     const ctx = canvas.getContext("2d");

// // //     const resize = () => {
// // //       const container = canvas.parentElement;
// // //       canvas.width = container.clientWidth;
// // //       canvas.height = container.clientHeight;

// // //       // Set background
// // //       ctx.fillStyle = backgroundColor;
// // //       ctx.fillRect(0, 0, canvas.width, canvas.height);
// // //     };

// // //     resize();
// // //     window.addEventListener("resize", resize);

// // //     const getCoordinates = (e) => {
// // //       const rect = canvas.getBoundingClientRect();
// // //       return {
// // //         x: e.clientX - rect.left,
// // //         y: e.clientY - rect.top
// // //       };
// // //     };

// // //     const startDraw = (e) => {
// // //       setIsDrawing(true);
// // //       const coords = getCoordinates(e);
// // //       ctx.beginPath();
// // //       ctx.moveTo(coords.x, coords.y);
// // //     };

// // //     const draw = (e) => {
// // //       if (!isDrawing) return;

// // //       const coords = getCoordinates(e);
// // //       ctx.lineTo(coords.x, coords.y);

// // //       if (tool === 'eraser') {
// // //         ctx.globalCompositeOperation = 'destination-out';
// // //         ctx.lineWidth = brushSize * 3;
// // //       } else {
// // //         ctx.globalCompositeOperation = 'source-over';
// // //         ctx.strokeStyle = color;
// // //         ctx.lineWidth = brushSize;
// // //       }

// // //       ctx.lineCap = "round";
// // //       ctx.lineJoin = "round";
// // //       ctx.stroke();
// // //     };

// // //     const stopDraw = () => {
// // //       setIsDrawing(false);
// // //       ctx.closePath();
// // //     };

// // //     canvas.addEventListener("mousedown", startDraw);
// // //     canvas.addEventListener("mousemove", draw);
// // //     canvas.addEventListener("mouseup", stopDraw);
// // //     canvas.addEventListener("mouseleave", stopDraw);

// // //     return () => {
// // //       window.removeEventListener("resize", resize);
// // //       canvas.removeEventListener("mousedown", startDraw);
// // //       canvas.removeEventListener("mousemove", draw);
// // //       canvas.removeEventListener("mouseup", stopDraw);
// // //       canvas.removeEventListener("mouseleave", stopDraw);
// // //     };
// // //   }, [isDrawing, tool, color, brushSize, backgroundColor]);

// // //   const clearCanvas = () => {
// // //     const canvas = canvasRef.current;
// // //     const ctx = canvas.getContext("2d");
// // //     ctx.fillStyle = backgroundColor;
// // //     ctx.fillRect(0, 0, canvas.width, canvas.height);
// // //   };

// // //   const downloadCanvas = () => {
// // //     const canvas = canvasRef.current;
// // //     const link = document.createElement('a');
// // //     link.download = 'whiteboard.png';
// // //     link.href = canvas.toDataURL();
// // //     link.click();
// // //   };

// // //   const presetColors = ['#000000', '#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff', '#ffa500'];

// // //   return (
// // //     <div className="flex flex-col h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
// // //       {/* Header */}
// // //       <div className="bg-white/90 backdrop-blur-sm shadow-lg border-b border-gray-200/50">
// // //         <div className="flex items-center justify-between px-6 py-4">
// // //           <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
// // //             Modern Whiteboard
// // //           </h1>

// // //           {/* Toolbar */}
// // //           <div className="flex items-center gap-4">
// // //             {/* Drawing Tools */}
// // //             <div className="flex items-center gap-2 bg-gray-100 rounded-lg p-1">
// // //               <button
// // //                 onClick={() => setTool('pen')}
// // //                 className={`p-2 rounded-md transition-all ${
// // //                   tool === 'pen'
// // //                     ? 'bg-blue-500 text-white shadow-md'
// // //                     : 'text-gray-600 hover:bg-gray-200'
// // //                 }`}
// // //                 title="Pen Tool"
// // //               >
// // //                 <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// // //                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
// // //                 </svg>
// // //               </button>

// // //               <button
// // //                 onClick={() => setTool('eraser')}
// // //                 className={`p-2 rounded-md transition-all ${
// // //                   tool === 'eraser'
// // //                     ? 'bg-red-500 text-white shadow-md'
// // //                     : 'text-gray-600 hover:bg-gray-200'
// // //                 }`}
// // //                 title="Eraser Tool"
// // //               >
// // //                 <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// // //                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
// // //                 </svg>
// // //               </button>
// // //             </div>

// // //             {/* Color Picker */}
// // //             <div className="flex items-center gap-2">
// // //               <input
// // //                 type="color"
// // //                 value={color}
// // //                 onChange={(e) => setColor(e.target.value)}
// // //                 className="w-10 h-10 rounded-full border-2 border-gray-300 cursor-pointer hover:scale-110 transition-transform"
// // //                 title="Color Picker"
// // //               />

// // //               {/* Preset Colors */}
// // //               <div className="flex gap-1">
// // //                 {presetColors.map((presetColor) => (
// // //                   <button
// // //                     key={presetColor}
// // //                     onClick={() => setColor(presetColor)}
// // //                     className={`w-6 h-6 rounded-full border-2 hover:scale-110 transition-transform ${
// // //                       color === presetColor ? 'border-gray-400' : 'border-gray-200'
// // //                     }`}
// // //                     style={{ backgroundColor: presetColor }}
// // //                     title={`Color: ${presetColor}`}
// // //                   />
// // //                 ))}
// // //               </div>
// // //             </div>

// // //             {/* Brush Size */}
// // //             <div className="flex items-center gap-2 bg-gray-100 rounded-lg px-3 py-2">
// // //               <span className="text-sm text-gray-600">Size:</span>
// // //               <input
// // //                 type="range"
// // //                 min="1"
// // //                 max="50"
// // //                 value={brushSize}
// // //                 onChange={(e) => setBrushSize(parseInt(e.target.value))}
// // //                 className="w-20 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
// // //               />
// // //               <span className="text-sm text-gray-600 w-6">{brushSize}</span>
// // //             </div>

// // //             {/* Background Color */}
// // //             <div className="flex items-center gap-2">
// // //               <span className="text-sm text-gray-600">Background:</span>
// // //               <input
// // //                 type="color"
// // //                 value={backgroundColor}
// // //                 onChange={(e) => setBackgroundColor(e.target.value)}
// // //                 className="w-8 h-8 rounded border-2 border-gray-300 cursor-pointer"
// // //                 title="Background Color"
// // //               />
// // //             </div>

// // //             {/* Action Buttons */}
// // //             <div className="flex items-center gap-2">
// // //               <button
// // //                 onClick={clearCanvas}
// // //                 className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors flex items-center gap-2"
// // //                 title="Clear Canvas"
// // //               >
// // //                 <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// // //                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
// // //                 </svg>
// // //                 Clear
// // //               </button>

// // //               <button
// // //                 onClick={downloadCanvas}
// // //                 className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors flex items-center gap-2"
// // //                 title="Download Canvas"
// // //               >
// // //                 <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// // //                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2v-9a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
// // //                 </svg>
// // //                 Save
// // //               </button>
// // //             </div>
// // //           </div>
// // //         </div>
// // //       </div>

// // //       {/* Canvas Container */}
// // //       <div className="flex-1 p-6">
// // //         <div className="relative w-full h-full bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-200">
// // //           <canvas
// // //             ref={canvasRef}
// // //             className={`absolute inset-0 w-full h-full ${
// // //               tool === 'pen' ? 'cursor-crosshair' : 'cursor-cell'
// // //             }`}
// // //             style={{
// // //               background: 'transparent',
// // //               touchAction: 'none' // Prevent scrolling on touch devices
// // //             }}
// // //           />

// // //           {/* Canvas Overlay Info */}
// // //           <div className="absolute top-4 left-4 bg-black/20 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm">
// // //             {tool === 'pen' ? `Drawing with ${color}` : 'Erasing'} • Size: {brushSize}px
// // //           </div>
// // //         </div>
// // //       </div>

// // //       {/* Custom Slider Styles */}
// // //       <style jsx>{`
// // //         .slider::-webkit-slider-thumb {
// // //           appearance: none;
// // //           width: 16px;
// // //           height: 16px;
// // //           border-radius: 50%;
// // //           background: #3b82f6;
// // //           cursor: pointer;
// // //           box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
// // //         }

// // //         .slider::-moz-range-thumb {
// // //           width: 16px;
// // //           height: 16px;
// // //           border-radius: 50%;
// // //           background: #3b82f6;
// // //           cursor: pointer;
// // //           border: none;
// // //           box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
// // //         }
// // //       `}</style>
// // //     </div>
// // //   );
// // // }

// // // // // Whiteboard.jsx
// // // // import { useEffect, useRef, useState } from "react";

// // // // export default function Whiteboard() {
// // // //   const canvasRef = useRef(null);
// // // //   const [drawing, setDrawing] = useState(false);

// // // //   useEffect(() => {
// // // //     const canvas = canvasRef.current;
// // // //     const ctx = canvas.getContext("2d");

// // // //     const resize = () => {
// // // //       canvas.width = window.innerWidth;
// // // //       canvas.height = window.innerHeight;
// // // //     };
// // // //     resize();
// // // //     window.addEventListener("resize", resize);

// // // //     const startDraw = (e) => {
// // // //       setDrawing(true);
// // // //       ctx.beginPath();
// // // //       ctx.moveTo(e.clientX, e.clientY);
// // // //     };

// // // //     const draw = (e) => {
// // // //       if (!drawing) return;
// // // //       ctx.lineTo(e.clientX, e.clientY);
// // // //       ctx.strokeStyle = "#000";
// // // //       ctx.lineWidth = 2;
// // // //       ctx.lineCap = "round";
// // // //       ctx.stroke();
// // // //     };

// // // //     const stopDraw = () => {
// // // //       setDrawing(false);
// // // //       ctx.closePath();
// // // //     };

// // // //     canvas.addEventListener("mousedown", startDraw);
// // // //     canvas.addEventListener("mousemove", draw);
// // // //     canvas.addEventListener("mouseup", stopDraw);
// // // //     canvas.addEventListener("mouseleave", stopDraw);

// // // //     return () => {
// // // //       window.removeEventListener("resize", resize);
// // // //       canvas.removeEventListener("mousedown", startDraw);
// // // //       canvas.removeEventListener("mousemove", draw);
// // // //       canvas.removeEventListener("mouseup", stopDraw);
// // // //       canvas.removeEventListener("mouseleave", stopDraw);
// // // //     };
// // // //   }, [drawing]);

// // // //   return (
// // // //     <canvas
// // // //       ref={canvasRef}
// // // //       className="fixed w-full h-full z-[9999] pointer-events-auto"
// // // //       style={{ background: "transparent" }}
// // // //     />
// // // //   );
// // // // }
