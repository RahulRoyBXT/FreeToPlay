"use client";
import React from "react";
import { FaWindows, FaChrome } from "react-icons/fa";
import { GameStatsProps } from "./types";

const GameStats: React.FC<GameStatsProps> = ({ data }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-2">
      <div className="flex flex-col">
        <span className="text-gray-400 text-xs">Release Date</span>
        <span className="text-white font-medium">{data.release_date}</span>
      </div>
      <div className="flex flex-col">
        <span className="text-gray-400 text-xs">Publisher</span>
        <span className="text-white font-medium">{data.publisher}</span>
      </div>
      <div className="flex flex-col">
        <span className="text-gray-400 text-xs">Developer</span>
        <span className="text-white font-medium">{data.developer}</span>
      </div>
      <div className="flex flex-col">
        <span className="text-gray-400 text-xs">Platform</span>
        <span className="text-white font-medium flex items-center gap-1">
          {data.platform.toLowerCase().includes('pc') ? <FaWindows size={12} /> : <FaChrome size={12} />}
          {data.platform}
        </span>
      </div>
    </div>
  );
};

export default GameStats;