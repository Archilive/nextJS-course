export const metadata = {
  title: "Hors ligne",
  description: "Page de secours de la PWA.",
};

export default function OfflinePage() {
  return (
    <div className="page-shell">
      <section className="feedback-panel">
        <p className="eyebrow">PWA</p>
        <h1>Vous êtes hors ligne</h1>
        <p>
          Le service worker affiche cette page quand le réseau ne répond pas et
          qu&apos;aucune version en cache n&apos;est disponible.
        </p>
      </section>
    </div>
  );
}
