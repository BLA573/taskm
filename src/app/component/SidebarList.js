"use client";
import { useState } from "react";
import { useBoards } from "@/contexts/UseBoard";

export default function SidebarList({ colaps, setAddboard, addBoard }) {
  const [selected, setSelected] = useState(0);
  const { boards, setSelectedBoard, deleteBoard } = useBoards();

  const handleClick = () => {
    setAddboard(!addBoard);
  };

  const handleSelectedBoaed = (id, index) => {
    setSelectedBoard(id);
    setSelected(index);
  };

  return (
    <div
      className={`flex flex-col justify-center gap-1  ${
        colaps && "w-fit items-center relative"
      }`}
    >
      <div className="flex gap-2 items-center cursor-pointer border-2 border-transparent p-2 mt-4 justify-between ">
        <div className={`text-[#c5c2c9] text-sm ${colaps && "hidden"}`}>
          Board
        </div>
        <svg
          onClick={handleClick}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 448 512"
          height="16"
          width="16"
          fill="#c5c2c9"
        >
          <path d="M64 80c-8.8 0-16 7.2-16 16l0 320c0 8.8 7.2 16 16 16l320 0c8.8 0 16-7.2 16-16l0-320c0-8.8-7.2-16-16-16L64 80zM0 96C0 60.7 28.7 32 64 32l320 0c35.3 0 64 28.7 64 64l0 320c0 35.3-28.7 64-64 64L64 480c-35.3 0-64-28.7-64-64L0 96zM200 344l0-64-64 0c-13.3 0-24-10.7-24-24s10.7-24 24-24l64 0 0-64c0-13.3 10.7-24 24-24s24 10.7 24 24l0 64 64 0c13.3 0 24 10.7 24 24s-10.7 24-24 24l-64 0 0 64c0 13.3-10.7 24-24 24s-24-10.7-24-24z" />
        </svg>
      </div>
      {boards &&
        boards.map((b, index) => (
          <div
            key={index}
            className={`flex items-center gap-2 relative p-[9px] ${
              index === selected ? "bg-[#2a2a2a]  " : " "
            } cursor-pointer rounded-[4px] mx-2 ${colaps && "mx-0"}`}
            onClick={() => handleSelectedBoaed(b._id, index)}
          >
            <div className="rounded-full flex justify-center items-center text-xs">
              <div dangerouslySetInnerHTML={{ __html: b.emoji }} />
            </div>
            <div
              className={`text-[#c5c2c9] text-xs ${colaps && "hidden"} ${
                index === selected ? "text-white " : " "
              } capitalize`}
            >
              {b.name.split(" ")[0].slice(0, 12)}
            </div>
            <div
              className={`absolute right-1 ${
                index === selected && !colaps ? "flex" : "hidden"
              }`}
              onClick={() => deleteBoard(b)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="white"
              >
                <path d="M5 20a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8h2V6h-4V4a2 2 0 0 0-2-2H9a2 2 0 0 0-2 2v2H3v2h2zM9 4h6v2H9zM8 8h9v12H7V8z"></path>
                <path d="M9 10h2v8H9zm4 0h2v8h-2z"></path>
              </svg>
            </div>
          </div>
        ))}
    </div>
  );
}
