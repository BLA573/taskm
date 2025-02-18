// app/api/tasks/route.js
import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Task from "@/models/Task";
import Board from "@/models/Board";
import User from "@/models/User";
import mongoose from "mongoose";

export async function POST(req) {
  await dbConnect();

  try {
    const body = await req.json();
    const { detail, tags, status, board_Id, user_id } = body;

    if (
      status &&
      !["in progress", "backlog", "review", "completed"].includes(status)
    ) {
      return NextResponse.json(
        { message: "Invalid status value" },
        { status: 400 }
      );
    }

    // Validate required fields
    if (!detail || !board_Id || !user_id) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    // Validate ObjectID formats
    if (
      !mongoose.Types.ObjectId.isValid(board_Id) ||
      !mongoose.Types.ObjectId.isValid(user_id)
    ) {
      return NextResponse.json(
        { message: "Invalid ID format" },
        { status: 400 }
      );
    }

    // Check if board and user exist
    const [board, user] = await Promise.all([
      Board.findById(board_Id),
      User.findById(user_id),
    ]);

    if (!board || !user) {
      return NextResponse.json(
        { message: "Board or User not found" },
        { status: 404 }
      );
    }

    // Create new task
    const newTask = await Task.create({
      detail,
      tags: tags || [],
      status: status || "in progress",
      board_Id,
      user_id,
    });

    return NextResponse.json(newTask, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "Error creating task", error: error.message },
      { status: 500 }
    );
  }
}
export async function GET(req) {
  await dbConnect();

  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");

    // Query validation
    if (!userId) {
      return NextResponse.json(
        { message: "Provide boardId or userId" },
        { status: 400 }
      );
    }

    const tasks = await Task.find({ user_id: userId }).sort({ createdAt: -1 });

    return NextResponse.json(tasks, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Error fetching tasks", error: error.message },
      { status: 500 }
    );
  }
}

export async function DELETE() {
  dbConnect();
  try {
    const deleteTask = await Task.deleteMany({ board_Id: null });
    return NextResponse.json(deleteTask, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Error fetching tasks", error: error.message },
      { status: 500 }
    );
  }
}
