import { NextRequest, NextResponse } from "next/server";
import MangaModel from "@/lib/models/manga"

export async function GET(request: NextRequest) {
  try {
    const result = await MangaModel.find().sort({ createdAt: "descending" }).populate("tags", "name").limit(10)
    return NextResponse.json({
      message: "Get 10 latest mangas",
      data: {
        is_success: true,
        mangas: result,
        message: "Get 10 latest mangas"
      }
    })
  }
  catch (error) {
    console.error("Error getting latest manga:", error);
    return NextResponse.json({
      message: "Internal server error"
    }, { status: 500 });
  }
}