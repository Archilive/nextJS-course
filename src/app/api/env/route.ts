import { NextResponse } from "next/server";

export function GET() {
  return NextResponse.json({
    publicSiteName: process.env.NEXT_PUBLIC_SITE_NAME ?? "Ma Supa Boutique",
    serverOnly: {
      databaseConfigured: Boolean(process.env.DATABASE_URL),
      authSecretConfigured: Boolean(process.env.AUTH_SECRET),
    },
  });
}
