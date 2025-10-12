export type Game ={
    product_id: number,
    name: string,
    chanceOfWinning: number,
    winningMultiplier: number,
    maxBet: number,
    minBet: number
}


export type GameResponse = {
    game_id: number,
    name: string,
    chance_of_winning: number,
    winning_multiplier: number,
    max_bet: number,
    min_bet: number
}