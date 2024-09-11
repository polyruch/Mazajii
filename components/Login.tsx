"use client";
import { Fugaz_One } from "next/font/google";
import React, { useState } from "react";
import Button from "./Button";
import { useAuth } from "@/context/AuthContext";

const fugaz = Fugaz_One({ subsets: ["latin"], weight: ["400"] });

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRegister, setIsRegister] = useState(false);
  const [authenticating, setAuthenticating] = useState(false);

  const { signup, login } = useAuth();

  async function handleSubmit() {
    if (!email || !password || password.length < 6) {
      return;
    }
    setAuthenticating(true);
    try {
      if (isRegister) {
        console.log("Signing up a new user");
        await signup(email, password);
      } else {
        console.log("Loggin in existing user");
        await login(email, password);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setAuthenticating(false);
    }
  }

  return (
    <div className="flex flex-col flex-1 justify-center items-center gap-4 mx-3">
      <h3 className={`${fugaz.className} text-4xl sm:text-5xl md:text-6xl`}>
        {isRegister ? "Register" : "Login"}
      </h3>
      <p>You&#39;re one step away!</p>
      <input
        type="text"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        className="w-full max-w-[400px] mx-auto px-3 hover:bo py-2 border-solid border-indigo-400 border-2 rounded-full outline-none hover:border-indigo-600 focus:border-indigo-600 duration-200"
      />
      <input
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        type="password"
        placeholder="Password"
        className="w-full max-w-[400px] mx-auto px-3 hover:bo py-2 border-solid border-indigo-400 border-2 rounded-full outline-none hover:border-indigo-600 focus:"
      />
      <div className="w-full max-w-[400px] mx-auto">
        <Button
          clickHandler={handleSubmit}
          text={authenticating ? "Submitting" : "Submit"}
          full
        />
      </div>
      <p className="text-center">
        {isRegister ? "Already have an account? " : "Don't have an account? "}
        <button
          onClick={() => setIsRegister(!isRegister)}
          className="text-indigo-600"
        >
          {isRegister ? "Login" : "Sign up"}
        </button>
      </p>
    </div>
  );
}
