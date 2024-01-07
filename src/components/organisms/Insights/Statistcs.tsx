import React, { useState } from "react";
import RoundStats from "./RoundStats";
import { socket } from "@/utils/service/constant";
import { useRouter } from "next/navigation";

type Props = {
  data: StatType[];
  game: GameSession;
};

const Statistics = ({ data, game }: Props) => {
  const router = useRouter();
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
      <div className=" w-full flex justify-center items-center mb-4 p-2.5">
        {" "}
        END OF GAME: SUMMARY
      </div>
      <RoundStats
        homePlayer={homePlayer}
        guessPlayer={guessPlayer}
        gameList={data}
      />
      <div className=" w-full h-auto p-5 mt-4 flex justify-start items-center flex-col text-lg">
        <div>
          <span>WINNER: &nbsp;&nbsp; </span>
          <span>
            {game?.home_player_score > game.guess_player_score
              ? homePlayer.username
              : guessPlayer.username}
          </span>
        </div>
        {game.winner ? (
          <div className=" flex flex-col gap-3 items-center">
            <div>
              <span>ROLE: &nbsp;&nbsp; </span>{" "}
              {game?.home_player_score > game.guess_player_score
                ? "home_player"
                : "guess_player"}
            </div>
            <div>
              {" "}
              <span>SCORE: &nbsp;&nbsp; </span>
              {game?.home_player_score > game?.guess_player_score
                ? game?.home_player_score
                : game?.guess_player_score}
            </div>
          </div>
        ) : (
          <div className=" flex flex-col gap-2">
            <div>
              <span>No Winner: &nbsp;&nbsp; </span>
            </div>
            <div>
              {" "}
              <span>SCORE: &nbsp;&nbsp; </span>
              <span className=" flex gap-3">
                <span>{game?.home_player_score} </span>
                <span> {game?.guess_player_score}</span>
              </span>
            </div>
          </div>
        )}
      </div>
      <div className=" w-full h-auto p-5 mt-2.5 flex justify-start items-center flex-col text-lg">
        <button
          onClick={() => {
            const me =
              typeof localStorage !== "undefined" &&
              localStorage.getItem("home_player")
                ? JSON.parse(localStorage.getItem("home_player")!)
                : { username: "", id: "" };
            if (me) {
              socket.emit("logout", { player_id: me?.id });
            }
            localStorage.clear();
            router.push("/");
          }}
          className="flex items-center justify-center  py-1 hover:bg-themecolor duration-300  hover:text-white w-full text-black gap-3 px-4 ring ring-slate-700"
        >
          <span>Restart</span>
        </button>
      </div>
    </div>
  );
};

export default Statistics;
