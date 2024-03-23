import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const currentUser = request.cookies.get("token");
  console.log("currentUser", currentUser);

  const url = request.nextUrl.clone();
  if (url.pathname === "/") {
    url.pathname = "/home";
    return NextResponse.redirect(url);
  }
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
