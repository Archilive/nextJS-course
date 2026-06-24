import { NextResponse } from "next/server";
import { getProducts } from "@/features/catalog/queries";

export async function GET() {
  const products = await getProducts();

  return NextResponse.json(products);
}
