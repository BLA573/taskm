import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Task from "@/models/Task";
import mongoose from "mongoose";

export async function PATCH(req, { params }) {
  await dbConnect();

  try {
    const { taskId } = await params;
    const updateData = await req.json();

    // Validate task ID
    if (!mongoose.Types.ObjectId.isValid(taskId)) {
      return NextResponse.json({ message: "Invalid Task ID" }, { status: 400 });
    }

    // Validate status updates
    if (
      updateData.status &&
      !["in progress", "backlog", "review", "completed"].includes(
        updateData.status
      )
    ) {
      return NextResponse.json(
        { message: "Invalid status value" },
        { status: 400 }
      );
    }

    const updatedTask = await Task.findByIdAndUpdate(
      taskId,
      { $set: updateData },
      { new: true, runValidators: true }
    );

    if (!updatedTask) {
      return NextResponse.json({ message: "Task not found" }, { status: 404 });
    }

    return NextResponse.json(updatedTask, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Error updating task", error: error.message },
      { status: 500 }
    );
  }
}
export async function DELETE(req, { params }) {
  await dbConnect();

  try {
    const { taskId } = await params;

    if (!mongoose.Types.ObjectId.isValid(taskId)) {
      return NextResponse.json({ message: "Invalid Task ID" }, { status: 400 });
    }

    const deletedTask = await Task.findByIdAndDelete(taskId);

    if (!deletedTask) {
      return NextResponse.json({ message: "Task not found" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "Task deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Error deleting task", error: error.message },
      { status: 500 }
    );
  }
}
