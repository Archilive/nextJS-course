import Link from "next/link";

export default function NotFound() {
  return (
    <main className="page-shell">
      <div className="feedback-panel">
        <p className="eyebrow">404</p>
        <h1>Page introuvable.</h1>
        <p>Cette page n’existe pas dans la boutique.</p>
        <Link className="primary-link" href="/">
          Retour aux produits
        </Link>
      </div>
    </main>
  );
}
