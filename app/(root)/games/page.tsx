'use client'

import React, { useEffect, useState } from 'react'
import { mockData } from '@/lib/mockData'
import { Game, GameResponse } from '@/types'
import { GameCard } from '@/components/shared/games/GameCard'
import { transformGame } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/store/auth-context'

const GamesPage = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [showAll, setShowAll] = useState(false)
  const [games, setGames] = useState<Game[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const {isAuthenticated} = useAuth()

  

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/games`)
        if (!response.ok) {
          throw new Error('Failed to fetch games')
        }
        const data: GameResponse[] = await response.json()
        const transformedGames = data.map(transformGame)
        setGames(transformedGames)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load games')
      } finally {
        setIsLoading(false)
      }
    }

    fetchGames()
  }, [])

  const filteredGames = games.filter(game => 
    game.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  // const filteredGames = mockData.filter(game => 
  //   game.name.toLowerCase().includes(searchTerm.toLowerCase())
  // )

  const displayedGames = showAll ? filteredGames : filteredGames.slice(0, 8)

  if (isLoading) {
    return <div className="text-center text-black font-bold mt-20">Loading games...</div>
  }
  if (error) {
    return <div className="text-center font-bold text-red-500 mt-20">{error}</div>
  }

  return (
    <div className="h-full bg-gray-900 text-white p-8">
      <div className="max-w-xl mx-auto mb-8">
        <input
          type="text"
          placeholder="Search games..."
          className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:border-green-500"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Games Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 max-w-7xl mx-auto">
        {displayedGames.map((game) => (
          <GameCard 
            key={game.product_id} 
            game={game} 
            isAuthenticated={isAuthenticated}
          />
        ))}
      </div>

      {/* See More Button */}
      {filteredGames.length > 8 && !showAll && (
        <div className="text-center mt-8">
          <Button 
            className="bg-green-600 hover:bg-green-700 font-bold py-2 px-6 rounded-full"
            onClick={() => setShowAll(true)}
          >Show more
          </Button>
        </div>
      )}
    </div>
  )
}



export default GamesPage