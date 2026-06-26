import Link from "next/link";
import { cacheLife } from "next/cache";
import { Suspense } from "react";
import { CartSummary } from "@/features/cart/cart-summary";
import { HeaderAuth } from "@/features/auth/header-auth";

export default function StoreLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <header className="site-header">
        <Link className="brand" href="/">
          Ma Supa Boutique
        </Link>
        <Suspense fallback={<HeaderAuthFallback />}>
          <HeaderAuth />
        </Suspense>
        <Suspense fallback={<CartSummaryFallback />}>
          <CartSummary />
        </Suspense>
      </header>
      <main className="site-main">{children}</main>
      <StoreFooter />
    </>
  );
}

function HeaderAuthFallback() {
  return (
    <>
      <nav className="main-nav" aria-label="Navigation principale">
        <Link href="/">Produits</Link>
        <Link href="/performance">Performance</Link>
        <Link href="/compte">Compte</Link>
      </nav>
      <div className="auth-controls">
        <Link className="secondary-link" href="/login">
          Connexion
        </Link>
      </div>
    </>
  );
}

function CartSummaryFallback() {
  return (
    <div className="cart-summary" aria-label="Résumé du panier">
      <span>Panier</span>
      <strong>0</strong>
      <span>0,00 €</span>
    </div>
  );
}

async function StoreFooter() {
  "use cache";
  cacheLife("max");

  return (
    <footer className="site-footer">
      <span>Atelier Next.js - App Router, RSC et groupes de routes.</span>
    </footer>
  );
}
