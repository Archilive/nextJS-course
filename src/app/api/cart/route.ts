import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  const body = await request.json();
  const productId = Number(body.productId);

  if (!Number.isInteger(productId) || productId <= 0) {
    return NextResponse.json(
      { error: "Identifiant produit invalide." },
      { status: 400 },
    );
  }

  const product = await prisma.product.findUnique({
    where: {
      id: productId,
    },
    select: {
      id: true,
    },
  });

  if (!product) {
    return NextResponse.json(
      { error: "Produit introuvable." },
      { status: 404 },
    );
  }

  const cartItem = await prisma.cartItem.upsert({
    where: {
      productId,
    },
    update: {
      quantity: {
        increment: 1,
      },
    },
    create: {
      productId,
      quantity: 1,
    },
  });

  revalidatePath("/");

  return NextResponse.json(cartItem, { status: 201 });
}
