import React, { useState, useRef, useEffect } from 'react';
import { 
  Pen, 
  Eraser, 
  MousePointer, 
  Square, 
  Circle, 
  Triangle,
  Minus,
  Type,
  Image,
  Download,
  Upload,
  Trash2,
  Undo,
  Redo,
  Palette,
  Grid3x3,
  Layers,
  FileText,
  Menu,
  X
} from 'lucide-react';

const OverlayWhiteboard = () => {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [tool, setTool] = useState('pen');
  const [color, setColor] = useState('#000000');
  const [strokeWidth, setStrokeWidth] = useState(0.5);
  const [isAnnotationMode, setIsAnnotationMode] = useState(false);
  const [history, setHistory] = useState([]);
  const [historyStep, setHistoryStep] = useState(-1);
  const [showTools, setShowTools] = useState(true);
  const [fillColor, setFillColor] = useState('transparent');
  const [backgroundColor, setBackgroundColor] = useState('transparent');
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [showBgPicker, setShowBgPicker] = useState(false);
  const [showFillPicker, setShowFillPicker] = useState(false);
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });
  const contextRef = useRef(null);

  // Predefined colors
  const colors = ['#000000', '#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff', '#ffffff'];
  const bgPatterns = ['transparent', '#ffffff', '#f0f0f0', '#e0e0e0'];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.width = parent.innerWidth;
    canvas.height = parent.innerHeight;

    const context = canvas.getContext('2d');
    context.lineCap = 'round';
    context.lineJoin = 'round';
    contextRef.current = context;

    // Load initial state
    saveToHistory();
  }, []);

  useEffect(() => {
    const handleResize = () => {
      const canvas = canvasRef.current;
      const context = contextRef.current;
      if (!canvas || !context) return;

      // Save current canvas content
      const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
      
      // Resize canvas
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      
      // Restore content
      context.putImageData(imageData, 0, 0);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const saveToHistory = () => {
    if (!canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const newHistory = history.slice(0, historyStep + 1);
    newHistory.push(canvas.toDataURL());
    setHistory(newHistory);
    setHistoryStep(newHistory.length - 1);
  };

  const undo = () => {
    if (historyStep > 0) {
      const newStep = historyStep - 1;
      setHistoryStep(newStep);
      const img = new Image();
      img.src = history[newStep];
      img.onload = () => {
        const context = contextRef.current;
        context.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
        context.drawImage(img, 0, 0);
      };
    }
  };

  const redo = () => {
    if (historyStep < history.length - 1) {
      const newStep = historyStep + 1;
      setHistoryStep(newStep);
      const img = new Image();
      img.src = history[newStep];
      img.onload = () => {
        const context = contextRef.current;
        context.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
        context.drawImage(img, 0, 0);
      };
    }
  };

  const clearCanvas = () => {
    const context = contextRef.current;
    context.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    saveToHistory();
  };

  const startDrawing = (e) => {
    if (!isAnnotationMode) return;
    
    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    setStartPos({ x, y });
    setIsDrawing(true);
    
    const context = contextRef.current;
    context.beginPath();
    context.moveTo(x, y);
    
    if (tool === 'eraser') {
      context.globalCompositeOperation = 'destination-out';
      context.lineWidth = strokeWidth * 2;
    } else {
      context.globalCompositeOperation = 'source-over';
      context.strokeStyle = color;
      context.lineWidth = strokeWidth;
      context.fillStyle = fillColor;
    }
  };

  const draw = (e) => {
    if (!isDrawing || !isAnnotationMode) return;
    
    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const context = contextRef.current;
    
    switch (tool) {
      case 'pen':
        context.lineTo(x, y);
        context.stroke();
        break;
      case 'eraser':
        context.lineTo(x, y);
        context.stroke();
        break;
      case 'rectangle':
      case 'circle':
      case 'triangle':
      case 'line':
        // Clear and redraw for shapes
        const imageData = context.getImageData(0, 0, canvasRef.current.width, canvasRef.current.height);
        context.putImageData(imageData, 0, 0);
        drawShape(startPos.x, startPos.y, x, y);
        break;
    }
  };

  const drawShape = (startX, startY, endX, endY) => {
    const context = contextRef.current;
    context.beginPath();
    
    switch (tool) {
      case 'rectangle':
        const width = endX - startX;
        const height = endY - startY;
        context.rect(startX, startY, width, height);
        break;
      case 'circle':
        const radius = Math.sqrt(Math.pow(endX - startX, 2) + Math.pow(endY - startY, 2));
        context.arc(startX, startY, radius, 0, 2 * Math.PI);
        break;
      case 'triangle':
        context.moveTo(startX, startY);
        context.lineTo(endX, endY);
        context.lineTo(startX - (endX - startX), endY);
        context.closePath();
        break;
      case 'line':
        context.moveTo(startX, startY);
        context.lineTo(endX, endY);
        break;
    }
    
    if (fillColor !== 'transparent' && tool !== 'line') {
      context.fill();
    }
    context.stroke();
  };

  const stopDrawing = () => {
    if (isDrawing) {
      setIsDrawing(false);
      saveToHistory();
    }
  };

  const downloadCanvas = () => {
    const link = document.createElement('a');
    link.download = 'whiteboard.png';
    link.href = canvasRef.current.toDataURL();
    link.click();
  };

  const uploadImage = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const context = contextRef.current;
        context.drawImage(img, 100, 100);
        saveToHistory();
      };
      img.src = event.target.result;
    };
    
    reader.readAsDataURL(file);
  };

  const ToolButton = ({ icon: Icon, toolName, title }) => (
    <button
      onClick={() => {
        setTool(toolName);
        setShowColorPicker(false);
        setShowBgPicker(false);
        setShowFillPicker(false);
      }}
      className={`p-2 rounded transition-all ${
        tool === toolName 
          ? 'bg-blue-500 text-white' 
          : 'bg-white hover:bg-gray-100 text-gray-700'
      }`}
      title={title}
    >
      <Icon size={20} />
    </button>
  );

  return (
    <div className=" inset-0">
      {/* Canvas Overlay */}
      <canvas
        ref={canvasRef}
        className={`absolute inset-0 ${
          isAnnotationMode 
            ? 'pointer-events-auto' 
            : 'pointer-events-none'
        }`}
        style={{ 
          backgroundColor: backgroundColor === 'transparent' ? 'transparent' : backgroundColor,
          cursor: isAnnotationMode ? (tool === 'pen' ? 'crosshair' : 'pointer') : 'default'
        }}
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={stopDrawing}
        onMouseLeave={stopDrawing}
      />

      {/* Control Panel */}
      <div className="absolute top-4 left-0 pointer-events-auto">
        <div className={`bg-gray-100 rounded-lg shadow-lg p-2 transition-all ${
          showTools ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}>
          {/* Mode Toggle */}
          <div className="mb-2 p-2 bg-white rounded">
            <label className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={isAnnotationMode}
                onChange={(e) => setIsAnnotationMode(e.target.checked)}
                className="sr-only"
              />
              <div className={`relative w-10 h-6 rounded-full transition-colors ${
                isAnnotationMode ? 'bg-blue-500' : 'bg-gray-300'
              }`}>
                <div className={`absolute w-4 h-4 bg-white rounded-full top-1 transition-transform ${
                  isAnnotationMode ? 'translate-x-5' : 'translate-x-1'
                }`} />
              </div>
              <span className="ml-2 text-sm font-medium">
                {isAnnotationMode ? 'Annotation Mode' : 'Browsing Mode'}
              </span>
            </label>
          </div>

          {/* Tools */}
          {isAnnotationMode && (
            <>
              <div className="flex gap-1 mb-2">
                <ToolButton icon={MousePointer} toolName="select" title="Select" />
                <ToolButton icon={Pen} toolName="pen" title="Pen" />
                <ToolButton icon={Eraser} toolName="eraser" title="Eraser" />
              </div>

              <div className="flex gap-1 mb-2">
                <ToolButton icon={Square} toolName="rectangle" title="Rectangle" />
                <ToolButton icon={Circle} toolName="circle" title="Circle" />
                <ToolButton icon={Triangle} toolName="triangle" title="Triangle" />
                <ToolButton icon={Minus} toolName="line" title="Line" />
              </div>

              <div className="flex gap-1 mb-2">
                <ToolButton icon={Type} toolName="text" title="Text" />
                <label className="p-2 bg-white hover:bg-gray-100 rounded cursor-pointer" title="Upload Image">
                  <Image size={20} className="text-gray-700" />
                  <input type="file" accept="image/*" onChange={uploadImage} className="hidden" />
                </label>
              </div>

              {/* Color Pickers */}
              <div className="flex gap-1 mb-2">
                <div className="relative">
                  <button
                    onClick={() => {
                      setShowColorPicker(!showColorPicker);
                      setShowBgPicker(false);
                      setShowFillPicker(false);
                    }}
                    className="p-2 bg-white hover:bg-gray-100 rounded flex items-center gap-1"
                    title="Stroke Color"
                  >
                    <div className="w-4 h-4 rounded border" style={{ backgroundColor: color }} />
                    <Palette size={16} />
                  </button>
                  {showColorPicker && (
                    <div className="absolute top-full left-0 mt-1 p-2 bg-white rounded shadow-lg grid grid-cols-4 gap-1">
                      {colors.map(c => (
                        <button
                          key={c}
                          onClick={() => {
                            setColor(c);
                            setShowColorPicker(false);
                          }}
                          className="w-6 h-6 rounded border"
                          style={{ backgroundColor: c }}
                        />
                      ))}
                    </div>
                  )}
                </div>

                <div className="relative">
                  <button
                    onClick={() => {
                      setShowFillPicker(!showFillPicker);
                      setShowColorPicker(false);
                      setShowBgPicker(false);
                    }}
                    className="p-2 bg-white hover:bg-gray-100 rounded"
                    title="Fill Color"
                  >
                    <div className="w-4 h-4 rounded border" style={{ 
                      backgroundColor: fillColor === 'transparent' ? 'white' : fillColor,
                      backgroundImage: fillColor === 'transparent' ? 'linear-gradient(45deg, #ccc 25%, transparent 25%), linear-gradient(-45deg, #ccc 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #ccc 75%), linear-gradient(-45deg, transparent 75%, #ccc 75%)' : 'none',
                      backgroundSize: '8px 8px',
                      backgroundPosition: '0 0, 0 4px, 4px -4px, -4px 0px'
                    }} />
                  </button>
                  {showFillPicker && (
                    <div className="absolute top-full left-0 mt-1 p-2 bg-white rounded shadow-lg grid grid-cols-4 gap-1">
                      <button
                        onClick={() => {
                          setFillColor('transparent');
                          setShowFillPicker(false);
                        }}
                        className="w-6 h-6 rounded border bg-white"
                        style={{
                          backgroundImage: 'linear-gradient(45deg, #ccc 25%, transparent 25%), linear-gradient(-45deg, #ccc 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #ccc 75%), linear-gradient(-45deg, transparent 75%, #ccc 75%)',
                          backgroundSize: '8px 8px',
                          backgroundPosition: '0 0, 0 4px, 4px -4px, -4px 0px'
                        }}
                      />
                      {colors.filter(c => c !== '#ffffff').map(c => (
                        <button
                          key={c}
                          onClick={() => {
                            setFillColor(c);
                            setShowFillPicker(false);
                          }}
                          className="w-6 h-6 rounded border"
                          style={{ backgroundColor: c }}
                        />
                      ))}
                    </div>
                  )}
                </div>

                <div className="relative">
                  <button
                    onClick={() => {
                      setShowBgPicker(!showBgPicker);
                      setShowColorPicker(false);
                      setShowFillPicker(false);
                    }}
                    className="p-2 bg-white hover:bg-gray-100 rounded"
                    title="Background"
                  >
                    <Grid3x3 size={20} />
                  </button>
                  {showBgPicker && (
                    <div className="absolute top-full left-0 mt-1 p-2 bg-white rounded shadow-lg grid grid-cols-2 gap-1">
                      {bgPatterns.map(bg => (
                        <button
                          key={bg}
                          onClick={() => {
                            setBackgroundColor(bg);
                            setShowBgPicker(false);
                          }}
                          className="w-12 h-8 rounded border"
                          style={{ 
                            backgroundColor: bg === 'transparent' ? 'white' : bg,
                            backgroundImage: bg === 'transparent' ? 'linear-gradient(45deg, #ccc 25%, transparent 25%), linear-gradient(-45deg, #ccc 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #ccc 75%), linear-gradient(-45deg, transparent 75%, #ccc 75%)' : 'none',
                            backgroundSize: '8px 8px',
                            backgroundPosition: '0 0, 0 4px, 4px -4px, -4px 0px'
                          }}
                        />
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Stroke Width */}
              <div className="mb-2 p-2 bg-white rounded">
                <label className="text-xs text-gray-600">Stroke Width: {strokeWidth}px</label>
                <input
                  type="range"
                  min="1"
                  max="20"
                  value={strokeWidth}
                  onChange={(e) => setStrokeWidth(parseInt(e.target.value))}
                  className="w-full"
                />
              </div>

              {/* Action Buttons */}
              <div className="flex gap-1">
                <button
                  onClick={undo}
                  disabled={historyStep <= 0}
                  className="p-2 bg-white hover:bg-gray-100 rounded disabled:opacity-50"
                  title="Undo"
                >
                  <Undo size={20} />
                </button>
                <button
                  onClick={redo}
                  disabled={historyStep >= history.length - 1}
                  className="p-2 bg-white hover:bg-gray-100 rounded disabled:opacity-50"
                  title="Redo"
                >
                  <Redo size={20} />
                </button>
                <button
                  onClick={clearCanvas}
                  className="p-2 bg-white hover:bg-gray-100 rounded"
                  title="Clear"
                >
                  <Trash2 size={20} />
                </button>
                <button
                  onClick={downloadCanvas}
                  className="p-2 bg-white hover:bg-gray-100 rounded"
                  title="Download"
                >
                  <Download size={20} />
                </button>
              </div>
            </>
          )}
        </div>

        {/* Toggle Tools Button */}
        <button
          onClick={() => setShowTools(!showTools)}
          className="mt-2 p-2 bg-blue-500 text-white rounded-full shadow-lg hover:bg-blue-600"
        >
          {showTools ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>
    </div>
  );
};

export default OverlayWhiteboard;