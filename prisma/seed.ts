import { readFile } from "node:fs/promises";
import "dotenv/config";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import { PrismaClient } from "../src/generated/prisma/client";

const adapter = new PrismaBetterSqlite3({
  url: process.env.DATABASE_URL ?? "file:./prisma/dev.db",
});
const prisma = new PrismaClient({ adapter });

async function main() {
  const productsUrl = new URL(
    "../src/features/catalog/products.json",
    import.meta.url,
  );
  const products = JSON.parse(await readFile(productsUrl, "utf8"));

  for (const product of products) {
    const data = {
      name: product.name,
      category: product.category,
      price: product.price,
      image: product.image,
      description: product.description,
      stock: product.stock,
      specifications: JSON.stringify(product.specifications),
    };

    await prisma.product.upsert({
      where: {
        slug: product.slug,
      },
      update: data,
      create: {
        slug: product.slug,
        ...data,
      },
    });
  }

  console.log(`Seeded ${products.length} products.`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
