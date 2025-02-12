import Image from "next/image";

export default function Task({ taskDetail, image, tags = [] }) {
  const color = new Map();

  color.set(0, "lightpink");
  color.set(1, "#c896fb");
  color.set(2, "lightyellow");
  color.set(3, "#c3dafa");
  color.set(4, "lightgreen");

  return (
    <div className="bg-darkgray rounded-xl p-2 flex flex-col gap-2 w-full text-[15px]">
      {image && (
        <Image
          className="rounded-md"
          src={"/pic1.png"}
          style={{
            width: "100%",
            height: "80px",
          }}
          width={200}
          height={50}
          alt="taskImage"
        />
      )}
      <div className="text-[#e4e6e9]">{taskDetail}</div>
      <div className="flex gap-3">
        {tags.map((tag, index) => (
          <div
            key={index}
            className=" text-black px-2 rounded-lg  capitalize text-sm py-[1px]"
            style={{
              backgroundColor: color.get(index),
            }}
          >
            #{tag}
          </div>
        ))}
      </div>
    </div>
  );
}
