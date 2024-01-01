import Avatar from "../atoms/Avatar";

type Props = {
  homePlayer: User;
  guessPlayer: User;
  score?: Score;
};

export default function Scores(props: Props) {
  return (
    <div className="flex flex-col py-2 px-4 rounded-[10px] text-white justify-center items-center bg-themecolor">
      <h3 className="font-bold ">scores</h3>
      <div className="flex justify-between w-full items-center">
        <div className="flex flex-col items-center justify-center">
          <Avatar profilePicture={""} size={3} />
          <span>{props.homePlayer?.username?.split(" ")[0] ?? "You"}</span>
        </div>
        <div>
          <p>
            {props.score?.home_player_score ?? "0"} : {props.score?.guess_player_score ?? "0"}
          </p>
        </div>
        <div className="flex flex-col items-center justify-center">
          <Avatar profilePicture={""} size={3} />
          <span> {props.guessPlayer?.username?.split(" ")[0] ?? "Guess"}</span>
        </div>
      </div>
    </div>
  );
}
