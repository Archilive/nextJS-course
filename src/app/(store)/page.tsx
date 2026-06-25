import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import { formatPrice } from "@/features/catalog/format";
import { getProducts } from "@/features/catalog/queries";
import { SponsoredProducts } from "@/features/sponsored/sponsored-products";

export default async function HomePage() {
  const products = await getProducts();

  return (
    <div className="page-shell">
      <section className="hero">
        <div>
          <p className="eyebrow">Atelier e-commerce simple</p>
          <h1>Des produits utiles pour des journées efficaces.</h1>
          <p>
            Un petit catalogue rendu avec des Server Components et des données
            locales de test.
          </p>
        </div>
      </section>

      <section className="section-heading" aria-labelledby="products-title">
        <div>
          <p className="eyebrow">Catalogue</p>
          <h2 id="products-title">Produits</h2>
        </div>
        <span>{products.length} produits</span>
      </section>

      <section className="product-grid">
        {products.map((product, index) => (
          <article className="product-card" key={product.id}>
            <Link href={`/products/${product.slug}`} className="product-link">
              <Image
                className="product-card-image"
                src={product.image}
                alt={product.name}
                width={620}
                height={480}
                priority={index === 0}
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
