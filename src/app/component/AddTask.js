"use client";

import { useTasks } from "@/contexts/UseTask";
import { useBoards } from "@/contexts/UseBoard";
import { useState } from "react";

export default function AddTask({ setAddTask }) {
  const { addTask } = useTasks();
  const { selectedBoard } = useBoards();
  const [tags, setTags] = useState("");
  const [detail, setDetail] = useState("");
  const [status, setStatus] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const user_id = "67ae21f887d160200ffb14c8";

  const handleClick = () => {
    setAddTask(false);
  };

  const handleSubmit = async () => {
    // e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const validStatus = [
        "backlog",
        "in progress",
        "completed",
        "review",
      ].includes(status)
        ? status
        : "backlog";

      // Reset form
      setDetail("");
      setTags("");
      setStatus("");
      setAddTask(false);
      addTask({
        detail,
        tags: tags.split(",").map((tag) => tag.trim()),
        status: validStatus,
        board_Id: selectedBoard,
        user_id,
      });
    } catch (error) {
      setError(error.message || "Failed to add task");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="absolute min-[440px]:left-0 bg-grayt w-72 rounded-xl border-4 border-[#4d373c] overflow-y-auto z-30">
      <form action={handleSubmit} className="flex flex-col p-2">
        <div className="flex justify-between pb-2">
          <h1 className="text-white text-sm">Task</h1>
          <button
            type="button"
            onClick={handleClick}
            aria-label="Close add task form"
          >
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
            >
              <path d="M19 11h-6V5h-2v6H5v2h6v6h2v-6h6z"></path>
            </svg>
          </button>
        </div>

        <label className="text-xs text-gray-200 pb-2">Task detail</label>
        <input
          type="text"
          placeholder="Design my portfolio website"
          className="bg-grayt text-sm border p-1 px-2 rounded-lg border-[#4a4d52] mb-3 focus:outline-none"
          value={detail}
          required
          onChange={(e) => setDetail(e.target.value)}
          aria-label="Task detail"
        />

        <label className="text-xs text-gray-200 pb-2">Status</label>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="bg-grayt text-sm border p-1 px-2 rounded-lg border-[#4a4d52] mb-3 focus:outline-none"
          aria-label="Task status"
        >
          <option value="" disabled>
            Select status
          </option>
          <option value="backlog">Backlog</option>
          <option value="in progress">In Progress</option>
          <option value="review">Review</option>
          <option value="completed">Completed</option>
        </select>

        <label className="text-xs text-gray-200 pb-2">Tag</label>
        <input
          type="text"
          placeholder="Design, UI, Portfolio"
          className="bg-grayt text-sm border p-1 px-2 rounded-lg border-[#4a4d52] mb-3 focus:outline-none"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          aria-label="Task tags"
        />

        {error && <div className="text-red-500 text-sm mt-2">{error}</div>}

        <button
          type="submit"
          disabled={isLoading}
          className="text-sm bg-bluet px-3 py-1 rounded-2xl flex items-center justify-center shadow-lg gap-2 w-fit"
        >
          {isLoading ? "Saving..." : "Save"}
          {!isLoading && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              style={{ fill: "rgba(255, 255, 255, 1)" }}
            >
              <path d="m10 15.586-3.293-3.293-1.414 1.414L10 18.414l9.707-9.707-1.414-1.414z"></path>
            </svg>
          )}
        </button>
      </form>
    </div>
  );
}
