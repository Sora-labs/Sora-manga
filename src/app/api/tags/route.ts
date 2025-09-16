import { NextRequest, NextResponse } from "next/server";
import TagModel from "@/lib/models/tag";
import dbConnect from "@/lib/db";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export async function GET() {
  try {
    const tags = await TagModel.find();

    return NextResponse.json({
      message: "Tags fetched successfully",
      data: {
        is_success: true,
        tags,
      },
    }, { status: 200 });
  } catch (error) {
    console.error("Error fetching tags:", error);
    return NextResponse.json({
      message: "Internal server error"
    }, { status: 500 });
  }
}

export const POST = async (request: NextRequest) => {
  try {
    const { get } = await cookies()
    await dbConnect();
    const body = await request.json();
    const { name, description } = body;

    const token = get("access_token")?.value || null;
    const user = jwt.decode(token ?? "") as any;
    const userId = user.userId

    if (!name || typeof name !== "string" || name.trim().length < 1) {
      return NextResponse.json({
        message: "Validation error",
        errors: [{ field: "name", message: "Name is required and must be at least 1 character long" }],
        data: { is_success: false }
      }, { status: 400 });
    }

    const duplicateTag = await TagModel.findOne({ name: name.trim() })
    if (duplicateTag) {
      return NextResponse.json({
        message: "Validation error",
        errors: [{ field: "name", message: "Tag name already exists" }],
        data: { is_success: false }
      }, { status: 400 });
    }

    const newTag = new TagModel({
      name: name.trim(),
      description: description ? description.trim() : "",
      creatorId: userId
    });

    await newTag.save();

    return NextResponse.json({
      message: "Tag created successfully",
      data: {
        is_success: true,
        tag: newTag,
      },
    }, { status: 201 });
  } catch (error) {
    console.error("Error creating tag:", error);
    return NextResponse.json({
      message: "Internal server error"
    }, { status: 500 });
  }
}