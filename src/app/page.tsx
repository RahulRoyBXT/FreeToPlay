'use client'
import { GameCard } from '@/components/GameCard';
import { Game } from '@/lib/types';
import React, { useEffect, useState } from 'react';
import Loading from './loading';
import NavBar from '@/components/NavBar';

const Home = () => {
  const [games, setGames] = useState<Game[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  
  useEffect(() => {
    const fetchGames = async () => {
      const BaseUrl = process.env.NODE_ENV === 'production'? process.env.NEXT_PUBLIC_BASE_URL : 'http://localhost:3000'
      try {
        const res = await fetch(`${BaseUrl}/api/v1/games`)
        const data = await res.json()
        setGames(data)
      } catch (error: unknown) {
        if(error instanceof Error){
          console.error(error.message)
        } else {
          console.error('Unexpected Error')
        }
      } finally {
        setLoading(false)
      }
    }
    
    fetchGames()
  }, [])

  if (loading) {
    return (
      <Loading />
    )
  }

  return (
    <div className='min-h-screen w-full'>
      <NavBar />
      <GameCard games={games}/>
    </div>
  );
};

export default Home;
