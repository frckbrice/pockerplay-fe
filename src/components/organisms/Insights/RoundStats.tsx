import Image from "next/image";
import React, { Fragment } from "react";

type Props = {
  gameList: StatType[];
  homePlayer: User;
  guessPlayer: User;
};

// const RoundStats = (props: Props) => {
const RoundStats = ({ gameList, homePlayer, guessPlayer }: Props) => {
  return (
    <table className="table-auto w-[700px] h-[100px] mx-auto  bg-themecolor text-white content-center border-separate border-spacing-2 border border-slate-400 px-5 py-2">
      <thead>
        <tr>
          <th className=" border-r border-slate-300 ">Parts</th>
          <th className="border-r border-slate-300 ">{homePlayer?.username}</th>
          <th className="border-r border-slate-300 ">Choices/guesses</th>
          <th className="border-r border-slate-300 ">
            {guessPlayer?.username}
          </th>

          <th className=" border-slate-300 ">Choices/guesses</th>
        </tr>
      </thead>
      <tbody>
        {gameList?.map((game) => (
          <Fragment key={game.choice_id}>
            <tr>
              <td className="px-8 py-4 w-fit">First</td>
              <td className="px-8 py-4 w-fit">{game.home_player_score ?? 0}</td>
              <td className="px-8 py-4 w-fit">
                <Image
                  src={
                    game.home_player_choice ||
                    " https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.playstation.com%2Ffr-fr%2Fgames%2Favatar-frontiers-of-pandora%2F&psig=AOvVaw2CeWlqpP58GaX5gUkILdmx&ust=1704739540205000&source=images&cd=vfe&opi=89978449&ved=0CAUQjB1qFwoTCMDvuOr3y4MDFQAAAAAdAAAAABAD"
                  }
                  alt=""
                  width="50"
                  height="50"
                />
              </td>
              <td className="px-8 py-4 w-fit">
                {game?.guess_player_score ?? 0}
              </td>
              <td className="px-8 py-4 w-fit">
                <Image
                  src={
                    game.guess_player_guess ||
                    " https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.playstation.com%2Ffr-fr%2Fgames%2Favatar-frontiers-of-pandora%2F&psig=AOvVaw2CeWlqpP58GaX5gUkILdmx&ust=1704739540205000&source=images&cd=vfe&opi=89978449&ved=0CAUQjB1qFwoTCMDvuOr3y4MDFQAAAAAdAAAAABAD"
                  }
                  alt=""
                  width="50"
                  height="50"
                />
              </td>
            </tr>

            <tr>
              <td className="px-8 py-4 w-fit">Second </td>
              <td className="px-8 py-4 w-fit">{game.home_player_score ?? 0}</td>
              <td className="px-8 py-4 w-fit">
                {" "}
                <Image
                  src={
                    game?.home_player_guess ||
                    " https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.playstation.com%2Ffr-fr%2Fgames%2Favatar-frontiers-of-pandora%2F&psig=AOvVaw2CeWlqpP58GaX5gUkILdmx&ust=1704739540205000&source=images&cd=vfe&opi=89978449&ved=0CAUQjB1qFwoTCMDvuOr3y4MDFQAAAAAdAAAAABAD"
                  }
                  alt=""
                  width="50"
                  height="50"
                />
              </td>
              <td className="px-8 py-4 w-fit">
                {game?.guess_player_score ?? 0}
              </td>
              <td className="px-8 py-4 w-fit">
                <Image
                  src={
                    game?.guess_player_choice ||
                    " https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.playstation.com%2Ffr-fr%2Fgames%2Favatar-frontiers-of-pandora%2F&psig=AOvVaw2CeWlqpP58GaX5gUkILdmx&ust=1704739540205000&source=images&cd=vfe&opi=89978449&ved=0CAUQjB1qFwoTCMDvuOr3y4MDFQAAAAAdAAAAABAD"
                  }
                  alt=""
                  width="50"
                  height="50"
                />
              </td>
            </tr>
          </Fragment>
        ))}
      </tbody>
    </table>
  );
};

export default RoundStats;
