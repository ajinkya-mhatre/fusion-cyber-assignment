import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  const path = request.nextUrl.pathname;
  const search = request.nextUrl.search;
  console.log("path", path, search);

  if (!token) {
    return NextResponse.redirect("http://localhost:3000/auth/login");
  }
}

export const config = {
  matcher: "/",
};
