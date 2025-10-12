import { Button } from "@/components/ui/button";
import { Game } from "@/types";
import Link from "next/link";

export const GameCard = ({ game }: { game: Game }) => (
    <Link href={`/games/${game.product_id}`}>
    
  <div className="bg-gray-800 rounded-lg overflow-hidden hover:transform hover:scale-105 transition-transform duration-300">
    <div className="p-4">
      <h3 className="text-xl font-bold mb-2">{game.name}</h3>
      <div className="space-y-2 text-sm text-gray-400">
        <p>Win Rate: {(game.chanceOfWinning * 100).toFixed(1)}%</p>
        <p>Multiplier: {game.winningMultiplier}x</p>
        <p>Bet Range: ${game.minBet} - ${game.maxBet}</p>
      </div>
      {/* <button className="mt-4 w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded transition duration-300">
        Play Now
      </button> */}
      <Button className="mt-4 w-full bg-green-600 hover:bg-green-700">Play now</Button>
    </div>
  </div>
  </Link>
)

