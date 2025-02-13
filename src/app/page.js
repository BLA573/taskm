"use client";
import SidebarList from "../component/SidebarList";
import Task from "../component/task";
import AddBoard from "../component/AddBoard";
import AddTask from "../component/AddTask";
import { useState } from "react";

export default function Home() {
  const [addTask, setAddTask] = useState(false);
  const [colaps, setColaps] = useState(true);
  const [addBoard, setAddboard] = useState(false);

  const handleAddTaskClick = () => {
    setAddTask(!addTask);
  };
  const handleColaps = () => {
    setColaps(!colaps);
  };

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className="flex overflow-x-hidden "
    >
      <div
        className={`bg-darkgray h-screen w-[250px] flex flex-col justify-between p-2 pt-5 ${
          colaps && "items-center w-[60px] "
        } `}
      >
        <div className="flex flex-col gap-4">
          <h1 className="text-3xl text-white flex items-center justify-center gap-2 h-10">
            <span className={`${colaps && "hidden"}`}>Boards</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="white"
              onClick={handleColaps}
              style={!colaps ? { transform: "rotate(180deg)" } : {}}
            >
              <path d="M10.296 7.71 14.621 12l-4.325 4.29 1.408 1.42L17.461 12l-5.757-5.71z"></path>
              <path d="M6.704 6.29 5.296 7.71 9.621 12l-4.325 4.29 1.408 1.42L12.461 12z"></path>
            </svg>
          </h1>
          <SidebarList
            colaps={colaps}
            setAddboard={setAddboard}
            addBoard={addBoard}
          />
        </div>
        <div className="bg-grayt p-1 rounded-xl flex justify-center text-sm w-full">
          <button
            className={`bg-darkgray w-1/2 ${
              colaps && "w-10"
            } py-2  rounded-lg text-white flex justify-center gap-[6px] items-center`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 384 512"
              height={15}
              width={15}
              fill="white"
            >
              <path d="M223.5 32C100 32 0 132.3 0 256S100 480 223.5 480c60.6 0 115.5-24.2 155.8-63.4c5-4.9 6.3-12.5 3.1-18.7s-10.1-9.7-17-8.5c-9.8 1.7-19.8 2.6-30.1 2.6c-96.9 0-175.5-78.8-175.5-176c0-65.8 36-123.1 89.3-153.3c6.1-3.5 9.2-10.5 7.7-17.3s-7.3-11.9-14.3-12.5c-6.3-.5-12.6-.8-19-.8z" />
            </svg>
            <span className={`${colaps && "hidden"}`}>Dark</span>
          </button>
          <button
            className={`w-1/2 py-2  rounded-lg text-white flex justify-center gap-[6px] items-center ${
              colaps && "hidden"
            }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={17}
              height={17}
              viewBox="0 0 24 24"
              fill="white"
            >
              <path d="M6.995 12c0 2.761 2.246 5.007 5.007 5.007s5.007-2.246 5.007-5.007-2.246-5.007-5.007-5.007S6.995 9.239 6.995 12zM11 19h2v3h-2zm0-17h2v3h-2zm-9 9h3v2H2zm17 0h3v2h-3zM5.637 19.778l-1.414-1.414 2.121-2.121 1.414 1.414zM16.242 6.344l2.122-2.122 1.414 1.414-2.122 2.122zM6.344 7.759 4.223 5.637l1.415-1.414 2.12 2.122zm13.434 10.605-1.414 1.414-2.122-2.122 1.414-1.414z"></path>
            </svg>
            <span className={`${colaps && "hidden"}`}>Light</span>
          </button>
        </div>
      </div>
      <div className="h-screen w-full bg-grayt overflow-y-scroll ">
        <div className="bg-grayt w-full text-white break-word grid grid-cols-1 min-[666px]:grid-cols-2 min-[920px]:grid-cols-3 min-[1150px]:grid-cols-4 pt-5 mb-10">
          <div className="flex flex-col items-center gap-4 px-2 pb-3 max-w-[300px] w-full mx-auto ">
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-red-500 "></div>
              <h1>BackLog (2)</h1>
            </div>
            <Task taskDetail={"eek else am in big problem"} />
            <Task
              taskDetail={
                "i have to do this by the end the week else am in big problem"
              }
              tags={["design", "frontend"]}
            />
            <div className="relative flex w-full ">
              <div className=" px-4 py-2 bg-gray-300  font-semibold rounded-xl cursor-pointer  w-full">
                {addTask && (
                  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <AddTask setAddTask={setAddTask} />
                  </div>
                )}
                <div
                  className="flex justify-between"
                  onClick={handleAddTaskClick}
                >
                  <button className="text-bluet">Add New Task</button>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    style={{ fill: "#3762e4" }}
                  >
                    <path d="M19 11h-6V5h-2v6H5v2h6v6h2v-6h6z"></path>
                  </svg>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center gap-4 px-2 pb-3 max-w-[300px] w-full mx-auto ">
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-yellow-500 "></div>
              <h1>In Progress (3)</h1>
            </div>
            <Task
              taskDetail={
                "i have to do this by the end the week else am in big problem really big big problem not even super man can save me"
              }
            />
            <Task
              taskDetail={
                "i have to do this by the end the week else am in big problem"
              }
            />
            <Task
              taskDetail={
                "i have to do this by the end the week else am in big problem"
              }
            />
          </div>
          <div className="flex flex-col items-center gap-4 px-2 pb-3 max-w-[300px] w-full mx-auto ">
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-purple-500 "></div>
              <h1>In Review (2)</h1>
            </div>
            <Task
              taskDetail={
                "i have to do this by the end the week else am in big problem really big big problem not even super man can save me"
              }
            />
          </div>
          <div className="flex flex-col items-center gap-4 px-2 pb-3 max-w-[300px] w-full mx-auto ">
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-green-500 "></div>
              <h1>Completed (2)</h1>
            </div>
            <Task
              taskDetail={
                "i have to do this by the end the week else am in big problem"
              }
            />
            <Task
              taskDetail={
                "i have to do this by the end the week else am in big problem"
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
}
