import Link from "next/link";
import { Suspense } from "react";
import { PrimeComparison } from "@/features/performance/prime-comparison";

export default function PerformancePage() {
  return (
    <div className="page-shell">
      <Link className="back-link" href="/">
        Retour aux produits
      </Link>

      <section className="section-heading" aria-labelledby="performance-title">
        <div>
          <p className="eyebrow">Cache serveur</p>
          <h1 id="performance-title">Comparaison unstable_cache</h1>
        </div>
      </section>

      <Suspense fallback={<PrimeComparisonSkeleton />}>
        <PrimeComparison />
      </Suspense>
    </div>
  );
}

function PrimeComparisonSkeleton() {
  return (
    <div className="loader-panel" role="status">
      <span className="loader" />
      <p>Calcul des nombres premiers...</p>
    </div>
  );
}
