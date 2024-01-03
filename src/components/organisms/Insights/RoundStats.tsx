import React from "react";

type Props = {
  index: string;
  home_score: number;
  guess_score: number;
  home_player: string;
  guess_player: string;
  choice_guess: string;
  home_choice: string;
  home_guess: string;
  guess_choice: string;
  guess_guess: string;
};

const RoundStats = (props: Props) => {
  return (
    <div className="container w-full grid grid-cols-3 bg-themecolor text-white">
      <div className=" col-auto w-[1/3]">
        <div>{`Round${props.index}`}</div>
      </div>

      <div className=" col-auto w-[1/3]">
        <div className=" flex gap-2">
          <div className=" flex flex-col gap-3">
            <span>{props.home_player} </span>
            <span>first:{props.home_score}</span>
            <span> second: {props.guess_score} </span>
          </div>
          <div className=" flex flex-col">
            <span>{props.choice_guess} </span>
            <span>first:{props.home_choice}</span>
            <span> second: {props.home_guess} </span>
          </div>
        </div>
      </div>
      <div className=" col-auto w-[1/3]">
        <div className=" flex gap-2">
          <div className=" flex flex-col gap-3">
            <span>{props.guess_player} </span>
            <span>first:{props.home_score}</span>
            <span> second: {props.guess_score} </span>
          </div>
          <div className=" flex flex-col">
            <span>{props.choice_guess} </span>
            <span>first:{props.guess_choice}</span>
            <span> second: {props.guess_guess} </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoundStats;
