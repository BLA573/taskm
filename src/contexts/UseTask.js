"use client";
import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const TaskContext = createContext();

export function TaskProvider({ children }) {
  const [tasks, setTasks] = useState([]);

  const addTask = async (newTask) => {
    const optimisticTask = { ...newTask, _id: "101" };
    setTasks([optimisticTask, ...tasks]);
    try {
      const response = await axios.post("/api/task", newTask, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      const savedTask = response.data;
      setTasks([savedTask, ...tasks]);
    } catch (error) {
      setTasks(tasks.filter((task) => task._id != "101"));
      console.log("Error adding task:", error);
    }
  };

  const fetchTasks = async () => {
    try {
      const response = await axios.get(
        "/api/task?userId=67ae21f887d160200ffb14c8",
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const fetchedTasks = response.data;
      setTasks(fetchedTasks); // Update tasks with fetched data
    } catch (error) {
      console.log("Error fetching tasks:", error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <TaskContext.Provider value={{ tasks, addTask }}>
      {children}
    </TaskContext.Provider>
  );
}

export const useTasks = () => useContext(TaskContext);
