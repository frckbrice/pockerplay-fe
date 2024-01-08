
#PockerPlay Game

Project view.
## App
![emptyDashboard]('/public/image/emptyDashboard') 
![pockerhome]('/public/image/pockerhome') 
![pockerplayDashboard]('/public/image/pockerplayDashboard') 

## About

This game implements a simple exchanges of assets and guess (images and words) between two players. To start the game, one user need to create the game on the plateforme and share the link provided by the app to other user to become your opponent inn the game.
when the new user connect, the app notify you and then any of you can start  playing.

## Play Game
simple play the game by generating new assets(images or words), then make your choice. After that send that set to the other player in order for him to guess what was your choice. if the guess is correct, the guess player win that session.
To start the game, the principle is simple. open the app and click on "GET STARTED", then add your username. After click on "Create game". this last will lead 
you to the dashboard of the game and the link to share will be displayed. you can now give the link to any potential player. when that player connect to the 
app by adding his/her own name, you will be notify. The game can start.

The game has only 5 rounds per sessions. At the end of session you will have a statistic page making the summary of the 5 rounds.
You have the possibility to conctinue the game if you close the app. the only thing, to drop the game is to logout.

## Built With

- typescript v5.1.3
- NextJS v14.0.4
- NextJs 
- @faker-js/faker v8.3.1
- sequelize v6.35.2,
- MySQL

### Prerequisites

Knowledge about TS:

- Basic data structures
- Arrays
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

## Test

- run `npm run test` to run test
  ![Results](./assets/test.png)

## Live Site

[Link](https://pkplay.vercel.app/)

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

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
