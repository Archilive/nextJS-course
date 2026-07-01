import { NextResponse } from "next/server";
import { auth } from "../auth";

const AB_COOKIE = "ab_prefetch";
const LOCALE_COOKIE = "NEXT_LOCALE";
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

function readLocale(value: string | undefined | null) {
  return value === "fr" || value === "en" ? value : null;
}

function detectLocale(acceptLanguage: string | null) {
  if (!acceptLanguage) {
    return "fr";
  }

  return acceptLanguage.toLowerCase().startsWith("en") ? "en" : "fr";
}

function setLocaleCookie(response: NextResponse, locale: "fr" | "en") {
  response.cookies.set(LOCALE_COOKIE, locale, {
    maxAge: 60 * 60 * 24 * 365,
    path: "/",
    sameSite: "lax",
  });
}

const handler = auth((request) => {
  const { pathname } = request.nextUrl;
  const forcedVariant = readVariant(request.nextUrl.searchParams.get(AB_COOKIE));
  const currentVariant = readVariant(request.cookies.get(AB_COOKIE)?.value);
  const selectedVariant =
    forcedVariant ?? currentVariant ?? (Math.random() < 0.5 ? "A" : "B");
  const currentLocale = readLocale(request.cookies.get(LOCALE_COOKIE)?.value);
  const selectedLocale =
    currentLocale ?? detectLocale(request.headers.get("accept-language"));

  if (pathname.startsWith("/admin") && request.auth?.user.role !== "ADMIN") {
    const response = NextResponse.redirect(new URL("/", request.nextUrl));
    setVariantCookie(response, selectedVariant);
    if (!currentLocale) {
      setLocaleCookie(response, selectedLocale);
    }
    return response;
  }

  const response = NextResponse.next();

  if (forcedVariant || !currentVariant) {
    setVariantCookie(response, selectedVariant);
  }

  if (!currentLocale) {
    setLocaleCookie(response, selectedLocale);
  }

  return response;
});

export { handler as proxy };
export default handler;

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
