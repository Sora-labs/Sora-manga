import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import User from "@/lib/models/user";
import { genHash } from "@/utils";
import dbConnect from "@/lib/db";

const RegisterSchema = z.object({
  username: z.string().min(1, "Username is required").min(6, "Username must have at least 6 characters"),
  password: z.string().min(1, "Password is required").min(6, "Password must have at least 6 characters"),
})

export async function POST(request: NextRequest) {
  try {
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
    if (existingUser) {
      return NextResponse.json({
        errors: [{ field: "username", message: "Username already exists" }],
        message: "Validation failed",
      }, { status: 400 });
    }

    // insert query logic
    const createData = {
      username: parsedBody.data.username,
      password: await genHash(parsedBody.data.password),
    }

    const newUser = new User(createData)
    await newUser.save();

    return NextResponse.json({
      data: { is_success: true },
      message: "Registration successful",
    });
  }
  catch (error) {
    console.error("Registration failed:", error);
    throw new NextResponse("Registration failed");
  }
}