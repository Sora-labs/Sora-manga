import { NextRequest, NextResponse } from "next/server";
import TagModel from "@/lib/models/tag";
import dbConnect from "@/lib/db";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export async function GET(request: NextRequest) {
  try {
    await dbConnect()
    const { searchParams } = new URL(request.url)
    const page = searchParams.get("page");
    const pageSize = searchParams.get("pageSize");

    if (!page && !pageSize) {
      return NextResponse.json({ error: "Missing page or page size" }, { status: 400 })
    }
    const totalData = await TagModel.aggregate([{ $count: "name" }])
    const tags = await TagModel.aggregate([
      { $sort: { createdAt: -1 } },
      { $skip: Number(page) * Number(pageSize) - Number(pageSize) },
      { $limit: Number(pageSize) },
    ]);

    return NextResponse.json({
      message: "Tags fetched successfully",
      data: {
        is_success: true,
        data: tags,
        total_data: totalData[0].name,
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