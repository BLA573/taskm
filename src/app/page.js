"use client";
import Task from "./component/task";
import AddTask from "./component/AddTask";
import { useState, useEffect } from "react";
import { useUser } from "@/contexts/UserContext";
import { useTasks } from "@/contexts/UseTask";
import { useBoards } from "@/contexts/UseBoard";
import SideBar from "./component/SideBar";

export default function Home() {
  const [addTask, setAddTask] = useState(false);
  //const { user, loading } = useUser();
  const { tasks } = useTasks();
  const { selectedBoard } = useBoards();

  useEffect(() => {
    console.log(tasks);
  }, [tasks]);

  const handleAddTaskClick = () => {
    setAddTask(!addTask);
  };

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className="flex overflow-x-hidden "
    >
      <SideBar />
      <div className="h-screen w-full bg-[#2E2B44] overflow-y-scroll ">
        <div className="bg-[#2E2B44] w-full text-white break-word grid grid-cols-1 min-[666px]:grid-cols-2 min-[920px]:grid-cols-3 min-[1150px]:grid-cols-4 pt-5 items-start">
          <div className="flex flex-col items-center gap-2 max-w-[260px] w-full mx-auto border border-gray-700 rounded-2xl p-2">
            <div className="flex items-center justify-between w-full border-b border-gray-400 p-3">
              <div className="flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="8"
                  height="8"
                  viewBox="0 0 24 24"
                  fill="white"
                  style={{ transform: "rotate(180deg)" }}
                >
                  <path d="m4.431 12.822 13 9A1 1 0 0 0 19 21V3a1 1 0 0 0-1.569-.823l-13 9a1.003 1.003 0 0 0 0 1.645z"></path>
                </svg>
                <div className="flex items-center gap-1">
                  <div className="h-2 w-2 rounded-full bg-red-500 "></div>
                  <h1>BackLog </h1>
                </div>
              </div>

              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                style={{ fill: "white" }}
                onClick={handleAddTaskClick}
              >
                <path d="M19 11h-6V5h-2v6H5v2h6v6h2v-6h6z"></path>
              </svg>
            </div>
            <div className="relative flex w-full ">
              {addTask && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                  <AddTask setAddTask={setAddTask} />
                </div>
              )}
            </div>
            {tasks &&
              selectedBoard &&
              tasks.map((task, index) => {
                if (
                  task.status === "backlog" &&
                  selectedBoard === task.board_Id
                ) {
                  return (
                    <div className="w-full" key={index}>
                      <Task taskDetail={task.detail} tags={task.tags} />
                    </div>
                  );
                }
                return null; // If task status is not "backlog", return nothing
              })}
          </div>
          <div className="flex flex-col items-center gap-2 max-w-[260px] w-full mx-auto border border-gray-700 rounded-2xl p-2 ">
            <div className="flex items-center justify-between w-full border-b border-gray-400 p-3">
              <div className="flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="8"
                  height="8"
                  viewBox="0 0 24 24"
                  fill="white"
                  style={{ transform: "rotate(180deg)" }}
                >
                  <path d="m4.431 12.822 13 9A1 1 0 0 0 19 21V3a1 1 0 0 0-1.569-.823l-13 9a1.003 1.003 0 0 0 0 1.645z"></path>
                </svg>
                <div className="flex items-center gap-1">
                  <div className="h-2 w-2 rounded-full bg-yellow-500 "></div>{" "}
                  <h1>In Progress </h1>
                </div>
              </div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                style={{ fill: "white" }}
                onClick={handleAddTaskClick}
              >
                <path d="M19 11h-6V5h-2v6H5v2h6v6h2v-6h6z"></path>
              </svg>
            </div>
            {tasks &&
              selectedBoard &&
              tasks.map((task, index) => {
                if (
                  task.status === "in progress" &&
                  // selectedBoard === task.board_Id._id ||
                  selectedBoard === task.board_Id
                ) {
                  return (
                    <div className="w-full" key={index}>
                      <Task taskDetail={task.detail} tags={task.tags} />
                    </div>
                  );
                }
                return null; // If task status is not "backlog", return nothing
              })}
          </div>
          <div className="flex flex-col items-center gap-2 max-w-[260px] w-full mx-auto border border-gray-700 rounded-2xl p-2 ">
            <div className="flex items-center justify-between w-full border-b border-gray-400 p-3">
              <div className="flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="8"
                  height="8"
                  viewBox="0 0 24 24"
                  fill="white"
                  style={{ transform: "rotate(180deg)" }}
                >
                  <path d="m4.431 12.822 13 9A1 1 0 0 0 19 21V3a1 1 0 0 0-1.569-.823l-13 9a1.003 1.003 0 0 0 0 1.645z"></path>
                </svg>
                <div className="flex items-center gap-1">
                  <div className="h-2 w-2 rounded-full bg-blue-500 "></div>
                  <h1>In Review</h1>{" "}
                </div>
              </div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                style={{ fill: "white" }}
                onClick={handleAddTaskClick}
              >
                <path d="M19 11h-6V5h-2v6H5v2h6v6h2v-6h6z"></path>
              </svg>
            </div>
            {tasks &&
              selectedBoard &&
              tasks.map((task, index) => {
                if (
                  task.status === "review" &&
                  // selectedBoard === task.board_Id._id ||
                  selectedBoard === task.board_Id
                ) {
                  return (
                    <div className="w-full" key={index}>
                      <Task taskDetail={task.detail} tags={task.tags} />
                    </div>
                  );
                }
                return null; // If task status is not "backlog", return nothing
              })}
          </div>
          <div className="flex flex-col items-center gap-2 max-w-[260px] w-full mx-auto border border-gray-700 rounded-2xl p-2 ">
            <div className="flex items-center justify-between w-full border-b border-gray-400 p-3">
              <div className="flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="8"
                  height="8"
                  viewBox="0 0 24 24"
                  fill="white"
                  style={{ transform: "rotate(180deg)" }}
                >
                  <path d="m4.431 12.822 13 9A1 1 0 0 0 19 21V3a1 1 0 0 0-1.569-.823l-13 9a1.003 1.003 0 0 0 0 1.645z"></path>
                </svg>
                <div className="flex items-center gap-1">
                  <div className="h-2 w-2 rounded-full bg-green-500 "></div>
                  <h1>Completed</h1>
                </div>
              </div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                style={{ fill: "white" }}
                onClick={handleAddTaskClick}
              >
                <path d="M19 11h-6V5h-2v6H5v2h6v6h2v-6h6z"></path>
              </svg>
            </div>

            {tasks &&
              selectedBoard &&
              tasks.map((task, index) => {
                if (
                  task.status === "completed" &&
                  // selectedBoard === task.board_Id._id ||
                  selectedBoard === task.board_Id
                ) {
                  return (
                    <div className="w-full" key={index}>
                      <Task taskDetail={task.detail} tags={task.tags} />
                    </div>
                  );
                }
                return null; // If task status is not "backlog", return nothing
              })}
          </div>
        </div>
      </div>
    </div>
  );
}
