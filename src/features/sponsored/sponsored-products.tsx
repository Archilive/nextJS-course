import Image from "next/image";
import Link from "next/link";
import { formatPrice } from "@/features/catalog/format";
import { getSponsoredProducts } from "./queries";
import { RevalidateSponsoredButton } from "./revalidate-sponsored-button";

export async function SponsoredProducts() {
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
            <Link href={`/sponsored/${product.handle}`} className="product-link">
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
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}
