import Image from "next/image";
import Link from "next/link";
import { getSimilarProducts } from "./queries";
import { formatPrice } from "./format";

function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function SimilarProducts({ slug }: { slug: string }) {
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
            <Link href={`/products/${product.slug}`} className="product-link">
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
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}
