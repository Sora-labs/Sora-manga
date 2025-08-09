import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import User from "@/lib/models/user";
import { compareHash, genToken } from "@/utils";
import dbConnect from "@/lib/db";

const RegisterSchema = z.object({
  username: z.string().min(1, "Username is required").min(6, "Username must have at least 6 characters"),
  password: z.string().min(1, "Password is required").min(6, "Password must have at least 6 characters"),
})

export async function POST(request: NextRequest) {
  try {
    await dbConnect();
    const body = await request.json()
    console.log(body);

    const parsedBody = RegisterSchema.safeParse(body);

    // validation logic
    if (!parsedBody.success) {
      const errors = parsedBody.error.issues;
      console.log("errors", parsedBody.error);

      return NextResponse.json({
        message: "Validation failed",
        errors: errors.map(error => ({ field: error.path, message: error.message })),
      }, { status: 400 });
    }

    // unique validate
    const existingUser = await User.findOne({ username: parsedBody.data.username });
    if (!existingUser) {
      return NextResponse.json({
        errors: [{ field: "username", message: "Invalid username or password" }],
        message: "Login failed",
      }, { status: 400 });
    }

    // verify password
    const isPasswordValid = await compareHash(parsedBody.data.password, existingUser.password);
    if (!isPasswordValid) {
      return NextResponse.json({
        errors: [{ field: "password", message: "Invalid username or password" }],
        message: "Login failed",
      }, { status: 400 });
    }

    return NextResponse.json({
      message: "Login successful",
      data: {
        is_success: true,
        access_token: genToken({ userId: existingUser._id }, "5m"),
        refresh_token: genToken({ userId: existingUser._id }, "7d"),
      }
    });
  }
  catch (error) {
    console.error("Login failed:", error);
    return NextResponse.json({ errors: [{ field: null, message: "Internal server error" }], messgage: "Internal server error" }, { status: 500 });
  }
}