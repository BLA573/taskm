import { useTasks } from "@/contexts/UseTask";
import { useState, useRef, useEffect } from "react";

export default function Task({ task }) {
  const { deleteTask, updateTask } = useTasks();
  const [status, setStatus] = useState(task.status);
  const [detail, setDetail] = useState(task.detail);
  const [tags, setTags] = useState(task.tags);
  const [isEditing, setIsEditing] = useState(false);

  const editFormRef = useRef(null); // Ref to track the edit form

  // Handle clicks outside the edit form
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (editFormRef.current && !editFormRef.current.contains(event.target)) {
        setIsEditing(false); // Close edit mode
      }
    };

    // Add event listener when the component mounts
    document.addEventListener("mousedown", handleClickOutside);

    // Clean up the event listener when the component unmounts
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    try {
      setIsEditing(false);
      await updateTask(task._id, {
        detail,
        tags,
        status,
      });
    } catch (error) {
      console.error("Failed to update task:");
    }
  };

  return (
    <div className="bg-gradient-to-br from-[#1a1a1a8c] to-[#292727] rounded-xl p-2 flex flex-col gap-2 text-[15px] w-full group relative">
      {isEditing ? (
        <form
          ref={editFormRef} // Attach ref to the edit form
          onSubmit={handleSubmit}
          className="flex flex-col"
        >
          <label className="text-xs text-gray-200 pb-1">Task detail</label>
          <textarea
            type="text"
            className="bg-grayt text-sm border p-1 px-2 rounded-lg border-[#4a4d52] mb-3 focus:outline-none resize-none h-28"
            autoFocus
            value={detail}
            onChange={(e) => setDetail(e.target.value)}
            aria-label="Task detail"
          />
          <label className="text-xs text-gray-200 pb-1">Status</label>
          <select
            className="bg-grayt text-sm border p-1 px-2 rounded-lg border-[#4a4d52] mb-3 focus:outline-none"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="backlog">Backlog</option>
            <option value="in progress">In Progress</option>
            <option value="review">Review</option>
            <option value="completed">Completed</option>
          </select>
          <label className="text-xs text-gray-200 pb-1">Tag</label>
          <input
            type="text"
            className="bg-grayt text-sm border p-1 px-2 rounded-lg border-[#4a4d52] mb-3 focus:outline-none"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            aria-label="Task tags"
          />
          <button
            type="submit"
            className="text-sm bg-[#1a1a1a] px-3 py-1 rounded-2xl flex items-center justify-center shadow-lg gap-2 mt-1 hover:bg-[#222222] active:bg-[#383838] transition-all"
          >
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
      ) : (
        <>
          <div className="text-[#e4e6e9]">{task.detail}</div>
          <div className="flex gap-3">
            <div className="text-white px-2 rounded-[3px] capitalize text-sm py-[1px] bg-[#2a2a2a]">
              # {task.tags}
            </div>
          </div>
          <div
            onClick={(e) => e.stopPropagation()}
            className="hidden group-hover:flex gap-2 absolute right-2 bottom-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="white"
              onClick={() => setIsEditing(true)}
            >
              <path d="M19.045 7.401c.378-.378.586-.88.586-1.414s-.208-1.036-.586-1.414l-1.586-1.586c-.378-.378-.88-.586-1.414-.586s-1.036.208-1.413.585L4 13.585V18h4.413L19.045 7.401zm-3-3 1.587 1.585-1.59 1.584-1.586-1.585 1.589-1.584zM6 16v-1.585l7.04-7.018 1.586 1.586L7.587 16H6zm-2 4h16v2H4z"></path>
            </svg>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="white"
              onClick={() => deleteTask(task)}
            >
              <path d="M5 20a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8h2V6h-4V4a2 2 0 0 0-2-2H9a2 2 0 0 0-2 2v2H3v2h2zM9 4h6v2H9zM8 8h9v12H7V8z"></path>
              <path d="M9 10h2v8H9zm4 0h2v8h-2z"></path>
            </svg>
          </div>
        </>
      )}
    </div>
  );
}
