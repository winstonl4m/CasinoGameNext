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

export const calculateAge = (birthDate: Date): number => {
  const today = new Date()
  let age = today.getFullYear() - birthDate.getFullYear()
  const monthDiff = today.getMonth() - birthDate.getMonth()
  
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--
  }
  
  return age
}

export const isOver18 = (birthDate: Date): boolean => {
  return calculateAge(birthDate) >= 18
}

export const validateName = (name: string): boolean => {
  return name.length >= 2 && name.length <= 10;
}

export const validateUsername = (username: string): boolean => {
  return username.length >= 2 && username.length <= 10;
}

export const validatePassword = (password: string): boolean => {
  const hasMinLength = password.length >= 5;
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
  const hasNumber = /\d/.test(password);
  const hasLetter = /[a-zA-Z]/.test(password);
  
  return hasMinLength && hasSpecialChar && hasNumber && hasLetter;
}