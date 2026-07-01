import { DebugButton } from "@/features/debug/debug-button";
import { EnvPanel } from "@/features/env/env-panel";

export const metadata = {
  title: "Production",
  description: "Outils simples pour vérifier les points production de l'atelier.",
};

export default function ProductionPage() {
  return (
    <div className="page-shell">
      <section className="section-heading" aria-labelledby="production-title">
        <div>
          <p className="eyebrow">Production ready</p>
          <h1 id="production-title">Contrôles production</h1>
        </div>
      </section>

      <section className="diagnostic-section" aria-labelledby="env-title">
        <div>
          <p className="eyebrow">Variables</p>
          <h2 id="env-title">Client et serveur</h2>
        </div>
        <EnvPanel />
      </section>

      <section className="diagnostic-section" aria-labelledby="debug-title">
        <div>
          <p className="eyebrow">Debug</p>
          <h2 id="debug-title">Point d&apos;arrêt front</h2>
        </div>
        <DebugButton />
      </section>
    </div>
  );
}
