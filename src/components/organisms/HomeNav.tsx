// "use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

type Props = {
  hidden: boolean;
};

const HomeNav = ({ hidden }: Props) => {
  const user = localStorage.getItem("userData") || [];
  // const user = [];

  return (
    <div className="flex justify-between h-[10vh] items-center fixed w-full shadow-md bg-white mobile:max-sm:px-5 px-24 py-3">
      <Image
        src={"/POCKERPLAY-LOGO copy.png"}
        alt=""
        width={200}
        height={100}
      />
      {!user.length ? (
        <Link
          href={"/verification"}
          className={`border ${
            hidden ? "invisible" : "visible"
          } border-lightPupple text-lightPupple rounded-full font-bold px-8 py-2`}
        >
          Get Started
        </Link>
      ) : (
        <Link
          href={"/dashboard"}
          className={`border ${
            hidden ? "invisible" : "visible"
          } border-lightPupple text-lightPupple rounded-full font-bold px-8 py-2`}
        >
          Dashboard
        </Link>
      )}
    </div>
  );
};

export default HomeNav;
