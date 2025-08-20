import { cookies } from "next/headers";
import { NextResponse } from "next/server"

export const POST = async () => {
  try {
    const { delete: deleteCookie } = await cookies()
    deleteCookie("access_token");
    deleteCookie("refresh_token");
    return NextResponse.json({
      data: {
        is_success: true,
        message: "success"
      }
    })
  } catch (e) {
    console.log("Error occured when trying to logout current user", e);
    return NextResponse.json({
      message: "Internal server error"
    }, { status: 500 })
  }
}
