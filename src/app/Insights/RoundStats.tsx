"use client";

import Image from "next/image";
import React from "react";
import { useState } from "react";

type Props = {
  data: StatType[];
  homePlayer: User;
  guessPlayer: User;
};

// const RoundStats = (props: Props) => {
const RoundStats = ({ data, homePlayer, guessPlayer }: Props) => {
  return (
    <table className="table-auto w-[700px] h-[100px] mx-auto  bg-themecolor text-white content-center border-separate border-spacing-2 border border-slate-400 px-5 py-2">
      <thead>
        <tr>
          <th className=" border-r border-slate-300 ">Rounds</th>
          <th className="border-r border-slate-300 ">{homePlayer?.username}</th>
          <th className="border-r border-slate-300 ">Choices/guesses</th>
          <th className="border-r border-slate-300 ">
            {guessPlayer?.username}
          </th>

          <th className=" border-slate-300 ">Choices/guesses</th>
        </tr>
      </thead>
      <tbody>
        {data?.map((game) => (
          <div key={game.choice_id}>
            <tr>
              <td className="px-8 py-4">First</td>
              <td className="px-8 py-4">{game.home_player_score ?? 0}</td>
              <td className="px-8 py-4">
                <Image
                  src={game.home_player_choice}
                  alt=""
                  width="50"
                  height="50"
                />
              </td>
              <td className="px-8 py-4">{game?.guess_player_choice ?? 0}</td>
              <td className="px-8 py-4">
                <Image
                  src={game.guess_player_guess}
                  alt=""
                  width="50"
                  height="50"
                />
              </td>
            </tr>

            <tr>
              <td className="px-8 py-4">Second : </td>
              <td className="px-8 py-4">{game.home_player_score ?? 0}</td>
              <td className="px-8 py-4">
                {" "}
                <Image
                  src={game?.home_player_guess}
                  alt=""
                  width="50"
                  height="50"
                />
              </td>
              <td className="px-8 py-4">{game?.guess_player_score ?? 0}</td>
              <td className="px-8 py-4">
                <Image
                  src={game?.guess_player_choice}
                  alt=""
                  width="50"
                  height="50"
                />
              </td>
            </tr>
          </div>
        ))}
      </tbody>
    </table>
  );
};

export default RoundStats;
