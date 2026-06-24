"use client";

import { formatPrice } from "@/features/catalog/format";
import { useCart } from "./cart-context";

export function CartSummary() {
  const { totalPrice, totalQuantity } = useCart();

  return (
    <div className="cart-summary" aria-label="Cart summary">
      <span>Cart</span>
      <strong>{totalQuantity}</strong>
      <span>{formatPrice(totalPrice)}</span>
    </div>
  );
}
