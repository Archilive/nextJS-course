"use client";

import {
  createContext,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { Product } from "@/features/catalog/types";

export type CartProduct = Pick<
  Product,
  "id" | "slug" | "name" | "price" | "image"
>;

type CartItem = CartProduct & {
  quantity: number;
};

type CartContextValue = {
  items: CartItem[];
  totalPrice: number;
  totalQuantity: number;
  addProduct: (product: CartProduct) => void;
};

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  const value = useMemo<CartContextValue>(() => {
    const totalQuantity = items.reduce((total, item) => total + item.quantity, 0);
    const totalPrice = items.reduce(
      (total, item) => total + item.price * item.quantity,
      0,
    );

    return {
      items,
      totalPrice,
      totalQuantity,
      addProduct(product) {
        setItems((currentItems) => {
          const existingItem = currentItems.find((item) => item.id === product.id);

          if (!existingItem) {
            return [...currentItems, { ...product, quantity: 1 }];
          }

          return currentItems.map((item) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item,
          );
        });
      },
    };
  }, [items]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used inside CartProvider");
  }

  return context;
}
