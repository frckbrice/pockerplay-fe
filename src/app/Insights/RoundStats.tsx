import { faker } from "@faker-js/faker";
import Image from "next/image";
import React from "react";

type Props = {
  index: string;
  score: Score;
  game: GameSession;
  round: Round;
  choice: Choice;
  guess: Guess;
};

// const RoundStats = (props: Props) => {
const RoundStats = () => {
  return (
    <table className="table-auto w-[700px] h-[100px] mx-auto  bg-themecolor text-white content-center border-separate border-spacing-2 border border-slate-400 px-5 py-2">
      <thead>
        <tr>
          <th className="border border-slate-300 ">Round</th>
          <th className="border border-slate-300 ">Tara</th>
          <th className="border border-slate-300 ">Choice/guess</th>
          <th className="border border-slate-300 ">TOTO</th>

          <th className="border border-slate-300 ">Choice/guess</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td className="px-8 py-4">First</td>
          <td className="px-8 py-4">0</td>
          <td className="px-8 py-4">
            <Image
              src={faker.image.urlLoremFlickr()}
              alt=""
              width="50"
              height="50"
            />
          </td>
          <td className="px-8 py-4">1</td>
          <td className="px-8 py-4">
            <Image
              src={faker.image.urlLoremFlickr()}
              alt=""
              width="50"
              height="50"
            />
          </td>
        </tr>
        <tr>
          <td className="px-8 py-4">Second : </td>
          <td className="px-8 py-4">1</td>
          <td className="px-8 py-4">
            {" "}
            <Image
              src={faker.image.urlLoremFlickr()}
              alt=""
              width="50"
              height="50"
            />
          </td>
          <td className="px-8 py-4">0</td>
          <td className="px-8 py-4">
            <Image
              src={faker.image.urlLoremFlickr()}
              alt=""
              width="50"
              height="50"
            />
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default RoundStats;
