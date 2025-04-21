'use client'

import { Game } from "@/lib/types";
import Link from "next/link";
import { useCallback, useMemo, useState, useEffect } from "react";
import { FaArrowLeft, FaArrowRight, FaGamepad, FaDesktop, FaChrome } from "react-icons/fa";
import { DirectionAwareHover } from "./ui/direction-aware-hover";
import { useRouter, usePathname } from "next/navigation";
import { useAppSelector } from "@/lib/redux/hooks";

interface GameCardProps {
  games: Game[];
}

export const GameCard: React.FC<GameCardProps> = ({ games }) => {
  const router = useRouter();
  const pathname = usePathname();
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [animateCards, setAnimateCards] = useState(false);
  const [hoverCard, setHoverCard] = useState<number | null>(null);
  
  // Get search text and selected platform from Redux store
  const searchText = useAppSelector(state => state.search.searchText);
  const selectedPlatform = useAppSelector(state => state.platform.selectedPlatform);
  
  // Filter games based on search text and selected platform
  const filteredGames = useMemo(() => {
    return games.filter(game => {
      // Filter by platform if selected
      const platformMatch = selectedPlatform 
        ? game.platform.toLowerCase().includes(selectedPlatform.toLowerCase())
        : true;
      
      // Filter by search text if provided
      const searchMatch = searchText
        ? game.title.toLowerCase().includes(searchText.toLowerCase()) ||
          game.genre.toLowerCase().includes(searchText.toLowerCase()) ||
          game.publisher.toLowerCase().includes(searchText.toLowerCase())
        : true;
      
      return platformMatch && searchMatch;
    });
  }, [games, searchText, selectedPlatform]);
  
  // Reset to first page when filters change
  useEffect(() => {
    setPageNumber(1);
  }, [searchText, selectedPlatform]);
  
  // Fixed pagination calculation - was using pageNumber instead of perPage
  const perPage: number = 20;
  const startingIndex: number = (pageNumber - 1) * perPage;
  const totalPage: number = Math.ceil(filteredGames.length / perPage);

  // Show animation when component loads or page changes
  useEffect(() => {
    setAnimateCards(true);
    const timer = setTimeout(() => setAnimateCards(false), 800);
    return () => clearTimeout(timer);
  }, [pageNumber]);

  const limitedGames = useMemo(
    () => filteredGames.slice(startingIndex, startingIndex + perPage),
    [filteredGames, startingIndex, perPage]
  );

  const handleNextPage = useCallback(() => {
    if (pageNumber < totalPage) {
      setPageNumber((prev) => prev + 1);
    }
  }, [pageNumber, totalPage]);

  const handlePreviousPage = useCallback(() => {
    if (pageNumber > 1) {
      setPageNumber((prev) => prev - 1);
    }
  }, [pageNumber]);

  const isLastPage = pageNumber === totalPage;

  const getPlatformIcon = (platform: string) => {
    if (platform.toLowerCase().includes('pc')) return <FaDesktop />;
    if (platform.toLowerCase().includes('browser')) return <FaChrome />;
    return <FaGamepad />;
  };

  // Helper for game card animations
  const getAnimationDelay = (index: number) => {
    return `${(index % perPage) * 0.05}s`;
  };

  // Prefetch game data when hovering over a card for faster loading
  const handlePrefetchGame = (gameId: number) => {
    router.prefetch(`/${gameId}`);
    setHoverCard(gameId);
  };

  return (
    <div className="pt-20 pb-20 relative">
      {/* Gaming-themed section header */}
      <div className="mb-8 px-4">
        <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-500 to-pink-400 inline-block">
          Featured Games
        </h2>
        <div className="h-1 w-20 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-full mt-2"></div>
        <p className="text-gray-400 mt-2">
          {searchText || selectedPlatform ? (
            <>
              Found {filteredGames.length} game{filteredGames.length !== 1 ? 's' : ''}
              {selectedPlatform ? ` for ${selectedPlatform} platform` : ''}
              {searchText ? ` matching "${searchText}"` : ''}
            </>
          ) : (
            <>Explore {games.length} free-to-play games across multiple platforms</>
          )}
        </p>
      </div>

      {/* Empty state when no games match filters */}
      {filteredGames.length === 0 && (
        <div className="flex flex-col items-center justify-center min-h-[300px] bg-gray-800/30 backdrop-blur-sm rounded-xl border border-gray-700 mx-4">
          <div className="text-6xl mb-4">🎮</div>
          <h3 className="text-2xl font-bold text-gray-300 mb-2">No Games Found</h3>
          <p className="text-gray-400 text-center max-w-md mb-6">
            We couldn&apos;t find any games matching your current filters. Try adjusting your search or platform selection.
          </p>
        </div>
      )}

      {/* Gaming-styled grid with animations */}
      {filteredGames.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-4 relative">
          {limitedGames.map((game, index) => (
            <Link
              href={`/${game.id}`}
              key={game.id}
              onMouseEnter={() => handlePrefetchGame(game.id)}
              onMouseLeave={() => setHoverCard(null)}
              className={`block group relative min-h-[30dvh] bg-gray-800/80 rounded-xl overflow-hidden 
                        backdrop-blur-sm border border-gray-700 transition-all duration-300
                        hover:scale-[1.02] hover:shadow-lg hover:shadow-purple-500/20 
                        ${animateCards ? 'animate-fadeIn' : ''}`}
              style={{ 
                animationDelay: getAnimationDelay(index),
                transform: hoverCard === game.id ? 'scale(1.02)' : 'scale(1)'
              }}
            >
              {/* Game platform badge */}
              <div className="absolute top-3 left-3 z-20 bg-black/70 backdrop-blur-sm px-3 py-1 rounded-full 
                          text-xs flex items-center gap-1 text-gray-300 border border-gray-700">
                {getPlatformIcon(game.platform)}
                <span>{game.platform}</span>
              </div>
              
              {/* Genre badge */}
              <div className="absolute top-3 right-3 z-20 bg-purple-900/70 backdrop-blur-sm px-3 py-1 rounded-full 
                          text-xs border border-purple-700/50">
                {game.genre}
              </div>
              
              <DirectionAwareHover imageUrl={game.thumbnail}>
                <div className="space-y-2">
                  <h3 className="font-bold text-xl text-white/90 group-hover:text-white">{game.title}</h3>
                  <p className="font-normal text-sm text-gray-300">
                    <span className="text-gray-400">Publisher:</span> {game.publisher}
                  </p>
                </div>
              </DirectionAwareHover>
            </Link>
          ))}
        </div>
      )}

      {/* Gaming-themed pagination controller - only show if there are multiple pages */}
      {filteredGames.length > 0 && totalPage > 1 && (
        <div className="fixed bottom-8 right-8 z-50">
          <div className="flex items-center space-x-2 bg-gray-900/80 backdrop-blur-md p-1 rounded-full border border-purple-500/30 shadow-lg shadow-purple-500/10">
            <button
              onClick={handlePreviousPage}
              disabled={pageNumber <= 1}
              className="h-10 w-10 rounded-full flex items-center justify-center bg-gradient-to-br from-gray-800 to-gray-900 
                      hover:from-indigo-600 hover:to-purple-700 text-white transition-all duration-300
                      disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:from-gray-800 disabled:hover:to-gray-900"
            >
              <FaArrowLeft size={16} />
            </button>
            
            <div className="px-3 flex items-baseline">
              <span className="text-white font-mono text-lg font-bold">{pageNumber}</span>
              <span className="text-gray-400 mx-1">/</span>
              <span className="text-gray-400 font-mono">{totalPage}</span>
            </div>
            
            <button
              onClick={handleNextPage}
              disabled={isLastPage}
              className="h-10 w-10 rounded-full flex items-center justify-center bg-gradient-to-br from-gray-800 to-gray-900 
                      hover:from-indigo-600 hover:to-purple-700 text-white transition-all duration-300
                      disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:from-gray-800 disabled:hover:to-gray-900"
            >
              <FaArrowRight size={16} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
