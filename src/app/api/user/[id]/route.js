import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";

// GET a single user by ID
export async function GET(req, { params }) {
  await dbConnect();

  try {
    const { id } = await params;
    const user = await User.findById(id);

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Error fetchring user" },
      { status: 500 }
    );
  }
}

export async function DELETE(req, { params }) {
  await dbConnect();

  try {
    // Correctly accessing the id from params
    const { id } = await params;

    const user = await User.findByIdAndDelete(id);

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "User deleted successfully", user },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Error deleting user" },
      { status: 500 }
    );
  }
}
