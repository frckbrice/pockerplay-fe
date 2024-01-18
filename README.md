
# PockerPlay Game app

Project view.
## App
![home](/public/pockerplay/pockerpwa.png) 
![verification](/public/pockerplay/pokerplayverification.png) 
![dashboard](/public/pockerplay/pockerplaydashbord.png) 
![gameboard_for_copy_sharelink](/public/pockerplay/pocjerplaycopylink.png) 
![gameboard_for_copy_generateoptions](/public/pockerplay/pockerplaygenerate.png) 
![gameboard_for_copy_sendOption](/public/pockerplay/pockeroneplayer.png) 
![gameboard_for_copy_receivingGuess](/public/pockerplay/pockerplay2players.png) 


## About

This game implements a simple exchanges of assets and guess (images and words) between two players.

## Play Game

To start the game, the principle is simple. open the app and click on "GET STARTED", then add your username. After click on "Create game". this last will lead 
you to the dashboard of the game and the link to share will be displayed. You can now copy the link (simply click on it to copy), then give the link to any potential player. 

Upon receiving the link, the opponent just need to past that link in the browser URL field and validate.
When that player connect to the app and follow the instructions till the game boad, you will be notify. The game can start.

simple play the game by generating new assets(images or words), then make your choice. After that send that set (your choice and the list of generated options by pressing "SEND" button) to the other player in order for him to guess what was your choice. If the guess is correct, the guess player win that session.

The game has only 5 rounds per sessions. At the end of session you will have a statistic page making the summary of the 5 rounds.
You have the possibility to conctinue the game if you close the app. the only thing, to drop the game is to logout.

The player has also the possibility to change the opponent. This means that another user can connect to the sam game session using the ID of the session provided in the link.

## Built With

-FRONT-END:  typescript v5.1.3, NextJS v14.0.4, tailwindCss, socket.io-client, next-pwa
-BACK-END:  NestJs: @nestjs/cli, @nestjs/schematics, , @nestjs/websockets, @faker-js/faker
-DATABASE: MySQL, sequelize-typescript
-

### Prerequisites

Knowledge about TS:

- Basic data structures
- Arrays
- objects
- Functions
- Constructors
- sequelize ORM
- MySQL

## Clone project

- To get a local copy up and running follow these simple example steps.
- Clone this repository with `https://github.com/frckbrice/pockerplay-fe.git` using your terminal or command line.
- Change to the project directory by entering: cd pockerplay-frontend in the terminal.

## Command line steps

- $ git clone `git@github.com:frckbrice/pockerplay-fe.git `
- $ `cd pockerplay-frontend `
- $ `git checkout feature


## Live Site

[Link](https://pockerplay.vercel.app/)

## Author

👤 **Franck Brice Avom**

- GitHub: [@frckbrice](https://github.com/frckbrice)
- Twitter: [@EvaristeAvom](https://twitter.com/EvaristeAvom)
- LinkedIn: [Brice Avom](https://www.linkedin.com/in/avombrice/)

## Show your support

Give a ⭐️ if you like this project!

## 📝 License (optional)

This project is [MIT](./LICENSE) licensed.


This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

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

