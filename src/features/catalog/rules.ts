import type { Product } from "./types";

export function isInStock(product: Pick<Product, "stock">) {
  return product.stock > 0;
}
