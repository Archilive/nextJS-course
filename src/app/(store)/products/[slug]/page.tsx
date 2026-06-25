import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { formatPrice } from "@/features/catalog/format";
import {
  getProductBySlug,
  getProducts,
} from "@/features/catalog/queries";
import { AddToCartButton } from "@/features/cart/add-to-cart-button";
import { ProductTabs } from "@/features/catalog/product-tabs";
import { SimilarProducts } from "@/features/catalog/similar-products";
import { SponsoredProducts } from "@/features/sponsored/sponsored-products";

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
      title: "Produit introuvable",
    };
  }

  return {
    title: `${product.name} - My Supa Store`,
    description: product.description,
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;

  return (
    <div className="page-shell">
      <Suspense fallback={<ProductDetailSkeleton />}>
        <ProductContent slug={slug} />
      </Suspense>
    </div>
  );
}

async function ProductContent({ slug }: { slug: string }) {
  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  return (
    <>
      <Link className="back-link" href="/">
        Retour aux produits
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
          <AddToCartButton product={product} />
          <p className="stock-note">{product.stock} articles en stock</p>
        </div>
      </article>

      <ProductTabs product={product} />

      <Suspense fallback={<RelatedSkeleton />}>
        <SimilarProducts slug={product.slug} />
      </Suspense>

      <Suspense fallback={<SponsoredSkeleton />}>
        <SponsoredProducts />
      </Suspense>
    </>
  );
}

function ProductDetailSkeleton() {
  return (
    <div className="product-detail skeleton-block">
      <div className="skeleton-media" />
      <div className="skeleton-content">
        <span />
        <span />
        <span />
        <span />
      </div>
    </div>
  );
}

function RelatedSkeleton() {
  return (
    <section className="related-section">
      <div className="section-heading compact">
        <div>
          <p className="eyebrow">Suggestions</p>
          <h2>Produits similaires</h2>
        </div>
      </div>
      <div className="loader-panel" role="status">
        <span className="loader" />
        <p>Chargement des produits similaires...</p>
      </div>
    </section>
  );
}

function SponsoredSkeleton() {
  return (
    <section className="sponsored-section">
      <div className="section-heading">
        <div>
          <p className="eyebrow">GraphQL</p>
          <h2>Produits sponsorisés</h2>
        </div>
      </div>
      <div className="loader-panel" role="status">
        <span className="loader" />
        <p>Chargement des produits sponsorisés...</p>
      </div>
    </section>
  );
}
