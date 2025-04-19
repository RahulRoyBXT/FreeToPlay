"use client";
import React from "react";
import { GameInformationProps } from "./types";
import { FaWindows, FaChrome } from "react-icons/fa";
import GameStats from "./GameStats";

const GameInformation: React.FC<GameInformationProps> = ({ data }) => {
  return (
    <div className="bg-gray-800/40 backdrop-blur-sm rounded-xl border border-gray-700 p-6 space-y-5">
      <div className="flex flex-wrap gap-2">
        <span className="px-3 py-1 rounded-full text-xs font-medium bg-purple-900/70 border border-purple-700/50">
          {data.genre}
        </span>
        <span className="px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1 bg-gray-800 border border-gray-700">
          {data.platform.toLowerCase().includes('pc') ? <FaWindows className="text-blue-400" /> : <FaChrome className="text-yellow-400" />}
          {data.platform}
        </span>
        <span className="px-3 py-1 rounded-full text-xs font-medium bg-gray-800 border border-gray-700 text-gray-300">
          {data.publisher}
        </span>
      </div>
      
      <h2 className="text-xl font-bold text-white mb-2 md:hidden">
        {data.title}
      </h2>
      
      <p className="text-gray-300 leading-relaxed">
        {data.description}
      </p>
      
      <GameStats data={data} />
    </div>
  );
};

export default GameInformation;