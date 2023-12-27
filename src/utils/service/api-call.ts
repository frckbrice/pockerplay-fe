import { api_call } from "./constant";
import supabase from "./supabaseClient";

export const signupFn = async (user: User): Promise<User | null> => {
  console.log("api address: ", api_call);
  const apiUser = await fetch(api_call + "/users", {
    method: "POST",
    body: JSON.stringify(user),
    headers: {
      "content-type": "application/json",
    },
  });

  if (apiUser.ok) return apiUser.json() as Promise<User | null>;
  return null;
};

export const userVerification = async () => {
  "use client";
  const googleUser = JSON.parse(
    localStorage.getItem("sb-tpeabveoygvsyymlasnb-auth-token") || "{}"
  );
  const { data } = await supabase.from("user").select("email");

  const values = {
    username: googleUser.user.user_metadata.name,
    email: googleUser?.user.email,
    image: googleUser?.user.user_metadata.picture,
  };
  const user = await signupFn(values as User);
  // if (user) localStorage.setItem("home_player", JSON.stringify(user));
  return user;
};
