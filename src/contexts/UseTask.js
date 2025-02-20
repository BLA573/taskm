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
  const deleteTask = async (taskToBeDeleted) => {
    // Optimistically remove the task from the UI
    const newTasks = tasks.filter((task) => task._id !== taskToBeDeleted._id);
    setTasks(newTasks);

    try {
      await axios.delete(`/api/task/${taskToBeDeleted._id}`);
    } catch (error) {
      console.error("Error deleting task:", error);
      // Rollback to previous state in case of error
      setTasks([taskToBeDeleted, ...newTasks]);
    }
  };
  const updateTask = async (taskId, updateData) => {
    console.log(taskId, updateData);
    // Store previous state in case of rollback
    const previousTasks = [...tasks];

    // Optimistically update the task in the UI
    const updatedTasks = tasks.map((task) =>
      task._id === taskId ? { ...task, ...updateData } : task
    );
    setTasks(updatedTasks);

    try {
      await axios.patch(`/api/task/${taskId}`, updateData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
    } catch (error) {
      console.error("Error updating task:", error);

      // Rollback to previous state if request fails
      setTasks(previousTasks);
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
    <TaskContext.Provider value={{ tasks, addTask, deleteTask, updateTask }}>
      {children}
    </TaskContext.Provider>
  );
}

export const useTasks = () => useContext(TaskContext);
