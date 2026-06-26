import { NextResponse } from "next/server";
import { auth } from "./auth";

const AB_COOKIE = "ab_prefetch";
const COOKIE_MAX_AGE = 60 * 60 * 24 * 30;

function readVariant(value: string | undefined | null) {
  return value === "A" || value === "B" ? value : null;
}

function setVariantCookie(response: NextResponse, variant: "A" | "B") {
  response.cookies.set(AB_COOKIE, variant, {
    maxAge: COOKIE_MAX_AGE,
    path: "/",
    sameSite: "lax",
  });
}

export default auth((request) => {
  const { pathname } = request.nextUrl;
  const forcedVariant = readVariant(request.nextUrl.searchParams.get(AB_COOKIE));
  const currentVariant = readVariant(request.cookies.get(AB_COOKIE)?.value);
  const selectedVariant =
    forcedVariant ?? currentVariant ?? (Math.random() < 0.5 ? "A" : "B");

  if (pathname.startsWith("/admin") && request.auth?.user.role !== "ADMIN") {
    const response = NextResponse.redirect(new URL("/", request.nextUrl));
    setVariantCookie(response, selectedVariant);
    return response;
  }

  const response = NextResponse.next();

  if (forcedVariant || !currentVariant) {
    setVariantCookie(response, selectedVariant);
  }

  return response;
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
