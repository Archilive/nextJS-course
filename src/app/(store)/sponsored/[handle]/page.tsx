import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { formatPrice } from "@/features/catalog/format";
import { getSponsoredProductByHandle } from "@/features/sponsored/queries";

export const revalidate = 3600;

type SponsoredProductPageProps = {
  params: Promise<{
    handle: string;
  }>;
};

export async function generateMetadata({
  params,
}: SponsoredProductPageProps): Promise<Metadata> {
  const { handle } = await params;
  const product = await getSponsoredProductByHandle(handle);

  if (!product) {
    return {
      title: "Produit sponsorisé introuvable",
    };
  }

  return {
    title: `${product.title} - Ma Supa Boutique`,
    description: product.description,
  };
}

export default async function SponsoredProductPage({
  params,
}: SponsoredProductPageProps) {
  const { handle } = await params;
  const product = await getSponsoredProductByHandle(handle);

  if (!product) {
    notFound();
  }

  return (
    <div className="page-shell">
      <Link className="back-link" href="/">
        Retour aux produits
      </Link>

      <article className="product-detail sponsored-detail">
        <div className="product-detail-media">
          <Image
            src={product.image}
            alt={product.title}
            width={760}
            height={620}
            priority
          />
        </div>

        <div className="product-detail-content">
          <p className="product-category">Produit sponsorisé</p>
          <h1>{product.title}</h1>
          <p className="product-description">{product.description}</p>
          <strong className="product-price">{formatPrice(product.price)}</strong>
          <p className="stock-note">
            Ce produit vient du catalogue GraphQL et ne peut pas être ajouté au
            panier.
          </p>
        </div>
      </article>
    </div>
  );
}
