## Mino Casino Assessment Project:

- Full-stack application with React front-end, Spring Boot backend with H2 database (in-memory)
- Make sure both front end and back end are running, and make sure localhost:3000 and localhost:8080 aren’t being used

## React Front end:
- Used Next.js as the React framework
- Used Shadcn/UI for components
- Used TailwindCSS for styling 
- Used useReducer, useContext for authentication, state management
- Used Next.js’s file-system based routing, dynamic route handling 


## Front end demo video:
- https://www.loom.com/share/a056617a601244aa9fee51ca9bfcad78?sid=21e8eac5-d312-40e2-80bc-a8289b876a52 

## Requirements:

Landing page:
- http://localhost:3000/login



Landing Page logged in state:
 -Displays the username of logged in user and their balance in euros



Login page:
- http://localhost:3000/login



Signup page:
- http://localhost:3000/register 
 

Library of games w/ search filter:
- http://localhost:3000/games 

Library of games after click ‘Show more’ which displays 8 more games:


Library of games filtered with search bar:


Game container which allows the player to place bets
- http://localhost:3000/games/{gameId}
- Games are retrieved from Java backend H2 database (initialized when starting) 


User clicking ‘Add balance’ button in the header opens a dialog for the user to select a balance to deposit ($1, $5, $10)



After clicking deposit, the amount is added to the user’s balance


User clicks on $1, $3, $5, or $10 button, which displays a dialog containing the bet amount and potential wins, asking user to confirm to place bet



After clicking ‘Place bet’, a dialog appears notifying the user has won or lost
If the user wins, the user gains the multiplier * bet amount
If the user loses, the user loses the bet amount
This balance is updated in the H2 database, and then balance’s state is updated


## How to run:

- Clone the github repo:
- https://github.com/winstonl4m/CasinoGameNext.git 
- Make sure localhost:3000 is not being used
- Run npm install
- Run npm run dev

## Github repository:
https://github.com/winstonl4m/CasinoGameNext 

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.


