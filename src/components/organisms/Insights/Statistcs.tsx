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
    <div className=" w-[700px] h-auto mx-auto flex flex-col items-center ">
      <RoundStats
        homePlayer={homePlayer}
        guessPlayer={guessPlayer}
        gameList={data}
      />
      <div className=" w-full h-auto p-5 mt-4 flex justify-start items-center flex-col text-lg">
        <div>
          <span>WINNER: &nbsp;&nbsp; </span>
          <span>{game?.winner}</span> {/* TAMO */}
        </div>
        <div>
          <span>ROLE: &nbsp;&nbsp; </span>{" "}
          {game.winner === homePlayer.username ? "home_player" : "guess_player"}{" "}
          {/* Home Player */}
        </div>
        <div>
          {" "}
          <span>SCORE: &nbsp;&nbsp; </span>
          {game.winner === homePlayer.username
            ? game?.home_player_score
            : game?.guess_player_score}
          {/* 0 */}
        </div>
      </div>
    </div>
  );
};

export default Statistics;
