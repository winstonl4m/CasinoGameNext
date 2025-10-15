import { Button } from "@/components/ui/button";
import { Game } from "@/types";
import Link from "next/link";


interface GameCardProps {
  game: Game
  isAuthenticated: boolean
}

export const GameCard = ({ game, isAuthenticated }: GameCardProps) => (
    
  <div className="bg-gray-800 rounded-lg overflow-hidden hover:transform hover:scale-105 transition-transform duration-300">
    <div className="p-4">
      <h3 className="text-xl font-bold mb-2">{game.name}</h3>
      <div className="space-y-2 text-sm text-gray-400">
        <p>Win Rate: {(game.chanceOfWinning * 100).toFixed(1)}%</p>
        <p>Multiplier: {game.winningMultiplier}x</p>
        <p>Bet Range: ${game.minBet} - ${game.maxBet}</p>
      </div>
      {isAuthenticated ? (
        <Link href={`/games/${game.product_id}`}>
          <Button className="mt-4 w-full bg-green-600 hover:bg-green-700">Play now</Button>
        </Link>
      ) : (
          <Button className="mt-4 w-full bg-gray-600 hover:bg-gray-700">Login to Play</Button>
      )}

    </div>
  </div>
)

