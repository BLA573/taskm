import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect"; // Ensure correct path
import User from "@/models/User";

// Handle GET request
export async function GET() {
  await dbConnect();
  try {
    const users = await User.find();
    return NextResponse.json(users, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Error fetching users" },
      { status: 500 }
    );
  }
}
