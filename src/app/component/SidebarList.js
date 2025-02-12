"use client";
import { useState } from "react";

export default function SidebarList() {
  const [selected, setSelected] = useState(0);
  const color = new Map();

  color.set(0, "lightpink");
  color.set(1, "#c896fb");
  color.set(2, "lightyellow");
  color.set(3, "#c3dafa");
  color.set(4, "lightgreen");

  const [board, setBoard] = useState([
    {
      title: "Coading Bord",
      emoji: "🚀",
    },
    {
      title: "Learning Bord",
      emoji: "📚",
    },
    {
      title: "Workout Bord",
      emoji: "💪",
    },
    {
      title: "Design ",
      emoji: "🎨",
    },
  ]);

  return (
    <div className="flex flex-col gap-4">
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
          <div className="text-white text-sm">{b.title}</div>
        </div>
      ))}
    </div>
  );
}
