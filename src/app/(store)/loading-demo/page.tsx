export default async function LoadingDemoPage() {
  await new Promise((resolve) => setTimeout(resolve, 1600));

  return (
    <div className="page-shell">
      <div className="feedback-panel">
        <p className="eyebrow">Chargé</p>
        <h1>Démo de chargement rendue.</h1>
        <p>Cette route attend volontairement avant le rendu.</p>
      </div>
    </div>
  );
}
