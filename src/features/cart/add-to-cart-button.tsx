"use client";

import { useCart, type CartProduct } from "./cart-context";

export function AddToCartButton({ product }: { product: CartProduct }) {
  const { addProduct } = useCart();

  return (
    <button
      className="primary-button"
      type="button"
      onClick={() => addProduct(product)}
    >
      Add to cart
    </button>
  );
}
