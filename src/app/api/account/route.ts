import user from "@/lib/models/user";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken"
import { cookies } from "next/headers";
import dbConnect from "@/lib/db";

export async function GET(request: NextRequest) {
  try {

    const { get } = await cookies()
    const accessToken = get("access_token")!
    console.log("access token", accessToken);

    const decodeToken: any = jwt.decode(accessToken.value)!
    const _id = decodeToken?.userId
    const result = await user.findById(_id)
    if (!result) {
      return NextResponse.json({
        message: "error",
      })
    }
    const returnData = {
      id: result._id,
      username: result.username,
      createdAt: result.createdAt,
      name: result.name ?? null,
    }
    return NextResponse.json({
      message: "success",
      data: {
        data: returnData,
        is_success: true,
        message: "success"
      }
    })
  }
  catch (error) {
    console.log("Failed to get account info", error);
    return NextResponse.json({ message: "Failed to get account info" }, { status: 500 })
  }
}