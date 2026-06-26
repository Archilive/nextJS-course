import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import {
  PrefetchLink,
  type PrefetchMode,
} from "@/features/navigation/prefetch-link";
import { getSimilarProducts } from "./queries";
import { formatPrice } from "./format";

function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function SimilarProducts({
  prefetchMode = "auto",
  slug,
}: {
  prefetchMode?: PrefetchMode;
  slug: string;
}) {
  await wait(900);
  const products = await getSimilarProducts(slug);

  if (products.length === 0) {
    return (
      <section className="related-section">
        <div className="section-heading compact">
          <div>
            <p className="eyebrow">Suggestions</p>
            <h2>Produits similaires</h2>
          </div>
        </div>
        <p className="muted-text">Aucun produit similaire pour le moment.</p>
      </section>
    );
  }

  return (
    <section className="related-section">
      <div className="section-heading compact">
        <div>
          <p className="eyebrow">Suggestions</p>
          <h2>Produits similaires</h2>
        </div>
      </div>

      <div className="product-grid compact-grid">
        {products.map((product) => (
          <article className="product-card" key={product.id}>
            <ProductLink href={`/products/${product.slug}`} mode={prefetchMode}>
              <Image
                className="product-card-image"
                src={product.image}
                alt={product.name}
                width={420}
                height={320}
              />
              <div className="product-card-body">
                <div>
                  <p className="product-category">{product.category}</p>
                  <h3>{product.name}</h3>
                </div>
                <strong>{formatPrice(product.price)}</strong>
              </div>
            </ProductLink>
          </article>
        ))}
      </div>
    </section>
  );
}

function ProductLink({
  children,
  href,
  mode,
}: {
  children: ReactNode;
  href: string;
  mode: PrefetchMode;
}) {
  if (mode === "hover") {
    return (
      <PrefetchLink className="product-link" href={href}>
        {children}
      </PrefetchLink>
    );
  }

  return (
    <Link className="product-link" href={href}>
      {children}
    </Link>
  );
}
