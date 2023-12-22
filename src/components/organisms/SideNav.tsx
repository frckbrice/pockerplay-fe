"use client";
import { useState } from "react";
import { CiLogout } from "react-icons/ci";
import Overlay from "../atoms/Overlay";
import Popups from "../atoms/Popups";
import Link from "next/link";

export default function SideNav() {
  const [openLogout, setOpenLogout] = useState(false);
  return (
    <div className="flex flex-col justify-between bg-themecolor w-[240px] h-[100vh] items-center py-2 px-4">
      <div className="text-white font-bold">
        <Link href={"/"}>
          <h3 className="">PockerPlay</h3>
        </Link>
      </div>
      <div>
        <div></div>
        <div></div>
      </div>

      <button
        onClick={() => setOpenLogout((prev) => !prev)}
        className="flex items-center justify-center border border-gray-400 py-1 text-white gap-3 px-4"
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
            onAction={() => setOpenLogout((prev) => !prev)}
            styles={"bg-themecolor text-white rounded"}
            actionBTNStyle={"border border-red-600 text-red-600"}
          />
          <Overlay onClick={() => setOpenLogout((prev) => !prev)} transparent />
        </>
      )}
    </div>
  );
}
