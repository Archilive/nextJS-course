"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";
import type { Product } from "@/features/catalog/types";

export type CartProduct = Pick<Product, "id" | "name">;

export function AddToCartButton({ product }: { product: CartProduct }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  function addToCart() {
    startTransition(async () => {
      await fetch("/api/cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          productId: Number(product.id),
        }),
      });

      router.refresh();
    });
  }

  return (
    <button
      className="primary-button"
      type="button"
      onClick={addToCart}
      disabled={isPending}
    >
      {isPending ? "Ajout..." : "Ajouter au panier"}
    </button>
  );
}
