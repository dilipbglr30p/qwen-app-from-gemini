import React, { useState, useRef, useEffect } from 'react';
import { ChevronsLeftRight, Download, RefreshCw } from 'lucide-react';

interface ComparisonViewProps {
  beforeImage: string;
  afterImage: string;
  onReset: () => void;
}

const ComparisonView: React.FC<ComparisonViewProps> = ({ beforeImage, afterImage, onReset }) => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isResizing, setIsResizing] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = () => setIsResizing(true);
  
  const handleMouseUp = () => setIsResizing(false);
  
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isResizing || !containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
    const percentage = (x / rect.width) * 100;
    
    setSliderPosition(percentage);
  };

  // Touch support for mobile
  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isResizing || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(e.touches[0].clientX - rect.left, rect.width));
    const percentage = (x / rect.width) * 100;
    setSliderPosition(percentage);
  };

  useEffect(() => {
    document.addEventListener('mouseup', handleMouseUp);
    return () => {
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  return (
    <div className="flex flex-col space-y-4 w-full">
      <div 
        ref={containerRef}
        className="relative w-full aspect-[4/3] rounded-xl overflow-hidden cursor-col-resize select-none border border-gray-200 shadow-md group"
        onMouseMove={handleMouseMove}
        onTouchMove={handleTouchMove}
        onMouseDown={handleMouseDown}
        onTouchStart={() => setIsResizing(true)}
        onTouchEnd={() => setIsResizing(false)}
      >
        {/* Background Image (After Result) */}
        <img 
          src={afterImage} 
          alt="After" 
          className="absolute inset-0 w-full h-full object-contain bg-white" 
        />
        <div className="absolute top-4 right-4 bg-indigo-600/90 backdrop-blur text-white text-xs px-2 py-1 rounded font-bold">
          AFTER
        </div>

        {/* Foreground Image (Before - clipped) */}
        <div 
          className="absolute inset-0 overflow-hidden border-r-2 border-white/50 bg-white"
          style={{ width: `${sliderPosition}%` }}
        >
          <img 
            src={beforeImage} 
            alt="Before" 
            className="absolute inset-0 w-full h-full object-contain"
            // We need to counter-act the width constraint so the image doesn't squash
            style={{ width: containerRef.current ? `${containerRef.current.offsetWidth}px` : '100%' }}
          />
          <div className="absolute top-4 left-4 bg-black/60 backdrop-blur text-white text-xs px-2 py-1 rounded font-bold">
            BEFORE
          </div>
        </div>

        {/* Slider Handle */}
        <div 
          className="absolute top-0 bottom-0 w-1 bg-white cursor-col-resize shadow-[0_0_10px_rgba(0,0,0,0.3)] flex items-center justify-center"
          style={{ left: `${sliderPosition}%` }}
        >
          <div className="w-8 h-8 bg-white rounded-full shadow-lg flex items-center justify-center text-indigo-600 -ml-3.5">
            <ChevronsLeftRight size={16} />
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex justify-between items-center bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
        <button 
          onClick={onReset}
          className="flex items-center space-x-2 text-gray-500 hover:text-gray-900 transition-colors px-3 py-2 rounded-lg hover:bg-gray-50"
        >
          <RefreshCw size={18} />
          <span className="text-sm font-medium">New Generation</span>
        </button>

        <a 
          href={afterImage} 
          download="ecommerce-edit.png"
          className="flex items-center space-x-2 bg-gray-900 text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors"
        >
          <Download size={18} />
          <span className="text-sm font-medium">Download HD</span>
        </a>
      </div>
    </div>
  );
};

export default ComparisonView;