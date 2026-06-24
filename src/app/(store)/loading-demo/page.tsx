export default async function LoadingDemoPage() {
  await new Promise((resolve) => setTimeout(resolve, 1600));

  return (
    <div className="page-shell">
      <div className="feedback-panel">
        <p className="eyebrow">Loaded</p>
        <h1>Loading demo rendered.</h1>
        <p>This route intentionally waits before rendering.</p>
      </div>
    </div>
  );
}
