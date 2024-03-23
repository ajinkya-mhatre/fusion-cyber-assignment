import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  /*const currentUser = request.cookies.get("currentUser")?.value;
  console.log("currentUser", currentUser, request.nextUrl.pathname);
  if (currentUser && !request.nextUrl.pathname.startsWith("/dashboard")) {
    return Response.redirect(new URL("/dashboard", request.url));
  }

  if (!currentUser && !request.nextUrl.pathname.startsWith("/dashboard")) {
    return Response.redirect(new URL("/auth/login", request.url));
  }*/
}
