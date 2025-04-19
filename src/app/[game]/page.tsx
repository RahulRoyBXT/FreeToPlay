import GamePage from '@/components/GamePage';
import { Game, SingleGame, SystemReq } from "@/lib/types";

async function getGameData(id: string) {
  try {
    // Add an artificial delay to ensure loading state is visible
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // Server-side fetch directly from the API
    const response = await fetch(`https://www.freetogame.com/api/game?id=${id}`, { 
      cache: 'no-store'
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch game data');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching game data:', error);
    throw error;
  }
}

export default async function GameDetailPage({ params }: { params: { game: string } }) {
  // Fetch game data on the server
  const gameData = await getGameData(params.game);
  
  // Pass the data to the GamePage component
  return <GamePage id={params.game} gameData={gameData} />;
}
