"use client";
import Link from "next/link";

export default function LoginSignupForm() {
  return (
    <div className="h-screen flex justify-center items-center bg-[#1a1a1a]">
      <div
        className={`w-[300px] h-[400px] bg-[#2a2a2a] rounded-3xl flex flex-col items-center py-8`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="30"
          height="30"
          viewBox="0 0 24 24"
          fill="white"
        >
          <path d="M6 3h2v2H6zm2 16h3v2H8zm8-16h2v2h-2zm-3 16h3v2h-3zm7-8V9h-2V7h-2V5h-2v2h-4V5H8v2H6v2H4v2H2v8h2v-4h2v4h2v-3h8v3h2v-4h2v4h2v-8zm-10 1H8V9h2zm6 0h-2V9h2z"></path>
        </svg>
        <h1 className=" text-white text-2xl mb-10 mt-1">Task App</h1>
        <input
          type="text"
          className=" bg-[#3a3939] py-2 rounded-lg px-3 text-sm w-60 text-white outline-none mb-4"
          placeholder="Username"
        ></input>
        <input
          type="password"
          className=" bg-[#3a3939] py-2 rounded-lg px-3 text-sm w-60 text-white outline-none mb-4"
          placeholder="password"
        ></input>
        <button className="bg-[#201f1f] py-2 rounded-2xl text-sm w-60 text-white mt-14">
          Sign Up
        </button>
        <p className="text-xs text-white mt-3">
          Don't have an account? <Link href={"#"}>Sign Up</Link>
        </p>
      </div>
    </div>
  );
}
