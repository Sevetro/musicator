"use client";

import { FormEvent } from "react";
import { URLSearchParams } from "url";

const url = "http://localhost:8080";

interface LoginRequestBody {
  username: string;
  password: string;
}

export const LoginForm = () => {
  function login(body: any) {
    fetch(url, {
      method: "POST",
      // headers: {
      //   "Content-Type": "application/json",
      // },
      headers: {
        "Content-Type": "multipart/form-data",
      },
      // body: JSON.stringify(body),
      body,

      // credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => console.log(`My data from server:`, data))
      .catch((err) => console.log(err));
  }

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    // const object = Object.fromEntries(formData) as unknown as LoginRequestBody;
    login(formData);
  }

  return (
    <form onSubmit={onSubmit}>
      <div>Login</div>
      <br />
      <div>
        <input type="text" name="username" placeholder="username" required />
        <span className="errormsg" />
      </div>
      <div>
        <input
          type="password"
          name="password"
          placeholder="password"
          required
        />
        <span className="errormsg" />
      </div>
      <br />
      <button type="submit">Login</button>
    </form>
  );
};
