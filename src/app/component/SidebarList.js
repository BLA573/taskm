"use client";
import { useState } from "react";
import AddBoard from "./AddBoard";

export default function SidebarList({ colaps, setAddboard, addBoard }) {
  const [selected, setSelected] = useState(0);

  const handleClick = () => {
    setAddboard(!addBoard);
  };

  const color = new Map();

  color.set(0, "lightpink");
  color.set(1, "#c896fb");
  color.set(2, "lightyellow");
  color.set(3, "#c3dafa");
  color.set(4, "lightgreen");

  const [board, setBoard] = useState([
    {
      title: "Coading",
      emoji: "👨‍💻",
    },
    {
      title: "Learning",
      emoji: "📚",
    },
    {
      title: "Workout",
      emoji: "💪",
    },
    {
      title: "Design ",
      emoji: "🎨",
    },
  ]);
  return (
    <div className={`flex flex-col gap-4  ${colaps && "w-fit items-center"}`}>
      {board.map((b, index) => (
        <div
          key={index}
          className={`flex gap-2 items-center p-1 border-2 ${
            index === selected ? "border-gray-700" : "border-transparent"
          } rounded-3xl cursor-pointer `}
          onClick={() => {
            setSelected(index);
          }}
        >
          <div
            className="h-8 w-8 rounded-full flex justify-center items-center text-xs"
            style={{ backgroundColor: color.get(index % 5) }}
          >
            {b.emoji}
          </div>
          <div className={`text-white text-sm ${colaps && "hidden"}`}>
            {b.title}
          </div>
        </div>
      ))}
      <div
        onClick={handleClick}
        className="flex gap-2 items-center cursor-pointer border-2 border-transparent p-2 relative"
      >
        {addBoard && <AddBoard setAddboard={setAddboard} />}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="white"
        >
          <path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm5 11h-4v4h-2v-4H7v-2h4V7h2v4h4v2z"></path>
        </svg>
        <div className={`text-white text-sm ${colaps && "hidden"}`}>
          Add board
        </div>
      </div>
    </div>
  );
}
