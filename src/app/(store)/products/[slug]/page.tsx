import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  formatPrice,
  getProductBySlug,
  getProducts,
} from "@/features/catalog/queries";

type ProductPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateStaticParams() {
  const products = await getProducts();

  return products.map((product) => ({
    slug: product.slug,
  }));
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    return {
      title: "Product not found",
    };
  }

  return {
    title: `${product.name} - My Supa Store`,
    description: product.description,
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  return (
    <div className="page-shell">
      <Link className="back-link" href="/">
        Back to products
      </Link>

      <article className="product-detail">
        <div className="product-detail-media">
          <Image
            src={product.image}
            alt={product.name}
            width={760}
            height={620}
            priority
          />
        </div>

        <div className="product-detail-content">
          <p className="product-category">{product.category}</p>
          <h1>{product.name}</h1>
          <p className="product-description">{product.description}</p>
          <strong className="product-price">{formatPrice(product.price)}</strong>
          <button className="primary-button" type="button">
            Add to cart
          </button>
          <p className="stock-note">{product.stock} items in stock</p>
        </div>
      </article>
    </div>
  );
}
