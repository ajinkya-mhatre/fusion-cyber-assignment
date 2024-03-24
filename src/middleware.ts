import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  if (!token) {
    return NextResponse.redirect("http://localhost:3000/auth/login");
  }
}

export const config = {
  matcher: "/",
};
