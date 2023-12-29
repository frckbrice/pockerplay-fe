import { api_call } from "./constant";
import supabase from "./supabaseClient";

export const signupFn = async (user: {
  username: string;
}): Promise<User | null> => {
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

console.log(api_call);