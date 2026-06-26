import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { formatPrice } from "@/features/catalog/format";
import {
  PrefetchLink,
  type PrefetchMode,
} from "@/features/navigation/prefetch-link";
import { getSponsoredProducts } from "./queries";
import { RevalidateSponsoredButton } from "./revalidate-sponsored-button";

export async function SponsoredProducts({
  prefetchMode = "auto",
}: {
  prefetchMode?: PrefetchMode;
}) {
  const products = await getSponsoredProducts(6);

  return (
    <section className="sponsored-section" aria-labelledby="sponsored-title">
      <div className="section-heading">
        <div>
          <p className="eyebrow">GraphQL</p>
          <h2 id="sponsored-title">Produits sponsorisés</h2>
        </div>
        <RevalidateSponsoredButton />
      </div>

      <div className="product-grid">
        {products.map((product) => (
          <article className="product-card sponsored-card" key={product.id}>
            <ProductLink
              href={`/sponsored/${product.handle}`}
              mode={prefetchMode}
            >
              <Image
                className="product-card-image"
                src={product.image}
                alt={product.title}
                width={620}
                height={480}
              />
              <div className="product-card-body">
                <div>
                  <p className="product-category">Sponsorisé</p>
                  <h3>{product.title}</h3>
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
