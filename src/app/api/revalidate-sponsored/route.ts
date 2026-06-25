import { revalidatePath, revalidateTag } from "next/cache";
import { NextResponse } from "next/server";
import { SPONSORED_PRODUCTS_TAG } from "@/features/sponsored/queries";

export async function POST() {
  revalidateTag(SPONSORED_PRODUCTS_TAG, "max");
  revalidatePath("/");

  return NextResponse.json({
    revalidated: true,
  });
}
