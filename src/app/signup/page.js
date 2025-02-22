"use client";
import Link from "next/link";
import { useUser } from "@/contexts/UserContext";
import { useState } from "react";
import { redirect } from "next/navigation";

export default function LoginSignupForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { signup, user } = useUser();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Validate inputs
    if (!name || !username || !password) {
      setError("missing filed");
      return;
    }

    // Set loading state
    setLoading(true);

    try {
      // Call the signup function from the UserContext
      await signup({ username, password, name });

      // If signup is successful, redirect to the home page
      redirect("/");
    } catch (error) {
      // Handle errors from the signup function
      setError(error || "error");
    } finally {
      // Reset loading state
      setLoading(false);
    }
  };
  if (user) {
    redirect("/");
  }

  return (
    <div className="h-screen flex justify-center items-center bg-[#1a1a1a] ">
      <form
        onSubmit={(e) => handleSubmit(e)}
        className={`w-[300px] h-[400px] bg-[#2a2a2a] rounded-3xl flex flex-col items-center justify-between py-8`}
      >
        <div className="flex flex-col items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="30"
            height="30"
            viewBox="0 0 24 24"
            fill="white"
          >
            <path d="M6 3h2v2H6zm2 16h3v2H8zm8-16h2v2h-2zm-3 16h3v2h-3zm7-8V9h-2V7h-2V5h-2v2h-4V5H8v2H6v2H4v2H2v8h2v-4h2v4h2v-3h8v3h2v-4h2v4h2v-8zm-10 1H8V9h2zm6 0h-2V9h2z"></path>
          </svg>

          <h1 className=" text-white text-2xl mb-5 mt-1">Task Up</h1>
          <input
            type="text"
            className=" bg-[#3a3939] py-2 rounded-lg px-3 text-sm w-60 text-white outline-none mb-4 shadow-xl"
            placeholder="name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></input>
          <input
            type="text"
            className=" bg-[#3a3939] py-2 rounded-lg px-3 text-sm w-60 text-white outline-none mb-4 shadow-xl"
            placeholder="Username"
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          ></input>
          <input
            type="password"
            className=" bg-[#3a3939] py-2 rounded-lg px-3 text-sm w-60 text-white outline-none mb-2 shadow-xl"
            placeholder="password"
            value={password}
            required
            onChange={(e) => setPassword(e.target.value)}
          ></input>
          {error && (
            <div className="text-[#c04848] text-sm font-light mb-2">
              {error}
            </div>
          )}
        </div>
        <div className="flex flex-col items-center">
          <button
            type="submit"
            className="bg-[#201f1f] py-2 rounded-2xl text-sm w-60 text-white flex gap-2 justify-center items-center shadow-xl hover:bg-[#222222] active:bg-[#383838] transition-all "
          >
            Sign Up
            {loading && (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-3 w-3 border-t-2 border-red-500"></div>
              </div>
            )}
          </button>
          <p className="text-xs text-white mt-3">
            Already have an account?{" "}
            <Link className=" underline mx-1" href={"/login"}>
              Login
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}
