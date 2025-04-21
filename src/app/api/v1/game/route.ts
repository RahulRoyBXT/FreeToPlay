import { NextResponse } from 'next/server';


export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'Game ID is required' }, { status: 400 });
    }

    const response = await fetch(`https://www.freetogame.com/api/game?id=${id}`);
    
    const gameData = await response.json();
    return NextResponse.json(gameData);
  } catch (error) {
    console.error('Error fetching game data:', error);
    return NextResponse.json(
      { error: 'Failed to fetch game data' }, 
      { status: 500 }
    );
  }
}