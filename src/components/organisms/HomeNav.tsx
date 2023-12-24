"use client";
import Image from "next/image";
import Link from "next/link";

type Props = {
  hidden: boolean;
};

const HomeNav = ({ hidden }: Props) => {
  const user = localStorage.getItem("userData") || [];

  return (
    <div className="flex justify-between items-center bg-white mobile:max-sm:px-5 px-24 py-3">
      <Image
        src={"/POCKERPLAY-LOGO copy.png"}
        alt=""
        width={200}
        height={100}
      />
      {!user.length ? (
        <Link
          href={"/register"}
          className={`border ${
            hidden ? "invisible" : "visible"
          } border-lightPupple text-lightPupple rounded-full font-bold px-8 py-2`}
        >
          SignUp
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
