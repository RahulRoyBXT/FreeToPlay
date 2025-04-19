"use client";
import React, { useState } from "react";
import { FaServer, FaWindows, FaDownload } from "react-icons/fa";
import { SystemRequirementsProps } from "./types";
import SystemRequirementItem from "./SystemRequirementItem";

const SystemRequirements: React.FC<SystemRequirementsProps> = ({ requirements }) => {
  const [showSystemReq, setShowSystemReq] = useState<boolean>(false);
  
  return (
    <div className={`bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-sm rounded-xl border border-gray-700 overflow-hidden transition-all duration-300 ${showSystemReq ? 'shadow-lg shadow-purple-500/10' : ''}`}>
      <button 
        onClick={() => setShowSystemReq(!showSystemReq)}
        className="w-full px-6 py-4 flex items-center justify-between text-left"
      >
        <div className="flex items-center gap-2">
          <FaServer className="text-purple-400" />
          <h3 className="font-bold text-white">System Requirements</h3>
        </div>
        <div className={`transform transition-transform duration-300 ${showSystemReq ? 'rotate-180' : ''}`}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M2 5L8 11L14 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </button>
      
      <div className={`transition-all duration-300 overflow-hidden ${
        showSystemReq ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'
      }`}>
        <div className="px-6 pb-5 space-y-4">
          <SystemRequirementItem 
            icon={<FaWindows className="text-blue-400" />}
            title="Operating System"
            value={requirements?.os || "Not specified"}
          />
          
          <SystemRequirementItem 
            icon={
              <svg className="text-green-400" width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M17 8H7V16H17V8Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M7 12H4V20H20V12H17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            }
            title="Memory"
            value={requirements?.memory || "Not specified"}
          />
          
          <SystemRequirementItem 
            icon={
              <svg className="text-red-400" width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5 12H19M5 12L9 8M5 12L9 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            }
            title="Processor"
            value={requirements?.processor || "Not specified"}
          />
          
          <SystemRequirementItem 
            icon={
              <svg className="text-purple-400" width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9.5 7L5.5 11L9.5 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M14.5 7L18.5 11L14.5 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            }
            title="Graphics"
            value={requirements?.graphics || "Not specified"}
          />
          
          <SystemRequirementItem 
            icon={<FaDownload className="text-yellow-400" />}
            title="Storage"
            value={requirements?.storage || "Not specified"}
          />
        </div>
      </div>
    </div>
  );
};

export default SystemRequirements;