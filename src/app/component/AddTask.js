"use client";

import { useTasks } from "@/contexts/UseTask";
import { useBoards } from "@/contexts/UseBoard";
import { useState } from "react";

export default function AddTask({ setAddTask, status }) {
  const { addTask } = useTasks();
  const { selectedBoard } = useBoards();
  const [tags, setTags] = useState("");
  const [detail, setDetail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const user_id = "67ae21f887d160200ffb14c8";

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
    <div className=" bg-gradient-to-br from-[#1a1a1a8c]  to-[#2a2a2a] rounded-xl p-2 flex flex-col gap-2 text-[15px] w-full">
      <form action={handleSubmit} className="flex flex-col p-2">
        <label className="text-xs text-gray-200 pb-2">Task detail</label>
        <input
          type="text"
          placeholder="Design my portfolio website"
          className="bg-grayt text-white text-sm border p-1 px-2 rounded-lg border-[#4a4d52] mb-3 focus:outline-none"
          value={detail}
          required
          onChange={(e) => setDetail(e.target.value)}
          aria-label="Task detail"
        />
        <label className="text-xs text-gray-200 pb-2">Tag</label>
        <input
          type="text"
          placeholder="Design, UI, Portfolio"
          className="bg-grayt text-sm border p-1 px-2 rounded-lg border-[#4a4d52] mb-3 focus:outline-none"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          aria-label="Task tags"
        />

        <button
          type="submit"
          className="text-sm bg-[#1a1a1a] px-3 py-1 rounded-2xl flex items-center justify-center shadow-lg gap-2 mt-1"
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
