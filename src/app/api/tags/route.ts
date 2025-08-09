import { NextResponse } from "next/server";
import TagModel from "@/lib/models/tag";
import dbConnect from "@/lib/db";

export async function GET() {
  try {
    await dbConnect();
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