import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Board from "@/models/Board";
import mongoose from "mongoose";

export async function DELETE(req, { params }) {
  await dbConnect();

  try {
    const { boardId } = await params;

    // Validate boardId exists in params
    if (!boardId) {
      return NextResponse.json(
        { message: "Board ID is required" },
        { status: 400 }
      );
    }

    // Validate MongoDB ObjectId format
    if (!mongoose.Types.ObjectId.isValid(boardId)) {
      return NextResponse.json(
        { message: "Invalid Board ID format" },
        { status: 400 }
      );
    }

    const deletedBoard = await Board.findByIdAndDelete(boardId);

    if (!deletedBoard) {
      return NextResponse.json({ message: "Board not found" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "Board deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Delete Error:", error);

    // Handle specific MongoDB errors
    if (error.name === "CastError") {
      return NextResponse.json(
        { message: "Invalid Board ID format" },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
