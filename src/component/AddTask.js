"use client";
export default function AddTask({ setAddTask }) {
  const handleClick = () => {
    setAddTask(false);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <div className="absolute  min-[440px]:left-0 bg-grayt w-72 rounded-xl border-4 border-[#4d373c] overflow-y-auto z-30">
      <form onSubmit={handleSubmit} className="flex flex-col p-2">
        <div className="flex justify-between pb-2 ">
          <h1 className="text-white text-sm ">Task</h1>
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
        <label className="text-xs text-gray-200 pb-2">Task detail</label>
        <input
          type="text"
          placeholder="Design my portfolio website"
          className="bg-grayt text-sm border p-1 px-2 rounded-lg border-[#4a4d52] mb-3 focus:outline-none"
        />
        <label className="text-xs text-gray-200 pb-2">Status</label>
        <input
          type="text"
          placeholder="Backlog"
          className="bg-grayt text-sm border p-1 px-2 rounded-lg border-[#4a4d52] mb-3 focus:outline-none"
        />
        <label className="text-xs text-gray-200 pb-2">Tag</label>
        <input
          type="text"
          placeholder="Design"
          className="bg-grayt text-sm border p-1 px-2 rounded-lg border-[#4a4d52] mb-3 focus:outline-none"
        />
        <button className="text-sm  bg-bluet px-3 py-1 rounded-2xl flex items-center justify-center shadow-lg gap-2 w-fit">
          Save
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
