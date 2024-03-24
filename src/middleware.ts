import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  const url = request.nextUrl.clone();
  if (!token) {
    url.pathname = "/auth/login";
    return NextResponse.redirect(url);
  }
}

export const config = {
  matcher: "/",
};
