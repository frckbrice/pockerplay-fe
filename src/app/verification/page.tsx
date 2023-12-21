"use client";

import supabase from "@/utils/service/supabaseClient";
import React, { useEffect } from "react";
import { useState } from "react";
import Image from "next/image";

export default function Verification() {
  const [userData, setUserData] = useState<User>();

  const userVerification = async () => {
    const googleUser = JSON.parse(
      localStorage.getItem("sb-xkwspfurbsmpwwazlkmu-auth-token") || "{}"
    );
    const { data } = await supabase.from("user").select("email");
    let res = data?.filter((i) => i.email === googleUser?.user?.email);
    if (res?.length === 1) {
      localStorage.setItem("email", googleUser?.user.email);
    }

    setUserData({
      name: googleUser.user.user_metadata.name,
      email: googleUser?.user.email,
      image: googleUser?.user.user_metadata.picture,
    });
    console.log("googleData", userData);
  };

  useEffect(() => {
    userVerification();
  }, []);

  return (
    <main className="">
      <div className="flex items-center mobile:max-sm:flex-col mobile:max-sm:justify-center mobile:max-sm:text-center mobile:max-sm:w-[95vw]  w-[80vw] h-[80vh] justify-between mobile:max-sm:mt-10  mt-[10vh] m-auto">
        <div className="">
          <p className="text-gray-500">Hey {userData?.name} 👋</p>
          <h2 className="text-[40px] font-bold text-themecolor bigScreen:text-[60px]  mobile:max-sm:w-full ">
            Welcome To POCKERPLAY
          </h2>
          <p className="text-gray-500">Excited to have fun?</p>
          <button className="bg-themecolor bigScreen:text-[40px] text-white py-2 px-8 mobile:max-sm:w-full">
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
