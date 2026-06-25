import { connection } from "next/server";
import { formatPrice } from "@/features/catalog/format";
import { prisma } from "@/lib/prisma";

export async function CartSummary() {
  await connection();

  const cartItems = await prisma.cartItem.findMany({
    include: {
      product: true,
    },
  });
  const totalQuantity = cartItems.reduce((total, item) => total + item.quantity, 0);
  const totalPrice = cartItems.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0,
  );

  return (
    <div className="cart-summary" aria-label="Résumé du panier">
      <span>Panier</span>
      <strong>{totalQuantity}</strong>
      <span>{formatPrice(totalPrice)}</span>
    </div>
  );
}
