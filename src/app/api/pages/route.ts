import Page from "@/lib/models/page"
import mongoose from "mongoose"
import { NextRequest, NextResponse } from "next/server"

export const GET = async (request: NextRequest) => {
  try {
    const { searchParams } = new URL(request.url)

    const id = searchParams.get("mangaId");

    if (!id) {
      return NextResponse.json({ is_success: false, message: "mangaId is required" }, { status: 400 });
    }

    const result = await Page.aggregate([
      { $match: { mangaId: new mongoose.Types.ObjectId(id) } },
      { $addFields: { pageNumAsNumber: { $toInt: "$pageNum" } } },
      { $sort: { pageNumAsNumber: 1 } },
    ])

    return NextResponse.json({ data: { is_success: true, data: result }, message: "success" })

  } catch (error) {
    console.log("Error fetching pages:", error);

    return NextResponse.json({ is_success: false, message: "Internal server error" }, { status: 500 });
  }
}