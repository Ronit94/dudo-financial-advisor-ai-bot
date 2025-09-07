import { connectDB } from "@/lib/mongoose";
import User from "@/models/User";
import { NextResponse } from "next/server";

export async function GET() {
  await connectDB();
  const users = await User.find({});
  return NextResponse.json(users);
}

export async function POST(req: Request) {
  await connectDB();
  const body = await req.json();
  if (!body.email || !body.name) {
    return NextResponse.json(
      { error: "Missing required fields" },
      { status: 400 }
    );
  }
  const existingUser = await User.find({ email: body.email });
  if (existingUser.length > 0) {
    return NextResponse.json(
      { message: "User already exists", user: existingUser[0] },
      { status: 200 }
    );
  }
  const newUser = await User.create(body);
  return NextResponse.json(newUser);
}
