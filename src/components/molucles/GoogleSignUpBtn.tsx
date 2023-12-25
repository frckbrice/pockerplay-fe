"use client";
import supabase from "@/utils/service/supabaseClient";
import Image from "next/image";

const urlToUse = () => {
  let url: string | undefined =
    // process?.env?.NEXT_PUBLIC_SITE_URL ?? // Set this to your site URL in production env.
    process.env.NODE_ENV === "production"
      ? process?.env?.NEXT_PUBLIC_VERCEL_URL // Automatically set by Vercel.
      : "http://localhost:3000/verification";
  url = url?.includes("http") ? url : `https://${url}`;
  url = url?.charAt(url.length - 1) === "/" ? url : `${url}/`;
  console.log("hint", process.env.NODE_ENV);
  return url;
};

export default function GoogleSignUpBtn() {
  const handleGoogleSignin = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        queryParams: {
          access_type: "offline",
          prompt: "consent",
        },
        redirectTo: urlToUse(),
      },
    });
    if (data) console.log("data from supabase", data);
    if (error) console.log("error from supabase", error);
  };

  return (
    <button
      onClick={handleGoogleSignin}
      className="flex items-center gap-5 border border-gray-300 w-[80%] mobile:max-md:p-4 justify-center py-2 rounded-md"
    >
      <Image
        src={"/google-signup.png"}
        alt="googe sign up button"
        width={30}
        height={30}
      />

      <span className="text-[15px]">Continue with Google</span>
    </button>
  );
}
