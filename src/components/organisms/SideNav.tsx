"use client";
import { useState } from "react";
import { CiLogout } from "react-icons/ci";
import Overlay from "../atoms/Overlay";
import Popups from "../atoms/Popups";
import Link from "next/link";
import CreateGame from "./CreateGame";
import { toast } from "react-toastify";
import Image from "next/image";
// import { useNavigate } from "react-router-dom";
import { useRouter } from "next/navigation";

export default function SideNav() {
  const [openLogout, setOpenLogout] = useState(false);
  const [startNewGame, setStartNewGame] = useState(false);
  if (typeof localStorage === "undefined") return;
  const myDms = JSON.parse(localStorage.getItem("myDM")!) || [];

  const router = useRouter();

  return (
    <div className="flex flex-col justify-between bg-themecolor w-[240px] h-[100vh] items-center py-2">
      <div className="flex flex-col w-full gap-30">
        <div className="text-white flex justify-center items-center font-bold mb-[40px]">
          <Link href={"/"}>
            <Image
              src={"/POCKERPLAY-LOGO-white.png"}
              alt=""
              width={200}
              height={100}
            />
          </Link>
        </div>
        <div>
          <div>
            <button className="hover:bg-white border-b border-b-1 border-b-slate-400 duration-300 text-white w-full p-2  hover:text-themecolor">
              New Game
            </button>
          </div>
          <div className=" px-2 flex flex-col justify-center items-center">
            {" "}
            <h2 className=" text-center">users</h2>
            {myDms.length
              ? myDms?.map((user: Partial<User>, i: number) => (
                  <span
                    key={i}
                    className=" text-center text-[#f5f6f8] text-[11px]"
                  >
                    {user.username}{" "}
                  </span>
                ))
              : null}
          </div>
        </div>
      </div>

      <button
        onClick={() => setOpenLogout((prev) => !prev)}
        className="flex items-center justify-center  py-1 hover:bg-white duration-300  hover:text-themecolor w-full text-white gap-3 px-4"
      >
        <CiLogout /> <span>logout</span>
      </button>

      {openLogout && (
        <>
          <Popups
            title={"Hey"}
            content={"Are you sure you want to leave the Game?"}
            actionText={"Logout"}
            onCancel={() => setOpenLogout((prev) => !prev)}
            onAction={() => {
              localStorage.clear();
              router.replace("/");
            }}
            styles={"bg-themecolor text-white rounded"}
            actionBTNStyle={"border border-red-600 text-red-600"}
          />
          <Overlay onClick={() => setOpenLogout((prev) => !prev)} />
        </>
      )}

      {startNewGame && (
        <>
          <Overlay
            onClick={function (): void {
              throw new Error("Function not implemented.");
            }}
          />
        </>
      )}
      {/* <Overlay />
      <CreateGame /> */}
    </div>
  );
}
