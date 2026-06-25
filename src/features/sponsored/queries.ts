import type { SponsoredProduct } from "./types";

export const SPONSORED_PRODUCTS_TAG = "sponsored-products";

const GRAPHQL_ENDPOINT =
  "http://graphqlstore.julienfroidefond.com/api/2024-01/graphql.json";

const fallbackProducts: SponsoredProduct[] = [
  {
    id: "fallback-ps5",
    title: "Console sponsorisée",
    handle: "console-sponsorisee",
    description:
      "Produit sponsorisé de secours affiché si le service GraphQL est indisponible.",
    image: "/products/minimal-desk-lamp.svg",
    price: 299.99,
    currencyCode: "EUR",
  },
];

type GraphQlProduct = {
  id: string;
  title: string;
  handle: string;
  description: string;
  featuredImage: {
    url: string;
  } | null;
  priceRange: {
    minVariantPrice: {
      amount: string;
      currencyCode: string;
    };
  };
};

function mapSponsoredProduct(product: GraphQlProduct): SponsoredProduct {
  return {
    id: product.id,
    title: product.title,
    handle: product.handle,
    description: product.description,
    image: product.featuredImage?.url ?? "/products/minimal-desk-lamp.svg",
    price: Number(product.priceRange.minVariantPrice.amount),
    currencyCode: product.priceRange.minVariantPrice.currencyCode,
  };
}

function logSponsoredError(error: unknown) {
  const message = error instanceof Error ? error.message : String(error);
  console.error(`[mockShop] produits sponsorisés indisponibles: ${message}`);
}

async function fetchGraphQl<TData>(
  query: string,
  variables?: Record<string, unknown>,
) {
  const start = performance.now();
  const response = await fetch(GRAPHQL_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query, variables }),
    next: {
      revalidate: 3600,
      tags: [SPONSORED_PRODUCTS_TAG],
    },
  });

  console.log(
    `[mockShop] fetch products ${(performance.now() - start).toFixed(0)}ms`,
  );

  if (!response.ok) {
    throw new Error("Impossible de charger les produits sponsorisés.");
  }

  const payload = (await response.json()) as {
    data?: TData;
    errors?: Array<{ message: string }>;
  };

  if (payload.errors?.length) {
    throw new Error(payload.errors[0].message);
  }

  if (!payload.data) {
    throw new Error("Réponse GraphQL vide.");
  }

  return payload.data;
}

export async function getSponsoredProducts(limit = 6) {
  try {
    const data = await fetchGraphQl<{
      products: {
        nodes: GraphQlProduct[];
      };
    }>(
      `query GetProducts($first: Int!) {
        products(first: $first) {
          nodes {
            id
            title
            handle
            description
            featuredImage { url }
            priceRange {
              minVariantPrice { amount currencyCode }
            }
          }
        }
      }`,
      { first: limit },
    );

    return data.products.nodes.map(mapSponsoredProduct);
  } catch (error) {
    logSponsoredError(error);
    return fallbackProducts;
  }
}

export async function getSponsoredProductByHandle(handle: string) {
  try {
    const data = await fetchGraphQl<{
      productByHandle: GraphQlProduct | null;
    }>(
      `query GetProductByHandle($handle: String!) {
        productByHandle(handle: $handle) {
          id
          title
          handle
          description
          featuredImage { url }
          priceRange {
            minVariantPrice { amount currencyCode }
          }
        }
      }`,
      { handle },
    );

    return data.productByHandle
      ? mapSponsoredProduct(data.productByHandle)
      : null;
  } catch (error) {
    logSponsoredError(error);
    return fallbackProducts.find((product) => product.handle === handle) ?? null;
  }
}
