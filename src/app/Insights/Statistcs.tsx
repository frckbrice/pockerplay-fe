import React, { useState } from "react";
import RoundStats from "./RoundStats";

type Props = {
  data: StatType[];
  game: GameSession;
};

const Statistics = ({ data, game }: Props) => {
  const [homePlayer, setHomePlayer] = useState<User>(() => {
    if (typeof localStorage !== "undefined") {
      return (
        JSON.parse(localStorage.getItem("home_player")!) || {
          name: "",
          image: "",
          email: "",
        }
      );
    } else return null;
  });
  const [guessPlayer, setGuessPlayer] = useState<User>(() => {
    if (
      typeof localStorage !== "undefined" &&
      localStorage.getItem("guess_player") !== "undefined" &&
      localStorage.getItem("guess_player")
    ) {
      return JSON.parse(localStorage.getItem("guess_player") || "{}");
    } else return null;
  });

  return (
    <div className=" w-[700px] h-auto mx-auto flex items-center ">
      <RoundStats
        homePlayer={homePlayer}
        guessPlayer={guessPlayer}
        data={data}
      />
      <div className=" w-full h-auto px-5 mt-4 flex justify-center items-center gap-2">
        <div>
          <span>WINNER: </span> {game?.winner}{" "}
        </div>
        <div>
          <span>ROLE: </span>{" "}
          {game.winner === homePlayer.username ? "home_player" : "guess_player"}
        </div>
        <div>
          {" "}
          <span>SCORE: </span>
          {game.winner === homePlayer.username
            ? game?.home_player_score
            : game?.guess_player_score}
        </div>
      </div>
    </div>
  );
};

export default Statistics;
