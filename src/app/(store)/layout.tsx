import Link from "next/link";
import { CartSummary } from "@/features/cart/cart-summary";

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
        <nav className="main-nav" aria-label="Navigation principale">
          <Link href="/">Produits</Link>
          <Link href="/admin/products">Admin</Link>
        </nav>
        <CartSummary />
      </header>
      <main className="site-main">{children}</main>
      <footer className="site-footer">
        <span>Atelier Next.js - App Router, RSC et groupes de routes.</span>
      </footer>
    </>
  );
}
