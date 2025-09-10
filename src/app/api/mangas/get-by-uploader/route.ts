import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken"
import manga from "@/lib/models/manga";
import dbConnect from "@/lib/db";

export async function GET(request: NextRequest) {
  try {
    await dbConnect()
    const { searchParams } = new URL(request.url);
    const { get } = await cookies()
    const token = get("access_token")?.value!
    console.log("get-by-uploader token", get("access_token"));

    const userInfo: any = jwt.decode(token)
    const userId = userInfo.userId
    const page = searchParams.get("page") || 1
    const offset = Number(page) * 10 - 10
    console.log("offset", offset, await manga.find({ uploaderId: userId }));

    const mangas = await manga.find({ uploaderId: userId }).limit(10).skip(offset)
    const total = await manga.find({ uploaderId: userId }).countDocuments()

    return NextResponse.json({
      data: {
        is_success: true,
        data: mangas,
        total
      }
    })

  } catch (err) {
    console.log("Error when getting manga by uploader", err);
    return NextResponse.json({ message: "Failed to get mangas by uploader" }, { status: 500 })
  }
}