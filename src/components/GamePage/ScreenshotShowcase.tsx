"use client";
import React from "react";
import Image from "next/image";
import { ScreenshotShowcaseProps } from "./types";

const ScreenshotShowcase: React.FC<ScreenshotShowcaseProps> = ({ 
  screenshots, 
  thumbnail, 
  title, 
  activeScreenshot, 
  setActiveScreenshot 
}) => {
  return (
    <div className="relative aspect-video overflow-hidden rounded-xl border border-gray-700 shadow-lg shadow-purple-900/20 bg-black/40">
      <div className="relative w-full h-full">
        <Image 
          src={(screenshots && screenshots[activeScreenshot]?.image) || thumbnail} 
          alt={`${title} screenshot`}
          fill
          className="object-cover transition-transform duration-700 ease-in-out hover:scale-105"
        />
      </div>
      
      {/* Screenshot indicators */}
      {screenshots && screenshots.length > 0 && (
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {screenshots.map((_, idx) => (
            <button 
              key={idx}
              onClick={() => setActiveScreenshot(idx)}
              className={`w-2.5 h-2.5 rounded-full transition-all duration-300 
                        ${activeScreenshot === idx 
                          ? 'bg-purple-500 w-5' 
                          : 'bg-gray-500/50 hover:bg-gray-400/70'}`}
              aria-label={`View screenshot ${idx + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ScreenshotShowcase;