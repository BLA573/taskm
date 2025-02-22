import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export async function POST(req) {
  await dbConnect();

  try {
    const { username, password } = await req.json();

    // Find user
    const user = await User.findOne({ username });
    if (!user) {
      return NextResponse.json(
        { message: "Username not found" },
        { status: 404 }
      );
    }

    // Verify password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return NextResponse.json(
        { message: "Incorrect Password" },
        { status: 401 }
      );
    }

    // Generate JWT Token
    const token = jwt.sign(
      { id: user._id, username: user.username },
      process.env.JWT_SECRET
    );

    return NextResponse.json(
      { token: token, name: user.name, username: user.username, id: user._id },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Error retry again or report issue to @fkrtag" },
      { status: 500 }
    );
  }
}
