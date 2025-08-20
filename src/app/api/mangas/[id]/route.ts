import MangaModel from "@/lib/models/manga"
import { NextRequest, NextResponse } from "next/server"
import "@/lib/models/user"
import "@/lib/models/tag"
import dbConnect from "@/lib/db"

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await dbConnect()
    const { id } = await params
    const result = await MangaModel.findOne({ _id: id }).populate("tags").populate("uploaderId", "username")
    console.log(id);

    if (!result) {
      return NextResponse.json({ message: "Failed to get manga" })
    }
    return NextResponse.json({
      message: "success",
      data: {
        is_success: true,
        message: "success",
        data: result
      }
    })
  } catch (error) {
    console.error("Error getting manga:", error);
    return NextResponse.json({
      message: "Internal server error"
    }, { status: 500 });
  }
}