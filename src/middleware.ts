import { NextResponse, NextRequest } from 'next/server'

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  const nonauthorizedAPI = ["/api/auth/login", "/api/auth/register", "/api/latest-mangas"]

  const { pathname } = request.nextUrl;
  if (nonauthorizedAPI.includes(pathname)) {
    return;
  }

  // verify JWT token
  // jwt.verify(request.headers.get("authorization")?.split(" ")[1] || "", process.env.NEXT_TOKEN_SECRET ?? "", (err) => {
  //   if (err) {
  //     console.error("JWT verification failed:", err);
  //     return NextResponse.json({
  //       message: "Unauthorized access",
  //     }, { status: 401 });
  //   }
  // })

  const header = request.headers.get("authorization");
  if (!header) {
    return NextResponse.json({ message: "Authorization header is missing" }, { status: 401 });
  }

  return;
}

export const config = {
  matcher: [
    "/api/:path*",
  ],
}