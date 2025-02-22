"use client";
import Task from "./component/task";
import AddTask from "./component/AddTask";
import { useState, useEffect, useRef } from "react";
import { useUser } from "@/contexts/UserContext";
import { useTasks } from "@/contexts/UseTask";
import { useBoards } from "@/contexts/UseBoard";
import SideBar from "./component/SideBar";
import { redirect } from "next/navigation";

export default function Home() {
  const [addTask, setAddTask] = useState(0);
  const { user } = useUser();
  const { tasks } = useTasks();
  const { selectedBoard } = useBoards();
  const [colapsBacklog, setColapsBacklog] = useState(false);
  const [colapsProgress, setColapsProgress] = useState(false);
  const [colapsReview, setColapsReview] = useState(false);
  const [colapsCompleted, setColapsCompleted] = useState(false);

  const addTaskFormRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        addTaskFormRef.current &&
        !addTaskFormRef.current.contains(event.target)
      ) {
        setAddTask(0); // Close the AddTask form
      }
    };

    // Add event listener when the component mounts
    document.addEventListener("mousedown", handleClickOutside);

    // Clean up the event listener when the component unmounts
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleAddTaskClick = (num) => {
    setColapsBacklog(false);
    if (addTask == num) {
      setAddTask(0);
      return;
    }
    setAddTask(num);
  };

  if (!user && user === null) {
    redirect("/login");
  }

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className="flex overflow-x-hidden pl-[60px] min-[500px]:pl-0 "
    >
      <SideBar />
      <div className="h-screen w-full bg-[#2a2a2a] overflow-y-scroll ">
        <div className="bg-[#2a2a2a] w-full text-white break-word grid grid-cols-1 min-[666px]:grid-cols-2 min-[920px]:grid-cols-3 min-[1150px]:grid-cols-4 py-5 items-start gap-y-5">
          <div className="flex flex-col items-center gap-2 max-w-[260px] w-full mx-auto border border-[#454546] rounded-2xl p-2">
            <div className="flex items-center justify-between w-full border-b border-gray-400 p-3">
              <div className="flex items-center gap-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="10"
                  height="10"
                  viewBox="0 0 24 24"
                  fill="white"
                  style={{
                    transform: `rotate(${colapsBacklog ? 180 : 270}deg)`,
                  }}
                  onClick={() => setColapsBacklog(!colapsBacklog)}
                >
                  <path d="m4.431 12.822 13 9A1 1 0 0 0 19 21V3a1 1 0 0 0-1.569-.823l-13 9a1.003 1.003 0 0 0 0 1.645z"></path>
                </svg>
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-red-500 shadow-[0_0_4px_1px_rgba(239,68,68,0.7)]"></div>

                  <h1>BackLog </h1>
                </div>
              </div>

              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                style={{ fill: "white" }}
                onClick={() => handleAddTaskClick(1)}
              >
                <path d="M19 11h-6V5h-2v6H5v2h6v6h2v-6h6z"></path>
              </svg>
            </div>
            <div>
              {addTask == 1 && !colapsBacklog && (
                <div ref={addTaskFormRef}>
                  <AddTask setAddTask={setAddTask} status={"backlog"} />
                </div>
              )}
            </div>
            {tasks &&
              selectedBoard &&
              !colapsBacklog &&
              tasks.map((task, index) => {
                if (
                  task.status === "backlog" &&
                  selectedBoard === task.board_Id
                ) {
                  return (
                    <div className="w-full" key={index}>
                      <Task task={task} />
                    </div>
                  );
                }
                return null; // If task status is not "backlog", return nothing
              })}
          </div>
          <div className="flex flex-col items-center gap-2 max-w-[260px] w-full mx-auto border border-[#454546] rounded-2xl p-2 ">
            <div className="flex items-center justify-between w-full border-b border-gray-400 p-3">
              <div className="flex items-center gap-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="10"
                  height="10"
                  viewBox="0 0 24 24"
                  fill="white"
                  style={{
                    transform: `rotate(${colapsProgress ? 180 : 270}deg)`,
                  }}
                  onClick={() => setColapsProgress(!colapsProgress)}
                >
                  <path d="m4.431 12.822 13 9A1 1 0 0 0 19 21V3a1 1 0 0 0-1.569-.823l-13 9a1.003 1.003 0 0 0 0 1.645z"></path>
                </svg>
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-yellow-300 shadow-[0_0_4px_1px_rgba(253,224,71,0.8)]"></div>

                  <h1>In Progress </h1>
                </div>
              </div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                style={{ fill: "white" }}
                onClick={() => handleAddTaskClick(2)}
              >
                <path d="M19 11h-6V5h-2v6H5v2h6v6h2v-6h6z"></path>
              </svg>
            </div>
            <div>
              {addTask == 2 && !colapsProgress && (
                <div ref={addTaskFormRef}>
                  <AddTask setAddTask={setAddTask} status={"in progress"} />
                </div>
              )}
            </div>
            {tasks &&
              selectedBoard &&
              !colapsProgress &&
              tasks.map((task, index) => {
                if (
                  task.status === "in progress" &&
                  // selectedBoard === task.board_Id._id ||
                  selectedBoard === task.board_Id
                ) {
                  return (
                    <div className="w-full" key={index}>
                      <Task task={task} />
                    </div>
                  );
                }
                return null; // If task status is not "backlog", return nothing
              })}
          </div>
          <div className="flex flex-col items-center gap-2 max-w-[260px] w-full mx-auto border border-[#454546] rounded-2xl p-2 ">
            <div className="flex items-center justify-between w-full border-b border-gray-400 p-3">
              <div className="flex items-center gap-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="10"
                  height="10"
                  viewBox="0 0 24 24"
                  fill="white"
                  style={{
                    transform: `rotate(${colapsReview ? 180 : 270}deg)`,
                  }}
                  onClick={() => setColapsReview(!colapsReview)}
                >
                  <path d="m4.431 12.822 13 9A1 1 0 0 0 19 21V3a1 1 0 0 0-1.569-.823l-13 9a1.003 1.003 0 0 0 0 1.645z"></path>
                </svg>
                <div className="flex items-center gap-3 ">
                  <div className="h-3 w-3 rounded-full bg-blue-500 shadow-[0_0_4px_1px_rgba(59,130,246,0.7)] "></div>
                  <h1>In Review</h1>{" "}
                </div>
              </div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                style={{ fill: "white" }}
                onClick={() => handleAddTaskClick(3)}
              >
                <path d="M19 11h-6V5h-2v6H5v2h6v6h2v-6h6z"></path>
              </svg>
            </div>
            <div>
              {addTask == 3 && !colapsReview && (
                <div ref={addTaskFormRef}>
                  <AddTask setAddTask={setAddTask} status={"review"} />
                </div>
              )}
            </div>

            {tasks &&
              selectedBoard &&
              !colapsReview &&
              tasks.map((task, index) => {
                if (
                  task.status === "review" &&
                  // selectedBoard === task.board_Id._id ||
                  selectedBoard === task.board_Id
                ) {
                  return (
                    <div className="w-full" key={index}>
                      <Task task={task} />{" "}
                    </div>
                  );
                }
                return null; // If task status is not "backlog", return nothing
              })}
          </div>
          <div className="flex flex-col items-center gap-2 max-w-[260px] w-full mx-auto border border-[#454546] rounded-2xl p-2 ">
            <div className="flex items-center justify-between w-full border-b border-gray-400 p-3">
              <div className="flex items-center gap-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="10"
                  height="10"
                  viewBox="0 0 24 24"
                  fill="white"
                  style={{
                    transform: `rotate(${colapsCompleted ? 180 : 270}deg)`,
                  }}
                  onClick={() => setColapsCompleted(!colapsCompleted)}
                >
                  <path d="m4.431 12.822 13 9A1 1 0 0 0 19 21V3a1 1 0 0 0-1.569-.823l-13 9a1.003 1.003 0 0 0 0 1.645z"></path>
                </svg>
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-green-500 shadow-[0_0_4px_1px_rgba(34,197,94,0.7)]"></div>
                  <h1>Completed</h1>
                </div>
              </div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                style={{ fill: "white" }}
                onClick={() => handleAddTaskClick(4)}
              >
                <path d="M19 11h-6V5h-2v6H5v2h6v6h2v-6h6z"></path>
              </svg>
            </div>
            <div>
              {addTask == 4 && !colapsCompleted && (
                <div ref={addTaskFormRef}>
                  <AddTask setAddTask={setAddTask} status={"completed"} />
                </div>
              )}
            </div>
            {tasks &&
              selectedBoard &&
              !colapsCompleted &&
              tasks.map((task, index) => {
                if (
                  task.status === "completed" &&
                  // selectedBoard === task.board_Id._id ||
                  selectedBoard === task.board_Id
                ) {
                  return (
                    <div className="w-full" key={index}>
                      <Task task={task} />
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
