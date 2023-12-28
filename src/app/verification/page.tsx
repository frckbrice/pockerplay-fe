"use client";

import supabase from "@/utils/service/supabaseClient";
import React, { useEffect } from "react";
import { useState } from "react";
import Image from "next/image";
import { userVerification } from "@/utils/service/api-call";
import { signupFn } from "@/utils/service/api-call";
import RoundLoader from "@/components/atoms/RoundLoader";
import { useRouter } from "next/navigation";
import { socket } from "@/utils/service/constant";
import { Navigate } from "react-router-dom";
import { useAppContext } from "../Context/AppContext";
import HomeNav from "@/components/organisms/HomeNav";

export default function Verification() {
  const router = useRouter();

  const [userData, setUserData] = useState<User>((): any => {
    if (typeof localStorage !== "undefined") {
      const interval = setInterval(() => {
        const googleUser = JSON.parse(
          localStorage.getItem("sb-tpeabveoygvsyymlasnb-auth-token") || "{}"
        );
        let set: boolean = false;
        if (googleUser.user) {
          set = true;
          setUserData({
            username: googleUser?.user.user_metadata.name,
            email: googleUser?.user.email,
            image: googleUser?.user.user_metadata.picture,
          });
        }
        if (set) clearInterval(interval);
      }, 3000);
    }
  });
  const { currentGame } = useAppContext();
  const userVerification = async () => {
    const googleUser = JSON.parse(
      localStorage.getItem("sb-tpeabveoygvsyymlasnb-auth-token") || "{}"
    );
    await supabase.from("user").select("email");
    if (googleUser.user) {
      const values = {
        username: googleUser?.user.user_metadata.name,
        email: googleUser?.user.email,
        image: googleUser?.user.user_metadata.picture,
      };
      setUserData(values);
    }
  };

  useEffect(() => {
    userVerification();
  }, [router]);

  (async function () {
    if (userData) {
      console.log("googleData", userData);
      const user = await signupFn(userData as User);
      if (user) {
        if (user) localStorage.setItem("home_player", JSON.stringify(user));
      }
    }
    window.location.href = "";
    // socket.on("currentGame", (data) => {
    //   if (data) {
    //     console.log(data);
    //     console.log(window.location);
    //     if (data.current && data.status === "guess_player") {
    //       setTimeout(() => {
    //         window.location.hostname = "";
    //         window.location.replace(data.current);
    //       }, 1000);
    //     }
    //     console.log(window.location);
    //   }
    // });
    if (currentGame) window.location.replace(currentGame);
  })();
  //pockerplay.vercel.app/pockerplay-frontend-cp6ck7vx0-gmarvis.vercel.app/dashboard/ce034f9e-57e7-4f10-ac96-35d87f56edf9
  return (
    <main className="flex min-h-screen ">
      <HomeNav hidden={false} />

      <div className="flex items-center mobile:max-sm:flex-col mobile:max-sm:justify-center mobile:max-sm:text-center mobile:max-sm:w-[95vw] px-24  w-full h-[80vh] justify-between mobile:max-sm:mt-10  mt-[10vh] m-auto">
        <div className="">
          <p className="text-gray-500"></p>
          <h2 className="text-[40px] font-bold text-themecolor bigScreen:text-[60px]  mobile:max-sm:w-full ">
            Welcome To PockerPlay
          </h2>
          <p className="text-gray-500">Excited to have fun?</p>
          <button
            className="bg-themecolor bigScreen:text-[40px] text-white py-2 px-8 mobile:max-sm:w-full"
            onClick={() => {
              if (userData) router.push("http://localhost:3000/dashboard");
            }}
          >
            Continue
          </button>
        </div>
        <div className="mobile:max-sm:hidden">
          <Image
            src={"/cardpic.png"}
            alt="cards image"
            width={500}
            height={500}
            className="bigScreen:hidden"
          />

          <Image
            src={"/cardpic.png"}
            alt="cards image"
            width={700}
            height={700}
            className="hidden bigScreen:block"
          />
        </div>
      </div>
    </main>
  );
}
