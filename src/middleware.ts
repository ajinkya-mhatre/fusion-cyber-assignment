import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  if (!token) {
    return NextResponse.redirect(
      `${process.env.NEXT_PUBLIC_APP_HOST}/auth/login`,
    );
  }
}

export const config = {
  matcher: "/",
};
