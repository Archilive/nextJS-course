import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import { formatPrice } from "@/features/catalog/format";
import { getProducts } from "@/features/catalog/queries";
import { getDictionary, getRequestLocale } from "@/features/i18n/server";
import { SponsoredProducts } from "@/features/sponsored/sponsored-products";

export default async function HomePage() {
  const products = await getProducts();
  const locale = await getRequestLocale();
  const dictionary = getDictionary(locale);

  return (
    <div className="page-shell">
      <section className="hero">
        <div>
          <p className="eyebrow">{dictionary.home.eyebrow}</p>
          <h1>{dictionary.home.title}</h1>
          <p>{dictionary.home.description}</p>
        </div>
      </section>

      <section className="section-heading" aria-labelledby="products-title">
        <div>
          <p className="eyebrow">{dictionary.home.catalog}</p>
          <h2 id="products-title">{dictionary.home.products}</h2>
        </div>
        <span>
          {products.length} {dictionary.home.productsCount}
        </span>
      </section>

      <section className="product-grid">
        {products.map((product) => (
          <article className="product-card" key={product.id}>
            <Link href={`/products/${product.slug}`} className="product-link">
              <Image
                className="product-card-image"
                src={product.image}
                alt={product.name}
                width={620}
                height={480}
                priority
              />
              <div className="product-card-body">
                <div>
                  <p className="product-category">{product.category}</p>
                  <h3>{product.name}</h3>
                </div>
                <strong>{formatPrice(product.price)}</strong>
              </div>
            </Link>
          </article>
        ))}
      </section>

      <Suspense fallback={<SponsoredProductsSkeleton />}>
        <SponsoredProducts />
      </Suspense>
    </div>
  );
}

function SponsoredProductsSkeleton() {
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
