import Link from "next/link";

export default function StoreLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <header className="site-header">
        <Link className="brand" href="/">
          My Supa Store
        </Link>
        <nav className="main-nav" aria-label="Navigation principale">
          <Link href="/">Products</Link>
          <Link href="/admin/products">Admin</Link>
        </nav>
      </header>
      <main className="site-main">{children}</main>
      <footer className="site-footer">
        <span>Next.js workshop - App Router, RSC and route groups.</span>
      </footer>
    </>
  );
}
