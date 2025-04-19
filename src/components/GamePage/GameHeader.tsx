"use client";
import React from "react";
import { GameHeaderProps } from "./types";
import { IoIosArrowRoundBack } from "react-icons/io";
import { FaExternalLinkAlt } from "react-icons/fa";

const GameHeader: React.FC<GameHeaderProps> = ({ 
  title, 
  gameUrl, 
  linkInfo, 
  setLinkInfo, 
  router 
}) => {
  return (
    <div className="container mx-auto mb-6 mt-4">
      <div className="flex items-center justify-between">
        <button 
          onClick={() => router.back()} 
          className="flex items-center gap-1 text-gray-400 hover:text-purple-400 transition-colors"
        >
          <IoIosArrowRoundBack size={28} />
          <span>Back to games</span>
        </button>
        
        <div className="hidden md:block">
          <div className="relative px-4 py-2">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-lg blur-sm"></div>
            <h1 className="relative text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400">
              {title}
            </h1>
          </div>
        </div>
        
        <a
          href={gameUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="relative px-4 py-2 overflow-hidden rounded-lg group"
          onMouseEnter={() => setLinkInfo(true)}
          onMouseLeave={() => setLinkInfo(false)}
        >
          <span className="absolute inset-0 w-0 bg-gradient-to-r from-purple-600 to-pink-600 transition-all duration-300 ease-out group-hover:w-full"></span>
          <span className="relative flex items-center gap-2 text-gray-300 group-hover:text-white">
            <FaExternalLinkAlt />
            {linkInfo ? "Play Now" : ""}
          </span>
        </a>
      </div>
    </div>
  );
};

export default GameHeader;