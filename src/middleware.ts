import { cookies } from 'next/headers';
import { NextResponse, NextRequest } from 'next/server'

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  const response = NextResponse.next()
  const nonauthorizedAPI = [/^\/api\/auth\/login$/,
    /^\/api\/auth\/register$/,
    /^\/api\/latest-mangas$/,
    /^\/api\/tags$/,
    /^\/api\/mangas(\/.*)?$/,
    /^\/api\/pages(\/.*)?$/
  ]

  const { pathname } = request.nextUrl;
  console.log(pathname, request.nextUrl);

  if (nonauthorizedAPI.some(api => api.test(pathname))) {
    return;
  }

  const { get } = await cookies()
  const token = get("access_token")
  console.log("access_token", get("access_token"));

  if (!token) {
    return NextResponse.json({ message: "Authorization cookie is missing" }, { status: 401 });
  }
  response.headers.set("Access-Control-Allow-Credentials", "true")
  response.headers.set("Access-Control-Allow-Origin", request.headers.get("origin") || "*")
  return response;
}

export const config = {
  matcher: [
    "/api/:path*",
  ],
}