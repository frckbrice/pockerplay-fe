"use client";
import Avatar from "../atoms/Avatar";
import { RiMenu2Fill } from "react-icons/ri";
type Props = {
  onClick: () => void;
};

export default function TopNav({ onClick }: Props) {
  if (typeof localStorage === "undefined") return;
  const homePlayer = JSON.parse(localStorage.getItem("home_player") || "{}");
  const guessPlayer = JSON.parse(localStorage.getItem("guess_player") || "{}");
  const status = localStorage.getItem("status");
  const conStatus = localStorage.getItem("conStatus");
  return (
    <div>
      <nav className="flex items-center bg-white w-full justify-between border-b px-2 py-1 border-gray-200">
        <button
          onClick={onClick}
          className="text-themecolor font-bold hidden mobile:max-sm:block"
        >
          <RiMenu2Fill size={24} />
        </button>

        <div className="mx-auto">
          <span>{conStatus ? conStatus : ""} </span>
          {/* <span className=" ml-5">{conStatus} </span> */}
        </div>

        <Avatar profilePicture={homePlayer.image} size={4} />
      </nav>
    </div>
  );
}
