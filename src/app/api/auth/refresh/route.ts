import { genToken } from "@/utils";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken"
import dbConnect from "@/lib/db";

export async function POST() {
  try {
    await dbConnect();
    const { get, set } = await cookies()
    const oldAccessToken = get("access_token")?.value;
    const refreshToken = get("refresh_token")?.value;

    console.log("old token", oldAccessToken);

    if (!refreshToken) {
      return Response.json({ error: "Invalid token" }, { status: 401 });
    }

    // Validate refresh token here (JWT verify or DB check)
    const isValid = jwt.verify(refreshToken!, process.env.NEXT_TOKEN_SECRET ?? "")
    if (!isValid) {
      return Response.json({ error: "Invalid refresh token" }, { status: 403 });
    }

    const userData: any = jwt.decode(oldAccessToken!)
    const userId = userData?.userId
    console.log("user data in refresh", userData);

    const newAccessToken = genToken({ userId }, "15m")

    set("access_token", newAccessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 15, // 15 min
    });

    return Response.json({ success: true });
  } catch (err) {
    console.log("Error with refresh token api");
    return NextResponse.json({ message: "Error while trying refreshing token" }, { status: 500 })
  }
}