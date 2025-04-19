'use client'
import { GameCard } from '@/components/GameCard';
import { Game } from '@/lib/types';
import React, { Suspense, useEffect, useState } from 'react';
import Loading from './loading';
import NavBar from '@/components/NavBar';
// import Loading from './loading';

const Home = () => {
  const [games, setGames] = useState<Game[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError]= useState<string>('')
  useEffect(() => {
    const fetchGames = async () => {
      try {
        const res = await fetch('/api/games')
        const data = await res.json()
        setGames(data)
      } catch (error: unknown) {
        if(error instanceof Error){
          setError(error.message)
        } else {
          setError('Unexpected Error')
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
