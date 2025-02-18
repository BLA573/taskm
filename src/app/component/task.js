import Image from "next/image";

export default function Task({ taskDetail, image, tags = [] }) {
  const color = new Map();

  color.set(0, "lightpink");
  color.set(1, "#c896fb");
  color.set(2, "lightyellow");
  color.set(3, "#c3dafa");
  color.set(4, "lightgreen");

  return (
    <div className="bg-gradient-to-br from-[#505aec23]  to-[#2E2B44] rounded-xl p-2 flex flex-col gap-2 text-[15px] w-full">
      <div className="text-[#e4e6e9] ">{taskDetail}</div>
      <div className="flex gap-3">
        {tags.map((tag, index) => (
          <div
            key={index}
            className=" text-[#2E2B44] px-2 rounded-[3px]  capitalize text-sm py-[1px] bg-[#bbb5d6]"
          >
            #{tag}
          </div>
        ))}
      </div>
    </div>
  );
}
