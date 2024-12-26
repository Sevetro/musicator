import { SubmitHandler } from "react-hook-form";

import { registerUserUrl } from "@/api/register-user";
import { RegisterUserData } from "@/shared/entities/user";
import { RegisterFormSchema } from "./register-form.data";

export async function registerUser(body: RegisterUserData) {
  const response = await fetch(registerUserUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify(body),
    credentials: "include",
  });

  return response;

  // .then((res) => res.json())
  // .then((data) => console.log(`My data from server:`, data))
  // .catch((err) => console.log(err));
}

// export const onSubmit: SubmitHandler<RegisterFormSchema> = (data) => {
//   const userData = {
//     name: data.name,
//     email: data.email,
//     password: data.password,
//   };
//   registerUser(userData);
// };
