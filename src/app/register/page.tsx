"use client";
import GoogleSignUpBtn from "@/components/molucles/GoogleSignUpBtn";
import Image from "next/image";
import Link from "next/link";
export default function Register() {
  return (
    <main className="flex h-screen flex-col items-center justify-between">
      <div className="flex flex-col justify-center items-center gap-5 h-[20vh] m-auto w-[60vh] mobile:max-sm:mt-[40vh] mobile:max-sm:w-full">
        <Link href={"/"}>
          <Image
            src={"/POCKERPLAY-LOGO copy.png"}
            alt="PockerPlay  logo"
            width={200}
            height={100}
          />
        </Link>

        <h3 className="text-gray-500">Log In to Your Account</h3>
        <GoogleSignUpBtn />
      </div>
    </main>
  );
}
