import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Board from "@/models/Board";
import mongoose from "mongoose";

// POST request to create a new board
export async function POST(req) {
  await dbConnect(); // Connect to the database

  try {
    // Parse the request body
    const { name, emoji, user_id } = await req.json();

    if (!name) {
      return NextResponse.json(
        { message: "name is required", error: error.message },
        { status: 500 }
      );
    }

    // Create a new board instance
    const newBoard = new Board({
      name,
      emoji,
      user_id,
    });

    // Save the new board to the database
    await newBoard.save();

    return NextResponse.json(newBoard, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "Error creating board", error: error.message },
      { status: 500 }
    );
  }
}

// GET request to fetch all boards by user ID
export async function GET(req) {
  try {
    await dbConnect();

    // Get userId from URL query parameters
    const userId = req.nextUrl.searchParams.get("userId");

    // Validate userId exists
    if (!userId) {
      return NextResponse.json(
        { message: "userId parameter is required" },
        { status: 400 }
      );
    }

    // Validate MongoDB ObjectId format (if needed)
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return NextResponse.json(
        { message: "Invalid userId format" },
        { status: 400 }
      );
    }

    // Query database
    const boards = await Board.find({ user_id: userId });

    if (boards.length === 0) {
      return NextResponse.json({ message: "No boards found" }, { status: 404 });
    }

    return NextResponse.json(boards, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Server error", error: error.message },
      { status: 500 }
    );
  }
}

export async function DELETE() {
  dbConnect();
  try {
    const deleteTask = await Board.deleteMany();
    return NextResponse.json(deleteTask, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Error fetching tasks", error: error.message },
      { status: 500 }
    );
  }
}
