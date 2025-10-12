'use client'

import { use, useEffect, useState } from 'react'
import { Game, GameResponse } from '@/types'
import { transformGame } from '@/lib/utils'
import React from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'

const PlayPage = ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = use(params)
    const [game, setGame] = useState<Game | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchGame = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/games/${id}`)
        if (!response.ok) {
          throw new Error('Failed to fetch game')
        }
        const data: GameResponse = await response.json()
        const transformedGame = transformGame(data)
        setGame(transformedGame)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load game')
      } finally {
        setIsLoading(false)
      }
    }

    fetchGame()
  }, [id])

  if (isLoading) {
    return <div className="text-center text-white font-bold mt-20">Loading game...</div>
  }

  if (error) {
    return <div className="text-center font-bold text-red-500 mt-20">{error}</div>
  }

  if (!game) {
    return <div className="text-center text-white font-bold mt-20">Game not found</div>
  }

  return (
    <div className="h-full bg-gray-900 text-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-6">{game.name}</h1>
        
        <div className="flex gap-8">
          {/* Game Stats - Left Side */}
          <div className="bg-gray-800 rounded-lg p-6 w-1/3">
            <div className="space-y-6">
              <div>
                <p className="text-gray-400">Win Rate</p>
                <p className="text-2xl">{(game.chanceOfWinning * 100).toFixed(1)}%</p>
              </div>
              <div>
                <p className="text-gray-400">Multiplier</p>
                <p className="text-2xl">{game.winningMultiplier}x</p>
              </div>
              <div>
                <p className="text-gray-400">Minimum Bet</p>
                <p className="text-2xl">${game.minBet}</p>
              </div>
              <div>
                <p className="text-gray-400">Maximum Bet</p>
                <p className="text-2xl">${game.maxBet}</p>
              </div>
            </div>
          </div>

          {/* Image - Right Side */}
          <div className='flex-1'>
            <Image 
              src={"/images/landing.jpg"}
              alt="Casino background"
              className="object-cover rounded-lg w-full"
              priority
              width={800}
              height={400}
            />
          </div>
        </div>

        {/* Balance and Bet Controls */}

        <div className="mt-8">
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8">
            <div className="text-2xl font-bold">
              Balance: <span className="text-green-500">$100</span>
            </div>
            
            <div className="flex flex-wrap justify-center gap-4">
              <Button className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-6  transition duration-300">
                $1
              </Button>
              <Button className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-6  transition duration-300">
                $3
              </Button>
              <Button className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-6  transition duration-300">
                $5
              </Button>
              <Button className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-6  transition duration-300">
                $10
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PlayPage