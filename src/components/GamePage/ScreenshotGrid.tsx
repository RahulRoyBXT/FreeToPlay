"use client";
import React from "react";
import Image from "next/image";
import { FaGamepad } from "react-icons/fa";
import { ScreenshotGridProps } from "./types";

const ScreenshotGrid: React.FC<ScreenshotGridProps> = ({ 
  screenshots, 
  title, 
  activeScreenshot, 
  setActiveScreenshot 
}) => {
  return (
    <div className="bg-gray-800/40 backdrop-blur-sm rounded-xl border border-gray-700 p-5">
      <h3 className="font-bold text-white mb-4 flex items-center gap-2">
        <FaGamepad className="text-purple-400" />
        Screenshots
      </h3>
      
      <div className="grid grid-cols-2 gap-3">
        {screenshots && screenshots.length > 0 ? (
          screenshots.map((screenshot, idx) => (
            <button 
              key={screenshot.id}
              onClick={() => setActiveScreenshot(idx)}
              className={`aspect-video rounded-lg overflow-hidden border-2 transition-all duration-300 relative
                          ${activeScreenshot === idx 
                            ? 'border-purple-500 scale-[1.02] shadow-md shadow-purple-500/30' 
                            : 'border-transparent hover:border-purple-500/50'}`}
            >
              <Image 
                src={screenshot.image} 
                alt={`${title} screenshot ${idx + 1}`} 
                fill
                className="object-cover"
              />
            </button>
          ))
        ) : (
          <div className="col-span-2 text-center text-gray-400 py-4">
            No screenshots available
          </div>
        )}
      </div>
    </div>
  );
};

export default ScreenshotGrid;