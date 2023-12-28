"use client";

import supabase from "@/utils/service/supabaseClient";
import React, { useEffect } from "react";
import { useState } from "react";
import Image from "next/image";
import { userVerification } from "@/utils/service/api-call";
import { signupFn } from "@/utils/service/api-call";
import RoundLoader from "@/components/atoms/RoundLoader";
import { useRouter } from "next/navigation";
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
    const currentGame: string = localStorage.getItem("currentGame")!;
    if (currentGame) router.push(currentGame);
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
  })();

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
          <div className="border border-themecolor mobile:max-sm:border-none flex justify-between mobile:max-sm:flex-col mobile:max-sm:gap-2">
            <input
              className="w-full px-2 outline-none mobile:max-sm:mt-5 mobile:max-sm:border mobile:max-sm:border-themecolor mobile:max-sm:py-2"
              placeholder="Enter your Name"
            />
            <button
              className="bg-themecolor bigScreen:text-[40px] text-white py-2 px-8 mobile:max-sm:w-full"
              onClick={() => {
                if (userData) router.push("/dashboard");
              }}
            >
              Continue
            </button>
          </div>
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
