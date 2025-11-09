import axios from "axios";
import { useState } from "react";

// not the safest way to store users lawl
async function handleSubmit(e) {
  e.preventDefault();
  try {
    const response = await axios.post("http://localhost:3003/sign-up", {
      username: e.target.username.value,
      password: e.target.password.value,
    });

    console.log(response);
  } catch (err) {
    console.log(err);
  }
}

export default function PracticeUser() {
  return (
    <>
      <h1 className="bold text-xl">basic user auth sign up form lawl</h1>
      <form onSubmit={handleSubmit} className="flex flex-col">
        <label name="username"> Username </label>
        <input
          id="username"
          name="username"
          placeholder="username"
          type="text"
          className="w-40 focus:outline-none"
        />
        <label name="password"> Password </label>
        <input
          id="password"
          name="password"
          type="password"
          className="w-40 focus:outline-none"
        />
        <button type="submit" className="p-2 bg-pink-400 rounded w-20">
          {" "}
          Sign Up{" "}
        </button>
      </form>
    </>
  );
}
