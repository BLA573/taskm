"use client";

import { useState } from "react";

export default function AddBoard({ setAddboard }) {
  const handleClick = () => {
    setAddboard(false);
  };
  const [emoji, setEmoji] = useState([
    "🤑",
    "📚",
    "💪",
    "👨‍🍳",
    "👩‍💻",
    "🎨",
    "🧺",
    "✈",
    "💒",
    "🎉",
    "⏰",
    "💑",
    "👨‍👩‍👧‍👦",
  ]);
  const color = new Map();

  color.set(0, "lightpink");
  color.set(1, "#c896fb");
  color.set(2, "lightyellow");
  color.set(3, "#c3dafa");
  color.set(4, "lightgreen");

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  // left-10 bottom-8
  return (
    <div className="absolute left-0 bottom-8 min-[400px]:left-10  bg-grayt w-80 rounded-xl border-4 border-[#4d373c] z-10">
      <form onSubmit={handleSubmit} className="flex flex-col p-2">
        <div className="flex justify-between pb-2 ">
          <h1 className="text-white text-sm">New board</h1>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            style={{
              fill: "white",
              transform: "rotate(45deg)",
              cursor: "pointer",
            }}
            onClick={handleClick}
          >
            <path d="M19 11h-6V5h-2v6H5v2h6v6h2v-6h6z"></path>
          </svg>
        </div>
        <label className="text-xs text-gray-200 pb-2">Board name</label>
        <input
          type="text"
          placeholder="e.g Design board"
          className="bg-grayt text-white text-sm border p-1 px-2 rounded-lg border-[#4a4d52] mb-3 focus:outline-none"
        />
        <label className="text-xs text-gray-200 pb-2">Tag</label>
        <div className="flex gap-x-4 gap-y-2 flex-wrap mb-5">
          {emoji.map((e, i) => (
            <div
              key={i}
              className={`h-7 w-7 rounded-full flex justify-center items-center text-[10px]`}
              style={{ backgroundColor: color.get(i % 5) }}
            >
              {e}
            </div>
          ))}
        </div>
        <button className="text-sm text-white bg-bluet px-3 py-1 rounded-2xl flex items-center justify-center gap-2 w-fit shadow-lg">
          Create board
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            style={{ fill: "rgba(255, 255, 255, 1)" }}
          >
            <path d="m10 15.586-3.293-3.293-1.414 1.414L10 18.414l9.707-9.707-1.414-1.414z"></path>
          </svg>
        </button>
      </form>
    </div>
  );
}
