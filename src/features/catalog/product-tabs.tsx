"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import type { Product } from "./types";

export function ProductTabs({ product }: { product: Product }) {
  const searchParams = useSearchParams();
  const activeTab =
    searchParams.get("tab") === "specifications"
      ? "specifications"
      : "description";

  return (
    <section className="product-tabs" aria-label="Détails du produit">
      <div className="tab-list">
        <Link
          className={activeTab === "description" ? "tab active" : "tab"}
          href={`/products/${product.slug}?tab=description`}
          scroll={false}
        >
          Description
        </Link>
        <Link
          className={activeTab === "specifications" ? "tab active" : "tab"}
          href={`/products/${product.slug}?tab=specifications`}
          scroll={false}
        >
          Spécifications
        </Link>
      </div>

      <div className="tab-panel">
        {activeTab === "description" ? (
          <p>{product.description}</p>
        ) : (
          <dl className="spec-list">
            {Object.entries(product.specifications).map(([label, value]) => (
              <div key={label}>
                <dt>{label}</dt>
                <dd>{value}</dd>
              </div>
            ))}
          </dl>
        )}
      </div>
    </section>
  );
}
