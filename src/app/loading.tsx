'use client'

import React from 'react'
import NavBar from '@/components/NavBar'

// Create an array of 20 items for skeleton placeholders
const limitedGames: number[] = Array.from({ length: 20 }, (_, index) => index + 1)

export default function Loading() {

  return (
    <>
      <NavBar />
      
      {/* Game card skeletons */}
      <div className="pt-35 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-4">
        {limitedGames.map((game) => (
          <div key={game} className="relative overflow-hidden bg-gray-800/40 rounded-lg shadow-lg backdrop-blur-sm group">
            {/* Animated gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 animate-pulse" />
            
            {/* Skeleton thumbnail */}
            <div className="relative h-48 w-full bg-gray-700/40 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-600/30 to-transparent animate-shimmer" 
                   style={{ backgroundSize: '200% 100%', animation: 'shimmer 2s infinite' }} />
            </div>
            
            {/* Skeleton text content */}
            <div className="p-4 space-y-3">
              <div className="h-5 w-3/4 bg-gray-700/60 rounded animate-pulse"></div>
              <div className="h-4 w-1/2 bg-gray-700/40 rounded animate-pulse"></div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Add keyframes for the shimmer animation */}
      <style jsx global>{`
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        .animate-shimmer {
          animation: shimmer 2s infinite linear;
        }
      `}</style>
    </>
  )
}

