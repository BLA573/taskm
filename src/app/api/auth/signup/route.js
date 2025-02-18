import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";
import bcrypt from "bcrypt";

export async function POST(req) {
  await dbConnect();

  try {
    const { name, username, password } = await req.json();

    // Check if user already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return NextResponse.json(
        { message: "Username already taken" },
        { status: 400 }
      );
    }

    // Hash the password before saving
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const newUser = new User({ name, username, password: hashedPassword });
    await newUser.save();

    return NextResponse.json(
      { message: "User registered successfully" },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Error registering user" },
      { status: 500 }
    );
  }
}
