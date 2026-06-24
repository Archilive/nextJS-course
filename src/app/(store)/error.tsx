"use client";

export default function StoreError({ reset }: { reset: () => void }) {
  return (
    <div className="page-shell">
      <div className="feedback-panel">
        <p className="eyebrow">Something broke</p>
        <h1>Unable to render this page.</h1>
        <p>Please retry the page render.</p>
        <button className="primary-button" type="button" onClick={reset}>
          Retry
        </button>
      </div>
    </div>
  );
}
