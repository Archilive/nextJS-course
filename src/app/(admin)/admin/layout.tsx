import Link from "next/link";

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="admin-shell">
      <aside className="admin-sidebar">
        <Link className="brand" href="/admin/products">
          Admin Boutique
        </Link>
        <nav className="admin-nav" aria-label="Navigation admin">
          <Link href="/admin/products">Produits</Link>
          <Link href="/">Boutique</Link>
        </nav>
      </aside>
      <section className="admin-content">{children}</section>
    </main>
  );
}
