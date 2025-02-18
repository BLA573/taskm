"use client";
import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const BoardContext = createContext();

export function BoardProvider({ children }) {
  const [boards, setBoards] = useState([]);
  const [selectedBoard, setSelectedBoard] = useState(boards[0] || "");

  const addBoard = async (newBoard) => {
    const optimisticBoard = { ...newBoard, _id: "101" };
    setBoards([optimisticBoard, ...boards]);
    try {
      const response = await axios.post("/api/board", newBoard, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      const savedBoard = response.data;
      setBoards([savedBoard, ...boards]);
      setSelectedBoard(savedBoard._id);
    } catch (error) {
      setBoards(boards.filter((board) => board._id != "101"));
      console.log("Error adding board:", error);
    }
  };

  const fetchBoards = async () => {
    try {
      const response = await axios.get(
        "/api/board?userId=67ae21f887d160200ffb14c8",
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const fetchedBoards = response.data;
      setBoards(fetchedBoards);
      setSelectedBoard(fetchedBoards[0]._id);
    } catch (error) {
      console.log("Error fetching boards:", error);
    }
  };

  useEffect(() => {
    fetchBoards();
  }, []);

  useEffect(() => {
    console.log("selected boards", selectedBoard);
    console.log("boards: ", boards);
  }, [selectedBoard, boards]);

  return (
    <BoardContext.Provider
      value={{ boards, addBoard, selectedBoard, setSelectedBoard }}
    >
      {children}
    </BoardContext.Provider>
  );
}

export const useBoards = () => useContext(BoardContext);
