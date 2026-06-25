"use client";

export default function StoreError({ reset }: { reset: () => void }) {
  return (
    <div className="page-shell">
      <div className="feedback-panel">
        <p className="eyebrow">Erreur</p>
        <h1>Impossible d’afficher cette page.</h1>
        <p>Relance le rendu de la page.</p>
        <button className="primary-button" type="button" onClick={reset}>
          Réessayer
        </button>
      </div>
    </div>
  );
}
