import React from "react";
import RoundStats from "./RoundStats";

type Props = {
  data: any;
};

const Statistics = (props: Props) => {
  return (
    <div className=" w-[700px] h-auto mx-auto flex items-center ">
      <RoundStats />
      <div>
        <div>
          <span>WINNER: </span> {props.data.game.winner}{" "}
        </div>
        <div>
          <span>ROLE: </span> {props.data.role}
        </div>
        <div>
          {" "}
          <span>SCORE: </span>
          {props.data.role === "home_player"
            ? props.data.game.home_player_score
            : props.data.game.guess_player_score}
        </div>
      </div>
    </div>
  );
};

export default Statistics;
