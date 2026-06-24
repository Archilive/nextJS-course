import { prisma } from "@/lib/prisma";
import type { Product } from "./types";

type ProductRecord = {
  id: number;
  slug: string;
  name: string;
  category: string;
  price: number;
  image: string;
  description: string;
  stock: number;
  specifications: string;
};

function parseSpecifications(value: string) {
  try {
    const parsed = JSON.parse(value);

    if (parsed && typeof parsed === "object" && !Array.isArray(parsed)) {
      return parsed as Record<string, string>;
    }
  } catch {
    return {};
  }

  return {};
}

function mapProduct(product: ProductRecord): Product {
  return {
    id: String(product.id),
    slug: product.slug,
    name: product.name,
    category: product.category,
    price: product.price,
    image: product.image,
    description: product.description,
    stock: product.stock,
    specifications: parseSpecifications(product.specifications),
  };
}

export async function getProducts() {
  const products = await prisma.product.findMany({
    orderBy: {
      name: "asc",
    },
  });

  return products.map(mapProduct);
}

export async function getProductBySlug(slug: string) {
  const product = await prisma.product.findUnique({
    where: {
      slug,
    },
  });

  return product ? mapProduct(product) : null;
}
