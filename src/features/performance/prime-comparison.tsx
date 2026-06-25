import { connection } from "next/server";
import {
  getCachedPrimeStats,
  getPrimeStats,
  type PrimeStats,
} from "./primes";

const PRIME_LIMIT = 180000;

export async function PrimeComparison() {
  await connection();

  const directStats = await getPrimeStats(PRIME_LIMIT);
  const cachedStats = await getCachedPrimeStats(PRIME_LIMIT);

  return (
    <section className="metric-grid" aria-label="Comparaison des calculs">
      <PrimeMetricCard title="Calcul direct" stats={directStats} />
      <PrimeMetricCard
        title="Mémoïsé avec unstable_cache"
        stats={cachedStats}
      />
    </section>
  );
}

function PrimeMetricCard({
  title,
  stats,
}: {
  title: string;
  stats: PrimeStats;
}) {
  return (
    <article className="metric-card">
      <p className="eyebrow">{title}</p>
      <strong>{stats.duration} ms</strong>
      <dl className="metric-list">
        <div>
          <dt>Limite</dt>
          <dd>{stats.limit.toLocaleString("fr-FR")}</dd>
        </div>
        <div>
          <dt>Nombres premiers</dt>
          <dd>{stats.count.toLocaleString("fr-FR")}</dd>
        </div>
        <div>
          <dt>Plus grand</dt>
          <dd>{stats.largest.toLocaleString("fr-FR")}</dd>
        </div>
      </dl>
    </article>
  );
}
