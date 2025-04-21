import GamePage from "@/components/GamePage";
import { GameIdTypes } from "@/components/GamePage/types";
import type { Metadata } from "next";

async function getGameData(id: string): Promise<GameIdTypes> {
    const BaseUrl = process.env.NODE_ENV === 'production' ? process.env.NEXT_PUBLIC_BASE_URL : 'http://localhost:3000'

    const response = await fetch(`${BaseUrl}/api/v1/game/${id}`);
    
    if (!response.ok) {
        throw new Error(`Failed to fetch game data: ${response.status}`);
    }

    const result = await response.json();
    return result;
}

// This type is crucial for Next.js to understand the params structure
type GamePageParams = {
  params: Promise<{
    game: string;
  }>;
};

// Define proper metadata function to help with typing
export async function generateMetadata({ params }: GamePageParams): Promise<Metadata> {
  const resolvedParams = await params;
  return {
    title: `Game: ${resolvedParams.game}`,
  };
}

// Proper typing with the same interface
export default async function GameDetailPage({ params }: GamePageParams) {
  const resolvedParams = await params;
  const { game } = resolvedParams;

  // Fetch game data on the server
  const gameData = await getGameData(game);
  
  return <GamePage id={game} gameData={gameData} />;
}
