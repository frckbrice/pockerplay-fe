
import { api_call } from "./constant";
import supabase from "./supabaseClient";
import 

export const signupUser = async (user: User): Promise<User | null> => {
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
