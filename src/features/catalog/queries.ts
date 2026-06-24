import products from "./products.json";
import type { Product } from "./types";

const productList = products as Product[];

export async function getProducts() {
  return productList;
}

export async function getProductBySlug(slug: string) {
  return productList.find((product) => product.slug === slug) ?? null;
}

export function formatPrice(price: number) {
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
  }).format(price);
}
