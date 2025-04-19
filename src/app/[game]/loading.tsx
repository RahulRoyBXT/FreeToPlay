'use client'
import { Progress } from '@/components/ui/progress'
import React, { useEffect, useState } from 'react'

const Loading = () => {
  const [progress, setProgress] = useState(0)
  const [loadingText, setLoadingText] = useState('Loading game details')
  const [readyToTransition, setReadyToTransition] = useState(false)
  
  useEffect(() => {
    const texts = [
      'Loading game details',
      'Fetching screenshots',
      'Getting game info',
      'Almost ready'
    ]
    
    // Force a minimum loading time to ensure animation completes
    const minLoadTime = 3500; // 3.5 seconds minimum loading time
    
    // Set timer for minimum loading time
    const minLoadTimer = setTimeout(() => {
      setReadyToTransition(true);
    }, minLoadTime);
    
    // Progress animation logic
    const interval = setInterval(() => {
      setProgress(prevProgress => {
        // Update loading text at certain progress points
        if (prevProgress === 25) setLoadingText(texts[1])
        if (prevProgress === 50) setLoadingText(texts[2])
        if (prevProgress === 75) setLoadingText(texts[3])
        
        // When we get to 99, clear the interval and jump to 100 after a delay
        if (prevProgress >= 99) {
          clearInterval(interval);
          // Force to 100% after a short delay
          setTimeout(() => setProgress(100), 300);
          return 99;
        }
        
        // Increment at a pace that will take about 3.3 seconds to reach 99
        return prevProgress + 100/(minLoadTime/30 * 0.94);
      })
    }, 30)
    
    // Clear timers on unmount
    return () => {
      clearInterval(interval);
      clearTimeout(minLoadTimer);
    };
  }, [])
  
  // Prevent early navigation if loading animation hasn't completed
  useEffect(() => {
    if (progress === 100 && readyToTransition) {
      // We're ready to show the actual content
      console.log("Game detail loading animation complete");
    }
  }, [progress, readyToTransition]);
  
  return (
    <div className='min-h-screen bg-gradient-to-b from-gray-900 to-black flex flex-col justify-center items-center px-4'>
      <div className="w-full max-w-md space-y-6">
        <div className="flex items-center justify-center mb-8">
          <div className="relative">
            <div className="h-24 w-24 rounded-full border-t-4 border-b-4 border-purple-500 animate-spin"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <svg className="h-12 w-12 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
        </div>
        
        <h2 className="text-2xl font-bold text-center text-white mb-2">{loadingText}</h2>
        
        <div className="relative w-full">
          <Progress 
            value={progress} 
            className="w-full h-3 bg-gray-700/50 backdrop-blur-sm"
          />
          <span className="block text-sm font-medium text-white mt-2 text-right">
            {progress}%
          </span>
        </div>
        
        <div className="flex justify-center mt-8">
          <p className="text-sm text-gray-400 animate-pulse">
            Preparing an amazing gaming experience...
          </p>
        </div>
      </div>
    </div>
  )
}

export default Loading
