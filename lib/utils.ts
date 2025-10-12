import { Game, GameResponse } from "@/types"
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}



export const transformGame = (gameResponse: GameResponse): Game => {
    return {
        product_id: gameResponse.game_id,
        name: gameResponse.name,
        chanceOfWinning: gameResponse.chance_of_winning,
        winningMultiplier: gameResponse.winning_multiplier,
        maxBet: gameResponse.max_bet,
        minBet: gameResponse.min_bet
    }
}