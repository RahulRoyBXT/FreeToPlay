"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { MainGameType } from "./types";
import GameHeader from "./GameHeader";
import ScreenshotShowcase from "./ScreenshotShowcase";
import GameInformation from "./GameInformation";
import SystemRequirements from "./SystemRequirements";
import ScreenshotGrid from "./ScreenshotGrid";

const MainGamePage: React.FC<MainGameType> = ({ data }) => {
  const [linkInfo, setLinkInfo] = useState<boolean>(false);
  const [activeScreenshot, setActiveScreenshot] = useState<number>(0);
  const router = useRouter();

  // Cycle through screenshots every 8 seconds
  useEffect(() => {
    // Check if screenshots array exists and has items
    if (!data.screenshots || data.screenshots.length === 0) return;
    
    const interval = setInterval(() => {
      setActiveScreenshot(prev => 
        prev >= data.screenshots.length - 1 ? 0 : prev + 1
      );
    }, 8000);
    
    return () => clearInterval(interval);
  }, [data.screenshots]);

  return (
    <div className={`min-h-screen bg-gradient-to-b from-gray-900 via-gray-900 to-black pt-16 px-4 md:px-0`}>
      <GameHeader 
        title={data.title} 
        gameUrl={data.game_url}
        linkInfo={linkInfo}
        setLinkInfo={setLinkInfo}
        router={router}
      />
      
      <div className="container mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Game details - Left column */}
        <div className="lg:col-span-2 space-y-6">
          <ScreenshotShowcase 
            screenshots={data.screenshots} 
            thumbnail={data.thumbnail}
            title={data.title}
            activeScreenshot={activeScreenshot}
            setActiveScreenshot={setActiveScreenshot}
          />
          
          <GameInformation 
            data={data}
          />
        </div>
        
        {/* Right column - System Requirements and Screenshots */}
        <div className="space-y-6">
          <SystemRequirements 
            requirements={data.minimum_system_requirements}
          />
          
          <ScreenshotGrid 
            screenshots={data.screenshots}
            title={data.title}
            activeScreenshot={activeScreenshot}
            setActiveScreenshot={setActiveScreenshot}
          />
        </div>
      </div>
    </div>
  );
};

export default MainGamePage;