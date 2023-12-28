"use client";

import { useState } from "react";

import { socket } from "@/utils/service/constant";

import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import RoundLoader from "@/components/atoms/RoundLoader";

export default function Page() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [homePlayer, setHomePlayer] = useState<User>(() => {
    if (typeof localStorage !== "undefined") {
      return JSON.parse(localStorage.getItem("home_player") || "{}");
    } else return null;
  });

  const handleCopy = () => {
    toast.success("Copied!", {
      position: "top-right",
      hideProgressBar: true,
      autoClose: 3000,
    });
  };

  const createNewGame = () => {
    if (homePlayer) socket.emit("init", { home_player_id: homePlayer.id });
  };

  socket.on("init", (data) => {
    if (data) {
      if (data.state === "new game") {
        toast.success("new game created!", {
          position: "top-right",
          hideProgressBar: false,
          autoClose: 3000,
        });
        router.push(`/dashboard/${data.game}`);
      } else {
        console.log("data from db", data);
      }
    }
    // setIsLoading((prev) => !prev);
    // setTimeout(() => {
    //   router.push("/dashboard/23h232304234h2342342232");
    // }, 500);
  });

  return (
    <main className="flex justify-center items-center p-4  m-auto">
      <div className="flex flex-col border border-themecolor w-[40vw] mobile:max-sm:w-full mt-[25vh] p-4 gap-2 relative">
        <h3 className="font-bold">Game setup</h3>
        <p>
          Start a new game session, copy the link and share with a friend to
          join you play
        </p>
        <div className="flex justify-between">
          <div></div>
          <button
            className={`bg-themecolor py-2 px-4 ${
              isLoading ? "disabled:opacity-50 cursor-not-allowed" : ""
            } text-white`}
            onClick={createNewGame}
          >
            new game
          </button>
        </div>
        {isLoading && (
          <div className="absolute self-center top-24 ">
            {" "}
            <RoundLoader />{" "}
          </div>
        )}
      </div>
    </main>
  );
}
