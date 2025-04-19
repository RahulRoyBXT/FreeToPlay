import GamePage from '@/components/GamePage';

async function getGameData(id: string) {
  try {
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
  
  return <GamePage id={params.game} gameData={gameData} />;
}
