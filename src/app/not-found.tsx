import Link from "next/link";

export default function NotFound() {
  return (
    <main className="page-shell">
      <div className="feedback-panel">
        <p className="eyebrow">404</p>
        <h1>Page not found.</h1>
        <p>The page does not exist in this store.</p>
        <Link className="primary-link" href="/">
          Back to products
        </Link>
      </div>
    </main>
  );
}
