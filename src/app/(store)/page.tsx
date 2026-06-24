import Image from "next/image";
import Link from "next/link";
import { formatPrice } from "@/features/catalog/format";
import { getProducts } from "@/features/catalog/queries";

export default async function HomePage() {
  const products = await getProducts();

  return (
    <div className="page-shell">
      <section className="hero">
        <div>
          <p className="eyebrow">Simple ecommerce workshop</p>
          <h1>Useful products for focused days.</h1>
          <p>
            A small product catalog rendered with Server Components and local
            mock data.
          </p>
        </div>
      </section>

      <section className="section-heading" aria-labelledby="products-title">
        <div>
          <p className="eyebrow">Catalog</p>
          <h2 id="products-title">Products</h2>
        </div>
        <span>{products.length} products</span>
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
    </div>
  );
}
