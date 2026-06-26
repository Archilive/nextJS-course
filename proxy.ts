import { NextResponse } from "next/server";
import { auth } from "./auth";

export default auth((request) => {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/admin") && request.auth?.user.role !== "ADMIN") {
    return NextResponse.redirect(new URL("/", request.nextUrl));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/admin/:path*"],
};
